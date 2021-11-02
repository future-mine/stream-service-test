import { Response } from "express"
export const auth = (req: any, res: Response, next: any) => {
    if (req.session && req.session.passport && req.session.passport.user) {
        req.user = req.session.passport.user
        next()
    } else {
        res.redirect("/")
    }
}
