import { isEmpty } from "lodash"
import { dbErrorHandler } from "../../db/helper/error-handler"
import Stream from "../../db/models/stream"
import { GetManyResponse } from "../../models/get-many-response"
import { GetStreamsParams } from "../../models/streams/get-streams-params"
import {
    CreationError,
    EmptyObjectErr,
    NotFoundError,
    ObjectEmptinessCheck,
} from "../helper/error-handler"
import { GetStreamQuery } from "../queries/streams/get-stream-query"
import { GetStreamsQuery } from "../queries/streams/get-streams-query"

export default class StreamService {
    private static instance: StreamService

    private constructor() {
        // EMPTY
    }

    static getInstance(): StreamService {
        if (!StreamService.instance) {
            StreamService.instance = new StreamService()
        }
        return StreamService.instance
    }

    async createStream(stream: Stream): Promise<Stream> {
        ObjectEmptinessCheck(stream, "Stream")

        const newStream = await Stream.transaction(async (trx) => {
            return await Stream.query(trx).insertGraphAndFetch(stream)
        }).catch((e) => {
            throw dbErrorHandler(e)
        })

        CreationError([newStream], "Stream")

        return newStream
    }
    async createStreams(streams: Stream[]): Promise<Stream[]> {
        if (isEmpty(streams)) {
            EmptyObjectErr("Streams")
        }
        const newStreams = await Stream.transaction(async (trx) => {
            return await Stream.query(trx).insertGraphAndFetch(streams)
        }).catch((e) => {
            throw dbErrorHandler(e)
        })

        return newStreams
    }
    async updateStream(stream: Stream): Promise<Stream> {
        ObjectEmptinessCheck(stream, "Stream")
        const updatedStream = await Stream.transaction(async (trx) => {
            return await Stream.query(trx).upsertGraphAndFetch(stream)
        }).catch((e) => {
            throw dbErrorHandler(e)
        })

        return updatedStream
    }
    async updateStreams(streams: Stream[]): Promise<Stream[]> {
        if (isEmpty(streams)) {
            EmptyObjectErr("Streams")
        }
        const updatedStreams = await Stream.transaction(async (trx) => {
            return await Stream.query(trx).upsertGraphAndFetch(streams)
        }).catch((e) => {
            throw dbErrorHandler(e)
        })

        return updatedStreams
    }
    async getStream(id: number, twitch_id?: number): Promise<Stream> {
        const stream = await GetStreamQuery(id, twitch_id).catch((e) => {
            throw dbErrorHandler(e)
        })
        if (isEmpty(stream)) {
            throw NotFoundError("Stream", "stream")
        }
        return stream
    }

    async getStreams(params: GetStreamsParams): Promise<GetManyResponse> {
        const pagedData = await GetStreamsQuery(params).catch((e) => {
            throw dbErrorHandler(e)
        })

        const results = pagedData.results
        const data = {
            data: results,
            metadata: {
                total: pagedData.total,
            },
        } as GetManyResponse
        return data
    }
    async deleteAll(): Promise<number> {
        const data = await Stream.transaction(async (trx) => {
            return await Stream.query(trx).delete()
        }).catch((e) => {
            throw dbErrorHandler(e)
        })
        return data
    }
}
