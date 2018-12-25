"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const https_1 = __importDefault(require("https"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const compression_1 = __importDefault(require("compression"));
const express_session_1 = __importDefault(require("express-session"));
const session_file_store_1 = __importDefault(require("session-file-store"));
const http_errors_1 = __importDefault(require("http-errors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const passport_1 = __importDefault(require("passport"));
const fuse_js_latest_1 = __importDefault(require("fuse-js-latest"));
const socket_io_1 = __importDefault(require("socket.io"));
const fetchGraphql_1 = __importDefault(require("./utils/fetchGraphql"));
const passport_2 = __importDefault(require("./utils/passport"));
const socketIO_1 = __importDefault(require("./utils/socketIO"));
const credentials_json_1 = __importDefault(require("./data/credentials.json"));
const config = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, "config.json")));
const { HOST = config.URL, PORT = process.env.PORT || config.PORT } = process.env;
const options = {
    key: fs_1.default.readFileSync(path_1.default.join(__dirname, "ssl", "server.key")),
    cert: fs_1.default.readFileSync(path_1.default.join(__dirname, "ssl", "server.crt"))
};
const app = express_1.default();
const server = https_1.default
    .createServer(options, app)
    .listen(Number(PORT), undefined, () => {
    console.log(`Server is listening @ ${HOST}:${PORT}`);
});
const FileStore = session_file_store_1.default(express_session_1.default);
const io = socket_io_1.default(server);
let user = null;
app.set("views", path_1.default.join(__dirname, "..", "views"));
app.set("view engine", "hbs");
app.use(morgan_1.default("dev"));
app.use(helmet_1.default());
app.use(cors_1.default({
    origin: true,
    credentials: true
}));
app.use(cookie_parser_1.default());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_session_1.default({
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
}));
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "..", "public", "build")));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
passport_2.default(passport_1.default, HOST, Number(PORT));
app.use(compression_1.default());
let connectedIO = [];
io.on("connection", socketIO_1.default(io, connectedIO, user));
function authenticationHandler(stategy, errorIfNotFound) {
    return function authenticatorMiddleware(req, res, next) {
        passport_1.default.authenticate(stategy, (err, user, info) => {
            if (err) {
                res.status(500).send({
                    isLoggedIn: false,
                    error: err
                });
            }
            else if (!user) {
                res.status(401).send({
                    isLoggedIn: false,
                    error: errorIfNotFound
                });
            }
            else {
                req.logIn(user, (err) => {
                    if (err) {
                        res.status(500).send({
                            isLoggedIn: false,
                            error: err
                        });
                    }
                    else {
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
app.post("/auth/login", authenticationHandler("local", "No account with that email found or wrong password!"));
app.get("/auth/facebook", passport_1.default.authenticate("facebook"));
app.get("/auth/facebook/cb", authenticationHandler("facebook", "No account information retreived from Facebook, try again later!"));
app.get("/auth/twitter", passport_1.default.authenticate("twitter"));
app.get("/auth/twitter/cb", authenticationHandler("twitter", "No account information retreived from Twitter, try again later!"));
app.get("/auth/google/", passport_1.default.authenticate("google"));
app.get("/auth/google/cb", authenticationHandler("google", "No account information retreived from Google, try again later!"));
app.post("/auth/register/", (req, res) => {
    const username = req.body.email;
    const usernameIdx = Object.keys(credentials_json_1.default.users).indexOf(username);
    if (usernameIdx === -1) {
        const updatedCredentials = Object.assign({}, credentials_json_1.default);
        updatedCredentials.names[username.toLocaleLowerCase()] =
            req.body.firstName;
        bcrypt_1.default.hash(req.body.password, 10, (err, encrypted) => {
            if (err) {
                res.status(500).send({
                    created: false,
                    error: err
                });
            }
            else {
                updatedCredentials.users[username.toLocaleLowerCase()] = encrypted;
                fs_1.default.writeFileSync("./data/credentials.json", JSON.stringify(updatedCredentials));
                res.status(200).send({
                    created: true
                });
            }
        });
    }
    else {
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
            }
            else {
                req.logOut();
                res.status(200).send({
                    isLoggedOut: true
                });
            }
        });
    }
});
let fuse = null;
app.post("/search", (req, res) => {
    if (!fuse) {
        fetchGraphql_1.default(config.graphqlURL).then((dataObj) => {
            const searchArr = Object.keys(dataObj.data).reduce((total, currentKey) => {
                return total.concat(dataObj.data[currentKey]);
            }, []);
            fuse = new fuse_js_latest_1.default(searchArr, {
                caseSensitive: false,
                shouldSort: true,
                keys: ["productModel", "shopName", "categoryDescription.categoryName"]
            });
            res.send(fuse.search(req.body.term));
        });
    }
    else {
        res.send(fuse.search(req.body.term));
    }
});
function isAuthed(req, res, next) {
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
app.use((req, res, next) => {
    next(http_errors_1.default(404));
});
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    res.status(err.status || 500);
    res.render("error", err);
});
