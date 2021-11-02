import { isEmpty } from "lodash"
import moment from "moment"
import objection, { Model } from "objection"

export default class Base extends Model {
    id?: number
    created_date!: string
    created_by!: string
    modified_date!: string
    modified_by!: string
    deleted_date?: string
    deleted_by?: string

    $beforeInsert(): void {
        if (this.id != null) {
            throw new objection.ValidationError({
                message: "identifier should not be defined before insert",
                type: "IdentifierError",
                data: {},
            })
        }

        if (
            !isEmpty(this.modified_date) ||
            !isEmpty(this.modified_by) ||
            !isEmpty(this.created_by) ||
            !isEmpty(this.created_date)
        ) {
            throw new objection.ValidationError({
                message: "Can't create object with modified or created timestamp provided",
                type: "TimeestampError",
                data: {},
            })
        }
        const date = moment().format("YYYY-MM-DD")
        const user = "admin" // update to current user

        this.created_date = date
        this.created_by = user
        this.modified_date = date
        this.modified_by = user
    }

    $beforeUpdate(): void {
        if (this.id == null || this.id < 1) {
            throw new objection.ValidationError({
                message: "identifier should be defined before update",
                type: "IdentifierError",
                data: {},
            })
        }

        if (
            this.modified_date == null ||
            this.modified_by == null ||
            this.created_by == null ||
            this.created_date == null
        ) {
            throw new objection.ValidationError({
                message: "Can't update object missing modified or created timestamp or user",
                type: "TimeestampError",
                data: {},
            })
        }

        this.modified_date = moment().toISOString()
        this.modified_by = "admin" // update to current user
    }

    $parseDatabaseJson(json: Record<string, any>): Record<string, any> {
        json = super.$parseDatabaseJson(json)

        json.created_date = moment(json.created_date).format()
        json.modified_date = moment(json.modified_date).format()

        return json
    }

    static jsonSchema = {
        properties: {
            id: { type: "integer" },
            created_date: { type: "string" },
            created_by: { type: "string", minLength: 1, maxLength: 300 },
            modified_date: { type: "string" },
            modified_by: { type: "string", minLength: 1, maxLength: 300 },
            deleted_date: { type: ["string", "null"] },
            deleted_by: { type: ["string", "null"] },
        },
    }
}
