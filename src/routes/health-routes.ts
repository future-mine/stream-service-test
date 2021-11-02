import { Application } from "express"
import Database from "../db/database"

export default (app: Application): void => {
    const db = Database.getInstance()
    const knex = db.getKnex()

    app.use("/health/live", (_, res) => {
        res.status(200).send({
            status: "OK",
        })
    })

    app.use("/health/ready", async (_, res) => {
        try {
            await knex.raw("SELECT 'test connection';")
            res.status(200).send({
                readiness: "OK",
            })
        } catch {
            res.status(503).send({
                readiness: "FAILED",
            })
        }
    })
}
