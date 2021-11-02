import { Knex } from "knex"

const TABLE_NAME = "streams"

export async function up(knex: Knex): Promise<void> {
    return knex.schema.hasTable(TABLE_NAME).then((exist) => {
        if (!exist) {
            return knex.schema.createTable(TABLE_NAME, (table: Knex.CreateTableBuilder) => {
                table.increments("id").unsigned().notNullable().primary()
                table.string("twitch_id").notNullable()
                table.string("user_id").notNullable()
                table.string("user_login").notNullable()
                table.string("user_name").notNullable()
                table.string("game_id").notNullable()
                table.string("game_name").notNullable()
                table.string("type").nullable()
                table.string("title").nullable()
                table.integer("viewer_count").unsigned().nullable()
                table.string("started_at").notNullable()
                table.string("thumbnail_url", 300).nullable()
                table.boolean("is_mature").notNullable()

                table.string("created_by", 250).notNullable()
                table.timestamp("created_date").defaultTo(knex.fn.now())
                table.string("modified_by", 250).notNullable()
                table.timestamp("modified_date").defaultTo(knex.fn.now())
                table.string("deleted_by", 250).nullable()
                table.date("deleted_date").nullable()
            })
        }
        return
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.hasTable(TABLE_NAME).then((exist) => {
        if (exist) {
            return knex.schema.dropTable(TABLE_NAME)
        }
        return
    })
}
