import { Knex as KnexType } from "knex"
import Knex from "knex"

import { getConfig } from "./config/config"
import { Model } from "objection"

export default class Database {
    private static instance: Database
    private knex: KnexType
    private model: KnexType<any, unknown[]>

    private constructor() {
        this.knex = Knex(getConfig())
        this.model = Model.knex(this.knex)
    }

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database()
        }
        return Database.instance
    }

    public getKnex(): KnexType {
        return this.knex
    }

    public getModel(): KnexType<any, unknown[]> {
        return this.model
    }
}
