import { migrations as mig001 } from "./migrations/001_define_quotes";
import { runMigration, Migration } from "./migrationUtil";
import Knex from "knex";

export async function runMigrations({ knex }: { knex: Knex }): Promise<void> {

  const migrations: Migration[] = [].concat(mig001);

  await runMigration({ migrations, knex });

}