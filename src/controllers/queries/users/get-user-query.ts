import { QueryBuilder } from "objection"
import User from "../../../db/models/user"

export const GetUserQuery = (id: number, twitch_id?: number): QueryBuilder<User, User> => {
    const query = User.query().findOne({ id, twitch_id })

    return query
}
