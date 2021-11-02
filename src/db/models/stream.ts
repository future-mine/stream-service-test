import { omit } from "lodash"
import Base from "./base"

export default class Stream extends Base {
    id?: number
    twitch_id!: string
    user_id!: string
    user_login!: string
    user_name!: string
    game_id!: string
    game_name!: string
    type?: string
    title!: string
    viewer_count!: number
    started_at!: string
    thumbnail_url?: string
    is_mature!: string

    static tableName = "streams"
    static jsonSchema = {
        type: "object",
        required: [
            "twitch_id",
            "user_id",
            "user_login",
            "user_name",
            "game_id",
            "game_name",
            "title",
            "viewer_count",
            "started_at",
            "is_mature",
        ],
        properties: {
            id: { type: "integer" },
            twitch_id: { type: "string" },
            user_id: { type: "string" },
            user_login: { type: "string" },
            user_name: { type: "string" },
            game_id: { type: "string" },
            game_name: { type: "string" },
            type: { type: "string" },
            title: { type: "string" },
            viewer_count: { type: "integer" },
            thumbnail_url: { type: ["string", null], minLength: 1, maxLength: 300 },

            started_at: { type: "string" },
            created_date: { type: "string" },
            created_by: { type: "string", minLength: 1, maxLength: 250 },
            modified_date: { type: "string" },
            modified_by: { type: "string", minLength: 1, maxLength: 250 },
            deleted_date: { type: ["string", "null"] },
            deleted_by: { type: ["string", "null"], minLength: 0, maxLength: 300 },
        },
    }

    $formatDatabaseJson(json: Record<string, any>): Pick<Record<string, any>, string> {
        json = super.$formatDatabaseJson(json)
        return omit(json, [])
    }
}
