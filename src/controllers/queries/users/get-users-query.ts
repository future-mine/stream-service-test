import { Page, QueryBuilder } from "objection"
import User from "../../../db/models/user"
import { GetUsersParams } from "../../../models/users/get-users-params"
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from "../../constants/general-constants"

export const GetUsersQuery = ({
    page,
    per_page,
}: GetUsersParams): QueryBuilder<User, Page<User>> => {
    const resultPage = page != null && Number(page) > 1 ? Number(page) - 1 : DEFAULT_PAGE
    const perPage = per_page != null ? Number(per_page) : DEFAULT_PER_PAGE

    const query = User.query().where({})

    void query.page(resultPage, perPage)

    return query as unknown as QueryBuilder<User, Page<User>>
}
