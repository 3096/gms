import type { Handle } from '@sveltejs/kit';
import { initDb } from '$lib/server/db/init';

const sql = await initDb();

export const handle: Handle = async ({ resolve, event }) => {
  event.locals.sql = sql;
  return await resolve(event);
};
