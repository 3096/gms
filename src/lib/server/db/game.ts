import type { Sql } from 'postgres';

export const createGameTable = async (sql: Sql) => {
  await sql`
    CREATE TABLE "game" (
      id SERIAL PRIMARY KEY,
      name VARCHAR(64) NOT NULL,
      release_date DATE,
      website VARCHAR(255),
      description TEXT,
      franchise VARCHAR(64),
      platform VARCHAR(64),
      genre VARCHAR(64)
    )
  `;
};

export const queryAllGames = async (sql: Sql) => {
  const [games] = await sql`SELECT * FROM "game"`;
  return games;
};

export const queryGameByAttributeValue = async (sql: Sql, attribute: string, attribute_value: number | string | Date) => { // idk if Date will work
  const [games] = await sql`SELECT * FROM "game" WHERE ${attribute} = ${attribute_value}`;
  return games;
};

export const insertGame = async (sql: Sql, name: string, release_date: Date, website: string, description: string, franchise: string, platform: string, genre: string) => {
  await sql`
    INSERT INTO "game"
      (name, release_date, website, description, franchise, platform, genre)
    VALUES
      (${name}, ${release_date}, ${website}, ${description}, ${franchise}, ${platform}, ${genre})
  `;
};
