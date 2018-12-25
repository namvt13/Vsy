import fs from "fs";
import cors from "cors";
import path from "path";
import https from "https";
import helmet from "helmet";
import logger from "morgan";
import express from "express";
import moment from "moment";
import bcrypt from "bcrypt";
import validator from "validator";
import compression from "compression";
import session from "express-session";
import fileStore from "session-file-store";
import createError from "http-errors";
import cookieParser from "cookie-parser";
import passport from "passport";
import Fuse from "fuse-js-latest";
import socketIO from "socket.io";

import fetchGraphql from "./utils/fetchGraphql";
import setupPassport from "./utils/passport";
import ioHandler from "./utils/socketIO";
import credentials from "./data/credentials.json";

const config = JSON.parse(fs.readFileSync(
	path.join(__dirname, "config.json")
) as any);

const {HOST = config.URL, PORT = process.env.PORT || config.PORT} = process.env;
const options = {
	key: fs.readFileSync("./ssl/server.key"),
	cert: fs.readFileSync("./ssl/server.crt")
};

const app = express();
const server = https
	.createServer(options, app)
	.listen(Number(PORT), undefined, () => {
		console.log(`Server is listening @ ${HOST}:${PORT}`);
	});

const FileStore = fileStore(session);
const io = socketIO(server);
let user = null;

app.set("views", path.join(__dirname, "..", "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(helmet());
app.use(
	cors({
		origin: true,
		credentials: true
	})
);
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(
	session({
		secret: "AI Catlords are coming...",
		resave: false,
		saveUninitialized: false,
		cookie: {
			secure: true,
			sameSite: true,
			maxAge: 3600000,
			httpOnly: true
		},
		store: new FileStore()
	})
);
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public", "build")));
app.use(passport.initialize());
app.use(passport.session());
setupPassport(passport, HOST, Number(PORT));
app.use(compression());

let connectedIO = [] as {id: string; user: string}[];
// Real-time IO chat handler.
io.on("connection", ioHandler(io, connectedIO, user));

function authenticationHandler(stategy: string, errorIfNotFound: string) {
	return function authenticatorMiddleware(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) {
		passport.authenticate(stategy, (err, user, info) => {
			if (err) {
				res.status(500).send({
					isLoggedIn: false,
					error: err
				});
			} else if (!user) {
				res.status(401).send({
					isLoggedIn: false,
					error: errorIfNotFound
				});
			} else {
				req.logIn(user, (err) => {
					if (err) {
						res.status(500).send({
							isLoggedIn: false,
							error: err
						});
					} else {
						res.status(200).send({
							isLoggedIn: true,
							user
						});
					}
				});
			}
		})(req, res, next);
	};
}

// Routes handlers.
app.post(
	"/auth/login",
	authenticationHandler(
		"local",
		"No account with that email found or wrong password!"
	)
);

app.get("/auth/facebook", passport.authenticate("facebook"));
app.get(
	"/auth/facebook/cb",
	authenticationHandler(
		"facebook",
		"No account information retreived from Facebook, try again later!"
	)
);

app.get("/auth/twitter", passport.authenticate("twitter"));
app.get(
	"/auth/twitter/cb",
	authenticationHandler(
		"twitter",
		"No account information retreived from Twitter, try again later!"
	)
);

app.get("/auth/google/", passport.authenticate("google"));
app.get(
	"/auth/google/cb",
	authenticationHandler(
		"google",
		"No account information retreived from Google, try again later!"
	)
);

app.post("/auth/register/", (req, res) => {
	const username = req.body.email;
	const usernameIdx = Object.keys(credentials.users).indexOf(username);

	if (usernameIdx === -1) {
		const updatedCredentials = Object.assign({}, credentials);

		updatedCredentials.names[(username as string).toLocaleLowerCase()] =
			req.body.firstName;

		bcrypt.hash(req.body.password, 10, (err, encrypted) => {
			if (err) {
				res.status(500).send({
					created: false,
					error: err
				});
			} else {
				updatedCredentials.users[
					(username as string).toLocaleLowerCase()
				] = encrypted;
				fs.writeFileSync(
					"./data/credentials.json",
					JSON.stringify(updatedCredentials)
				);
				res.status(200).send({
					created: true
				});
			}
		});
	} else {
		res.status(500).send({
			created: false,
			error: "That account has already been taken!"
		});
	}
});

app.get("/auth/logout", (req, res) => {
	if (req.session) {
		req.session.destroy((err) => {
			if (err) {
				res.status(500).send({
					isLoggedOut: false,
					error: err
				});
			} else {
				req.logOut();
				res.status(200).send({
					isLoggedOut: true
				});
			}
		});
	}
});

// Search handler.
let fuse = null as Fuse | null;
app.post("/search", (req, res) => {
	if (!fuse) {
		fetchGraphql(config.graphqlURL).then((dataObj) => {
			const searchArr = Object.keys(dataObj.data).reduce(
				(total, currentKey) => {
					return total.concat(dataObj.data[currentKey]);
				},
				[]
			);

			fuse = new Fuse(searchArr, {
				caseSensitive: false,
				shouldSort: true,
				keys: ["productModel", "shopName", "categoryDescription.categoryName"]
			});

			res.send(fuse.search(req.body.term as string));
		});
	} else {
		res.send(fuse.search(req.body.term as string));
	}
});

function isAuthed(
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.status(401).send({
		isLoggedIn: false
	});
}

app.get("/auth/check", isAuthed, (req, res) => {
	res.status(200).send({
		isLoggedIn: true,
		displayName: req.user.displayName
	});
});

app.get("/content", isAuthed, (req, res) => {
	res.render("login");
});

app.use("/", (req, res) => {
	user = req.user;
	res.render("index", {
		title: "TestApp"
	});
});

// Catches 404 and forward to the error handler.
// Caching all access to unplanned routes.
app.use((req, res, next) => {
	next(createError(404));
});

// Error handler route.
app.use(
	(
		err: any,
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {
		// Attch the error with key "locals" to the "res" object and only allow error report in "dev" environment.
		res.locals.message = err.message;
		res.locals.error = req.app.get("env") === "development" ? err : {};

		// Render the error page
		res.status(err.status || 500);
		res.render("error", err);
	}
);
