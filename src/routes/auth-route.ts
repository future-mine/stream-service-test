import { Application } from "express"
import passport from "../auths/passport"
export default (app: Application): void => {
    app.get("/auth/twitch", passport.authenticate("twitch", { scope: "user_read" }))
    // Set route for OAuth redirect
    app.get(
        "/auth/twitch/callback",
        passport.authenticate("twitch", { successRedirect: "/dashboard", failureRedirect: "/" })
    )
}
