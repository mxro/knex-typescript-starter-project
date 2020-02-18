import Knex from "knex";
import { migrations } from "./migrations/001_define_quotes";

export interface Migration {
	name: string;
	up: (knex: Knex) => Promise<any>;
	down: (knex: Knex) => Promise<any>;
}

class MigrationSource {
	migrations: Migration[];

	constructor(migrations: Migration[]) {
		this.migrations = migrations;
	}

	getMigrations(): Promise<string[]> {
		return Promise.resolve(this.migrations.map(({ name }) => name));
	}

	getMigration(migrationName: string): Migration {
		return this.migrations.find(({ name }) => name === migrationName);
	}

	getMigrationName(migrationName: string) {
		return migrationName;
	}
}

export async function runMigration({ migrations, knex }: { migrations: Migration[]; knex: Knex }) {
	const migrationSource = new MigrationSource(migrations);

	await knex.migrate.latest({
		migrationSource
	});
}