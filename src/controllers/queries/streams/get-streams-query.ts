import { Page, QueryBuilder } from "objection"
import Stream from "../../../db/models/stream"
import { GetStreamsParams } from "../../../models/streams/get-streams-params"
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from "../../constants/general-constants"
import { MapStreamsQueryParams } from "../../helper/mapper"

export const GetStreamsQuery = (params: GetStreamsParams): QueryBuilder<Stream, Page<Stream>> => {
    const { page, per_page, view_count_sort_order, view_count_type } = MapStreamsQueryParams(params)
    const resultPage = page != null && Number(page) > 1 ? Number(page) - 1 : DEFAULT_PAGE
    const perPage = per_page != null ? Number(per_page) : DEFAULT_PER_PAGE

    const query = Stream.query()
    if (view_count_type === "even") {
        void query.whereRaw("viewer_count%2= 0")
    } else if (view_count_type === "odd") {
        void query.whereRaw("viewer_count%2= 1")
    }
    if (view_count_sort_order != null) {
        void query.orderBy("viewer_count", view_count_sort_order)
    }
    void query.page(resultPage, perPage)
    return query as unknown as QueryBuilder<Stream, Page<Stream>>
}
