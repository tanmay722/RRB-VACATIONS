/**
 * One-time (idempotent) fix for the `admin` table.
 *
 * The table was originally created by a raw SQL script that declared
 * `id integer` WITHOUT an auto-increment sequence and WITHOUT NOT NULL.
 * As a result any admin inserted through Prisma (e.g. the seed script) got
 * `id = NULL`, which broke the "change credentials" flow (it looked the admin
 * up by a null id) and forced manual password resets.
 *
 * This script:
 *   1. Creates a dedicated sequence and points it past the current max id.
 *   2. Backfills any NULL ids.
 *   3. Sets the sequence as the column default and makes the column NOT NULL.
 *
 * Run:  node fix-admin-id-sequence.js
 */
import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Client } = pg;

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("DATABASE_URL is not set");

  const client = new Client({ connectionString });
  await client.connect();
  console.log("Connected. Repairing admin.id ...");

  await client.query("BEGIN");
  try {
    await client.query(
      `CREATE SEQUENCE IF NOT EXISTS admin_id_seq OWNED BY admin.id;`
    );
    // Point the sequence past the highest existing id so backfills never collide.
    await client.query(
      `SELECT setval('admin_id_seq', (SELECT COALESCE(MAX(id), 0) FROM admin));`
    );
    // Backfill any rows that currently have a NULL id.
    const backfill = await client.query(
      `UPDATE admin SET id = nextval('admin_id_seq') WHERE id IS NULL;`
    );
    console.log(`Backfilled ${backfill.rowCount} row(s) with a NULL id.`);
    // Make future inserts auto-assign an id and forbid NULLs.
    await client.query(
      `ALTER TABLE admin ALTER COLUMN id SET DEFAULT nextval('admin_id_seq');`
    );
    await client.query(`ALTER TABLE admin ALTER COLUMN id SET NOT NULL;`);
    await client.query("COMMIT");
    console.log("admin.id repaired: sequence attached, default set, NOT NULL.");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  }

  const rows = await client.query(
    `SELECT id, username FROM admin ORDER BY id;`
  );
  console.log("Current admin rows:");
  rows.rows.forEach((r) => console.log(`  id=${r.id} username=${r.username}`));

  await client.end();
}

main().catch((err) => {
  console.error("Failed:", err.message);
  process.exit(1);
});
