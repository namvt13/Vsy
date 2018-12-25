"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const url_1 = __importDefault(require("url"));
const path_1 = __importDefault(require("path"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const passport_local_1 = __importDefault(require("passport-local"));
const passport_facebook_1 = __importDefault(require("passport-facebook"));
const passport_twitter_1 = __importDefault(require("passport-twitter"));
const passport_google_oauth2_1 = __importDefault(require("passport-google-oauth2"));
const credentials_json_1 = __importDefault(require("../data/credentials.json"));
const config = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, "..", "config.json")));
const LocalStrategy = passport_local_1.default.Strategy;
const FacebookStrategy = passport_facebook_1.default.Strategy;
const TwitterStrategy = passport_twitter_1.default.Strategy;
const GoogleStrategy = passport_google_oauth2_1.default.Strategy;
const URL = url_1.default.URL;
function setupPassport(passport, HOST, PORT) {
    passport.serializeUser((profile, done) => {
        done(null, {
            id: profile.id,
            provider: profile.provider,
            displayName: profile.displayName
        });
    });
    passport.deserializeUser((user, done) => {
        console.log("deserializeUser");
        console.log(user);
        done(null, user);
    });
    passport.use(new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    }, (req, username, password, done) => {
        if (!username || username.length === 0) {
            return done(new Error("No username provided!"), null);
        }
        else if (Object.keys(credentials_json_1.default.users).indexOf(username) > -1) {
            return bcrypt_1.default.compare(password, credentials_json_1.default.users[username], (err, same) => {
                if (err) {
                    return done(err, null);
                }
                else if (same) {
                    return done(null, {
                        id: username,
                        provider: "local",
                        displayName: credentials_json_1.default.names[username]
                    });
                }
                else {
                    return done(null, null);
                }
            });
        }
        else {
            return done(null, null);
        }
    }));
    passport.use(new FacebookStrategy({
        clientID: config.auth.facebook.clientID,
        clientSecret: config.auth.facebook.clientSecret,
        callbackURL: new URL("/auth/facebook/cb", HOST + `:${PORT}`).href
    }, (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        done(null, profile);
    }));
    passport.use(new TwitterStrategy({
        consumerKey: config.auth.twitter.consumerKey,
        consumerSecret: config.auth.twitter.consumerSecret,
        callbackURL: new URL("/auth/twitter/cb", HOST + `:${PORT}`).href
    }, (accessToken, refreshToken, profile, done) => [done(null, profile)]));
    passport.use(new GoogleStrategy({
        clientID: config.auth.google.clientID,
        clientSecret: config.auth.google.clientSecret,
        callbackURL: new URL("/auth/google/cb", HOST + `:${PORT}`).href,
        scope: [
            "https://www.googleapis.com/auth/plus.login",
            "https://www.googleapis.com/auth/plus.me",
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile"
        ]
    }, (accessToken, refreshToken, profile, done) => {
        done(null, profile);
    }));
}
exports.default = setupPassport;
