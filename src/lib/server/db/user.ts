import type { Sql } from 'postgres';

// CREATE TABLES
export const createUserTable = async (sql: Sql) => {
  
  await sql`DROP TABLE IF EXISTS "user";`;

  await sql`

    CREATE TABLE "user" (
      id SERIAL PRIMARY KEY,
      username VARCHAR(64) NOT NULL UNIQUE,
      CONSTRAINT username_min_len CHECK (LENGTH(username) >= 3)
    );
  `;

  await sql`CREATE INDEX idx_username ON "user" (username);`;

  // TODO: insert more stuff for testing?
};

export const queryUserByUsername = async (sql: Sql, username: string) => {
  const [user] = await sql`SELECT * FROM "user" WHERE username = ${username}`;
  return user;
};

export const insertUser = async (sql: Sql, username: string) => {
  await sql`INSERT INTO "user" (username) VALUES (${username})`;
};

