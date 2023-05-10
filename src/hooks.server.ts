import postgres from 'postgres';
import { dev } from '$app/environment';
import type { Handle } from '@sveltejs/kit';

const sql = postgres(dev ? import.meta.env.VITE_DATABASE_URL : import.meta.env.DATABASE_URL);

export const handle: Handle = async ({ resolve, event }) => {
  event.locals.sql = sql;
  return await resolve(event);
};
