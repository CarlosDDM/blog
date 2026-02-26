import { drizzle } from 'drizzle-orm/better-sqlite3';
import { postsTable, usersTable } from './schemas';
import Database from 'better-sqlite3';
import { resolve } from 'path';
import { mkdirSync } from 'fs';

const dataDir = resolve(process.cwd(), 'data');
mkdirSync(dataDir, { recursive: true });

const sqliteDatabasePath = resolve(dataDir, 'db.sqlite3');
const sqliteDatabase = new Database(sqliteDatabasePath);

export const drizzleDb = drizzle(sqliteDatabase, {
  schema: {
    posts: postsTable,
    users: usersTable,
  },
  logger: false,
});
