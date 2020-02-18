import Knex from "knex";
import { Migration } from "./../migrationUtil";

export const migrations: Migration[] = [
    {
        name: "000_define_quotes",
        async up(knex: Knex) {
            await knex.schema.createTable("quotes",
                (table) => {
                    table.bigIncrements("id").unsigned().primary();
                    table.uuid("document_id").notNullable();
                    table.uuid("user_id").notNullable();
                    table.timestamp("created", { useTz: true });
                    table.text("quote").notNullable();
                    table.string("author", 512).notNullable();
                    table.string("book", 1024).notNullable();
                    table.text("raw_source").notNullable();
                    table.dateTime("date_collected", { useTz: true });
                    table.string("location", 1024).notNullable();
                    table.string("link", 1024).notNullable();
                    table.index(["document_id"], "document_id_index");
                });

            await knex.schema.createTable("tags",
                (table) => {
                    table.bigIncrements("id").unsigned().primary();
                    table.uuid("tag_id").notNullable();
                    table.timestamp("created", { useTz: true });
                    table.string("name", 512).notNullable();
                    table.uuid("document_id").notNullable();
                });
        },
        /* eslint-disable-next-line  @typescript-eslint/no-empty-function */
        async down(kenx: Knex) {
        },
    }
];