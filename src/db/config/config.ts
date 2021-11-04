// @ts-ignore: Unreachable code error
import { Config } from "knex"
// import path from "path"
import process from "process"

const connectWithTcp = (config: Config): Config => {
    // Establish a connection to the database
    return {
        client: "mysql",
        connection: {
            user: process.env.DB_USER != null ? process.env.DB_USER : "root",
            password: process.env.DB_PASS != null ? process.env.DB_PASS : "root",
            database: process.env.DB_NAME != null ? process.env.DB_NAME : "db",
            host: process.env.DB_HOST != null ? process.env.DB_HOST : "",
            port: process.env.DB_PORT != null ? Number(process.env.DB_PORT) : 3306,
            charset: "utf8mb4",
        },
        ...config,
    }
}

export const getConfig = (): Config => {
    const config: Config = {
        pool: {
            max: 10,
            min: 5,
            acquireTimeoutMillis: 60000,
            createTimeoutMillis: 30000,
            idleTimeoutMillis: 600000,
            createRetryIntervalMillis: 200,
        },
        migrations: {
            directory: "./db/migrations",
        },
        seeds: {
            directory: "./db/seeds",
        },
        debug: process.env.NODE_ENV === "production",
    }
    return connectWithTcp(config)
}
