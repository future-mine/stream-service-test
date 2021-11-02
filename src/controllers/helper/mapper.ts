import { GetStreamsParams } from "../../models/streams/get-streams-params"
import { MappedStreamsParams } from "../../models/streams/mapped-streams-params"
import { convertToNumber } from "./util"

export const MapStreamsQueryParams = (params: GetStreamsParams): MappedStreamsParams => {
    let page

    if (params.page != null) {
        page = convertToNumber(params.page)
    }

    let per_page

    if (params.per_page != null) {
        per_page = convertToNumber(params.per_page)
    }

    let view_count_sort_order

    if (params.view_count_sort_order === "ASC" || params.view_count_sort_order === "DESC") {
        view_count_sort_order = params.view_count_sort_order
    }

    let view_count_type

    if (params.view_count_type === "even" || params.view_count_type === "odd") {
        view_count_type = params.view_count_type
    }

    return {
        page,
        per_page,
        view_count_sort_order,
        view_count_type,
    }
}
