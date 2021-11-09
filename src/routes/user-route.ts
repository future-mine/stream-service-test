import { Application } from "express"
import { auth } from "../auths/auth-middleware"
import { host } from "../config"
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from "../controllers/constants"
import { convertToNumber } from "../controllers/helper/util"
import StreamService from "../controllers/services/stream-service"
import { GetStreamsParams } from "../models/streams/get-streams-params"

export default (app: Application): void => {
    const streamService = StreamService.getInstance()
    app.get("/", function (req: any, res) {
        if (req.session && req.session.passport && req.session.passport.user) {
            res.redirect("/dashboard")
        } else {
            res.render("pages/index")
        }
    })

    app.get("/dashboard", auth, async function (req: any, res) {
        const data = req.user.data[0]
        const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        } as Intl.DateTimeFormatOptions
        res.render("pages/dashboard", {
            name: data.login,
            display_name: data.display_name,
            image_url: data.profile_image_url,
            view_count: data.view_count,
            email: data.email,
            created_at: new Date(data.created_at).toLocaleDateString("en-US", options),
        })
    })
    app.get("/streams", auth, async function (req: any, res) {
        try {
            const params = req.query as GetStreamsParams
            const data = await streamService.getStreams(params)

            const page = params.page ? convertToNumber(params.page) || DEFAULT_PAGE : DEFAULT_PAGE
            const per_page = params.per_page
                ? convertToNumber(params.per_page) || DEFAULT_PER_PAGE
                : DEFAULT_PER_PAGE
            const total = data.metadata.total
            let total_page = Math.floor(total / per_page)
            if (total_page === total / per_page) {
                total_page -= 1
            }

            let first = page - 4
            let last = page + 4
            if (first < 0) {
                last -= first
                first = 0
                if (last > total_page) last = total_page
            } else if (last > total_page) {
                first -= last - total_page
                last = total_page
                if (first < 0) first = 0
            }
            console.log(total, total_page, page, per_page, first, last)
            res.render("pages/streams", {
                ...data,
                streamUrl: `${host}/streams`,
                view_count_sort_order: params.view_count_sort_order,
                view_count_type: params.view_count_type,
                per_page,
                page,
                total_page,
                first,
                last,
            })
        } catch (error) {
            res.redirect("/")
        }
    })
}
