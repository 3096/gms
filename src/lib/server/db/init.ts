import { dev } from '$app/environment';
import pg, { PostgresError } from 'postgres';
import { createUserTable } from './user';
import { createGame, insertPublisher, queryGame } from './game';
import { createUserGameRelation } from './user_game';

export const initDb = async () => {

  const sql = pg(dev ? import.meta.env.VITE_DATABASE_URL : import.meta.env.DATABASE_URL);
  try {
    const [{ exists }] = await sql`SELECT EXISTS (
      SELECT datname FROM pg_catalog.pg_database WHERE datname = ${sql.options.database}
      )`;
      // only run this if the database doesn't exist cuz idk what to do if it does
      // if (exists) {
      //   // return sql;
      // }
      // console.log("here");
  } catch (e) {
    if (e instanceof PostgresError && e.code === '3D000') {
      await pg(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        `postgres://${sql.options.user}:${sql.options.pass!}@${sql.options.host[0]}:${
          sql.options.port[0]
        }/postgres`
      ).unsafe(`CREATE DATABASE ${sql.options.database}`);
    } else {
      throw e;
    }
  }

  await createUserTable(sql);
  await createGame(sql);
  await createUserGameRelation(sql);

  return sql;
};
