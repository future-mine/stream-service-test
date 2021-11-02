import cron from "node-cron"
import Stream from "../../db/models/stream"
import StreamService from "./stream-service"
// import StreamService from "../services/stream-service"
import { getStreams } from "../helper/get-streams"
import { clearEmojis } from "../helper/util"

export default class CronService {
    private static instance: CronService
    private cron: any
    private streamService: any
    public accessToken: string = ""
    private constructor() {}

    static getInstance(): CronService {
        if (!CronService.instance) {
            CronService.instance = new CronService()
        }
        return CronService.instance
    }
    async run() {
        try {
            const data = await getStreams(this.accessToken)
            const streams: Stream[] = data.map((v: any) => {
                const {
                    id,
                    user_id,
                    user_login,
                    user_name,
                    game_id,
                    game_name,
                    type,
                    title,
                    viewer_count,
                    started_at,
                    thumbnail_url,
                    is_mature,
                } = v
                return {
                    twitch_id: id,
                    user_id,
                    user_login,
                    user_name,
                    game_id,
                    game_name,
                    type,
                    title: clearEmojis(title),
                    viewer_count,
                    started_at,
                    thumbnail_url,
                    is_mature,
                }
            })
            if (streams.length > 0) {
                this.streamService = StreamService.getInstance()
                const count = await this.streamService.deleteAll()
                console.log("count===========>", count)
                const createdStreams = await this.streamService.createStreams(streams)
                return createdStreams
            }
        } catch (err) {
            console.log(err)
        }
    }
    async start(rule: string): Promise<void> {
        console.log("cron job started", this.cron)
        if (this.cron) {
            return
        } else {
            // await this.run()
            this.cron = cron.schedule(rule, async () => {
                await this.run()
            })
        }
    }
}
