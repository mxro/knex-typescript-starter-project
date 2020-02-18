import { runMigrations } from "../src/migrations";
import Knex from "Knex";

describe("Test migrations.", () => {

  it("Should run migrations without error.", async () => {
    const knex = Knex({
      client: "sqlite3",
      connection: { filename: ":memory:" },
      pool: { min: 1, max: 1 },
    });
    await runMigrations({ knex });
    await knex.destroy();
  });

});