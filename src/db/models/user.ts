import { omit } from "lodash"
import Base from "./base"

export default class User extends Base {
    id?: number
    twitch_id!: string
    login!: string
    display_name!: string
    type?: string
    broadcaster_type?: string
    description?: string
    profile_image_url?: string
    offline_image_url?: string
    view_count?: number
    email!: string
    created_at!: string

    static tableName = "users"

    static jsonSchema = {
        type: "object",
        required: ["twitch_id", "login", "display_name", "email", "created_at"],
        properties: {
            id: { type: "integer" },
            twitch_id: { type: "string" },
            login: { type: "string" },
            display_name: { type: "string" },
            type: { type: "string" },
            broadcaster_type: { type: "string" },
            description: { type: "string" },
            profile_image_url: { type: ["string", null], maxLength: 300 },
            offline_image_url: { type: ["string", null], maxLength: 300 },
            email: { type: "string" },
            created_at: { type: "string" },

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
