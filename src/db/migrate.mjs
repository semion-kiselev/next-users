import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";
import Postgrator from "postgrator";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function main() {
  const client = new pg.Client({
    host: "localhost",
    port: 5432,
    database: "postgres",
    user: "postgres",
  });

  try {
    await client.connect();

    const postgrator = new Postgrator({
      migrationPattern: join(__dirname, "./migrations/*"),
      driver: "pg",
      database: "postgres",
      schemaTable: "migrations",
      execQuery: (query) => client.query(query),
    });

    await postgrator.migrate();
    console.log("successfully migrated!");
  } catch (error) {
    console.error(error);
    console.error(error.appliedMigrations);
  } finally {
    await client.end();
  }
}

main();
