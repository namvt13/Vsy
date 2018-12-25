import fs from "fs";
import url from "url";
import path from "path";
import bcrypt from "bcrypt";
import passportLocal from "passport-local";
import passportFacebook from "passport-facebook";
import passportTwitter from "passport-twitter";
import passportGoogle from "passport-google-oauth2";

import credentials from "../data/credentials.json";

const config = JSON.parse(fs.readFileSync(
	path.join(__dirname, "..", "config.json")
) as any);

const LocalStrategy = passportLocal.Strategy;
const FacebookStrategy = passportFacebook.Strategy;
const TwitterStrategy = passportTwitter.Strategy;
const GoogleStrategy = passportGoogle.Strategy;

const URL = url.URL;

function setupPassport(passport: any, HOST: string, PORT: number) {
	passport.serializeUser(
		(profile: {id: string; provider: string; displayName: string}, done) => {
			done(null, {
				id: profile.id,
				provider: profile.provider,
				displayName: profile.displayName
			});
		}
	);
	passport.deserializeUser((user, done) => {
		console.log("deserializeUser");
		console.log(user);
		done(null, user);
	});

	passport.use(
		new LocalStrategy(
			{
				usernameField: "email",
				passwordField: "password",
				passReqToCallback: true
			},
			(req, username, password, done) => {
				if (!username || username.length === 0) {
					return done(new Error("No username provided!"), null);
				} else if (Object.keys(credentials.users).indexOf(username) > -1) {
					return bcrypt.compare(
						password,
						credentials.users[username],
						(err, same) => {
							if (err) {
								return done(err, null);
							} else if (same) {
								// This shit is the object that will be attached to 'req.user' and passed down to "seralizeUser()"
								return done(null, {
									id: username,
									provider: "local",
									displayName: credentials.names[username]
								});
							} else {
								return done(null, null);
							}
						}
					);
				} else {
					return done(null, null);
				}
			}
		)
	);
	passport.use(
		new FacebookStrategy(
			{
				clientID: config.auth.facebook.clientID,
				clientSecret: config.auth.facebook.clientSecret,
				callbackURL: new URL("/auth/facebook/cb", HOST + `:${PORT}`).href
			},
			(accessToken, refreshToken, profile, done) => {
				console.log(profile);
				done(null, profile);
			}
		)
	);
	passport.use(
		new TwitterStrategy(
			{
				consumerKey: config.auth.twitter.consumerKey,
				consumerSecret: config.auth.twitter.consumerSecret,
				callbackURL: new URL("/auth/twitter/cb", HOST + `:${PORT}`).href
			},
			(accessToken, refreshToken, profile, done) => [done(null, profile)]
		)
	);
	passport.use(
		new GoogleStrategy(
			{
				clientID: config.auth.google.clientID,
				clientSecret: config.auth.google.clientSecret,
				callbackURL: new URL("/auth/google/cb", HOST + `:${PORT}`).href,
				scope: [
					"https://www.googleapis.com/auth/plus.login",
					"https://www.googleapis.com/auth/plus.me",
					"https://www.googleapis.com/auth/userinfo.email",
					"https://www.googleapis.com/auth/userinfo.profile"
				]
			},
			(accessToken, refreshToken, profile, done) => {
				done(null, profile);
			}
		)
	);
}
export default setupPassport;
