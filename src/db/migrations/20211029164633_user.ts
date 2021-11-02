import { Knex } from "knex"

const TABLE_NAME = "users"

export async function up(knex: Knex): Promise<void> {
    return knex.schema.hasTable(TABLE_NAME).then((exist) => {
        if (!exist) {
            return knex.schema.createTable(TABLE_NAME, (table: Knex.CreateTableBuilder) => {
                table.increments("id").unsigned().notNullable().primary()
                table.string("twitch_id").notNullable()
                table.string("login").notNullable()
                table.string("display_name").notNullable()
                table.string("type").nullable()
                table.string("broadcaster_type").nullable()
                table.string("description").nullable()
                table.string("profile_image_url", 300).nullable()
                table.string("offline_image_url", 300).nullable()
                table.integer("view_count").unsigned().nullable()
                table.string("email").nullable()
                table.string("created_at").notNullable()

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
