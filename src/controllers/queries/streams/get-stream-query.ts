import { QueryBuilder } from "objection"
import Stream from "../../../db/models/stream"

export const GetStreamQuery = (id: number, twitch_id?: number): QueryBuilder<Stream, Stream> => {
    const query = Stream.query().findOne({ id, twitch_id })

    return query
}
