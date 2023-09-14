const Postgrator = require("postgrator");
const { Client } = require("pg");
const { join } = require("node:path");

async function main() {
  const client = new Client({
    host: "localhost",
    port: 5432,
    database: "postgres",
    user: "semion",
    password: "kiselev",
  });

  try {
    await client.connect();

    const postgrator = new Postgrator({
      migrationPattern: join(__dirname, "../migrations/*"),
      driver: "pg",
      database: "postgres",
      schemaTable: "migrations",
      execQuery: (query) => client.query(query),
    });

    await postgrator.migrate();
  } catch (error) {
    console.error(error.appliedMigrations);
  } finally {
    await client.end();
  }
}

main();
