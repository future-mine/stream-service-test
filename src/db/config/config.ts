// @ts-ignore: Unreachable code error
import { Config } from "knex"
// import path from "path"
import process from "process"
import path from "path"
const connectWithTcp = (config: Config): Config => {
    // Establish a connection to the database
    const fullConfig = {
        client: "mysql",
        connection: {
            user: process.env.RDS_USERNAME || "root",
            password: process.env.RDS_PASSWORD || "root",
            database: process.env.RDS_DB_NAME || "db",
            host: process.env.RDS_HOSTNAME || "",
            port: process.env.DRDS_PORT || 3306,
            charset: "utf8mb4",
        },
        ...config,
    }
    console.log("Full database config==========>", fullConfig)
    return fullConfig
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
            directory: path.resolve(__dirname, "..", "migrations"),
        },
        seeds: {
            directory: path.resolve(__dirname, "..", "seeds"),
            extension: ["js", "ts"],
        },
        debug: process.env.NODE_ENV === "production",
    }
    return connectWithTcp(config)
}
