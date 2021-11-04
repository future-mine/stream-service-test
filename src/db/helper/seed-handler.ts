import { Knex } from "knex"

export const seedDB = async (knex: Knex): Promise<void> => {
    if (process.env.NODE_ENV === "development") {
        console.log("seeding Streams development database...")
        await seedStreams(knex)
    }
}

const seedStreams = (knex: Knex): Promise<number | void> => {
    const table = "streams"
    return knex(table)
        .del()
        .then(() => {
            return knex(table).insert([])
        })
        .then(() => {
            void knex.raw(`select setval(${table}_id_seq, max(id)) from ${table}`)
        })
}
