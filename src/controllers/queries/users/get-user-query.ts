import { QueryBuilder } from "objection"
import User from "../../../db/models/user"

export const GetUserQueryById = (id?: number): QueryBuilder<User, User> => {
    const query = User.query().findOne({ id })
    return query
}

export const GetUserQueryByTwitchId = (twitch_id: number): QueryBuilder<User, User> => {
    const query = User.query().findOne({ twitch_id })
    return query
}
