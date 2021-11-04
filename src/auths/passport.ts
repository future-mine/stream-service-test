import passport from "passport"
import { config } from "dotenv"
import request from "request"
import { host, port } from "../config"
const OAuth2Strategy = require("passport-oauth").OAuth2Strategy
config()
OAuth2Strategy.prototype.userProfile = function (accessToken: string, done: Function) {
    var options = {
        url: "https://api.twitch.tv/helix/users",
        method: "GET",
        headers: {
            "Client-ID": process.env.TWITCH_CLIENT_ID,
            Accept: "application/vnd.twitchtv.v5+json",
            Authorization: "Bearer " + accessToken,
        },
    }

    request("", options, function (_: any, response: any, body: any): void {
        if (response && response.statusCode == 200) {
            done(null, JSON.parse(body))
        } else {
            done(JSON.parse(body))
        }
    })
}

passport.serializeUser(function (user: any, done: Function) {
    done(null, user)
})

passport.deserializeUser(function (user: any, done: Function) {
    done(null, user)
})

passport.use(
    "twitch",
    new OAuth2Strategy(
        {
            authorizationURL: "https://id.twitch.tv/oauth2/authorize",
            tokenURL: "https://id.twitch.tv/oauth2/token",
            clientID: process.env.TWITCH_CLIENT_ID,
            clientSecret: process.env.TWITCH_SECRET,
            callbackURL: `${host}:${port}/auth/twitch/callback`,
            state: true,
        },
        function (accessToken: string, refreshToken: string, profile: any, done: Function) {
            profile.accessToken = accessToken
            profile.refreshToken = refreshToken

            // Securely store user profile in your DB
            //User.findOrCreate(..., function(err, user) {
            //  done(err, user);
            //});

            done(null, profile)
        }
    )
)
export default passport
