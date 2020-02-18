import { parser } from "kindle-citation-extractor";
import fs from "fs";
import { runMigrations } from "../src/migrations";
import Knex from "Knex";
import { loadIntoDb } from "../src/kindleLoad";

describe("Load citations", () => {
  it("Should load citations", async () => {
    const clippings1 = fs.readFileSync("test/clippings1.txt", "utf-8");
    const data = parser(clippings1);
    const knex = Knex({
      client: "sqlite3",
      connection: { filename: ":memory:" },
      pool: { min: 1, max: 1 },
    });
    await runMigrations({ knex });

    await loadIntoDb({
      data, knex
    });

    await knex.destroy();
  });
});