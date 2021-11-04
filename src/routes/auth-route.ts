import { Application } from "express"
import { auth } from "../auths/auth-middleware"
import passport from "../auths/passport"
import UserService from "../controllers/services/user-service"
import CronService from "../controllers/services/cron-service"
import User from "../db/models/user"
// import User from "../db/models/user"

export default (app: Application): void => {
    const userService = UserService.getInstance()
    const cronService = CronService.getInstance()
    app.get("/auth/twitch", passport.authenticate("twitch", { scope: "user_read" }))
    app.get(
        "/auth/twitch/callback",
        passport.authenticate("twitch", { successRedirect: "/auth/redirect", failureRedirect: "/" })
    )
    app.get("/auth/redirect", auth, async (req: any, res) => {
        cronService.accessToken = req.user.accessToken
        cronService.start("0 */15 * * * *")
        const data = req.user.data[0]
        const {
            id,
            login,
            display_name,
            broadcaster_type,
            type,
            description,
            profile_image_url,
            offline_image_url,
            view_count,
            email,
            created_at,
        } = data as any
        try {
            const existedUser = await userService.getUserByTwitchId(id)
            console.log(existedUser)
        } catch (err) {
            try {
                const user = {
                    twitch_id: id,
                    login,
                    display_name,
                    broadcaster_type,
                    type,
                    description,
                    profile_image_url,
                    offline_image_url,
                    view_count,
                    email,
                    created_at,
                } as User
                await userService.createUser(user)
            } catch (err) {
                console.log(err)
            }
        }
        res.redirect("/dashboard")
    })
}
