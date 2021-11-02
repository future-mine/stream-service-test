import { isEmpty } from "lodash"
import { dbErrorHandler } from "../../db/helper/error-handler"
import User from "../../db/models/user"
import { GetManyResponse } from "../../models/get-many-response"
import { GetUsersParams } from "../../models/users/get-users-params"
import { CreationError, NotFoundError, ObjectEmptinessCheck } from "../helper/error-handler"
import { GetUserQuery } from "../queries/users/get-user-query"
import { GetUsersQuery } from "../queries/users/get-users-query"

export default class UserService {
    private static instance: UserService

    private constructor() {
        // EMPTY
    }

    static getInstance(): UserService {
        if (!UserService.instance) {
            UserService.instance = new UserService()
        }
        return UserService.instance
    }

    async createUser(user: User): Promise<User> {
        ObjectEmptinessCheck(user, "User")

        const newUser = await User.transaction(async (trx) => {
            return await User.query(trx).insertGraphAndFetch(user)
        }).catch((e) => {
            throw dbErrorHandler(e)
        })

        CreationError([newUser], "User")

        return newUser
    }

    async updateUser(user: User): Promise<User> {
        ObjectEmptinessCheck(user, "User")
        const updatedUser = await User.transaction(async (trx) => {
            return await User.query(trx).upsertGraphAndFetch(user)
        }).catch((e) => {
            throw dbErrorHandler(e)
        })

        return updatedUser
    }

    async getUser(id: number, twitch_id?: number): Promise<User> {
        const user = await GetUserQuery(id, twitch_id).catch((e) => {
            throw dbErrorHandler(e)
        })

        if (isEmpty(user)) {
            throw NotFoundError("User", "user")
        }

        return user
    }

    async getUsers(params: GetUsersParams): Promise<GetManyResponse> {
        const pagedData = await GetUsersQuery(params).catch((e) => {
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
}
