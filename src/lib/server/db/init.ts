import { dev } from '$app/environment';
import pg from 'postgres';
import { createUserTable } from './user';
import { createGame } from './game';
import { createUserGameRelation } from './user_game';
import { testDB } from './initData';

export const initDb = async () => {
  const sql = pg(dev ? import.meta.env.VITE_DATABASE_URL : process.env.DATABASE_URL);
  try {
    const [{ exists }] = await sql`SELECT EXISTS (
      SELECT datname FROM pg_catalog.pg_database WHERE datname = ${sql.options.database}
      )`;
    // only run this if the database doesn't exist cuz idk what to do if it does
    if (exists) {
      return sql;
    }
  } catch (e) {
    if ((e as { code: string }).code === '3D000') {
      await pg(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        `postgres://${sql.options.user}:${sql.options.pass!}@${sql.options.host[0]}:${
          sql.options.port[0]
        }/postgres`
      ).unsafe(`CREATE DATABASE ${sql.options.database}`);
    }
  }

  await createUserTable(sql);
  await createGame(sql);
  await createUserGameRelation(sql);

  await testDB(sql);

  return sql;
};
