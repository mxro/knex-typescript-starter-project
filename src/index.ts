import Knex from "knex";
import { runMigrations } from "./migrations";

async function main() {
    const knex = Knex({
        client: "sqlite3",
        connection: { filename: ":memory:" },
        pool: { min: 1, max: 1 },
        useNullAsDefault: true,
    });

    await runMigrations({ knex });

    console.log(await knex.raw("SELECT 1;"));

    await knex.destroy();
}

main().then(() => console.log("done")).catch((e) => { throw e; });