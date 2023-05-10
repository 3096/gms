import postgres from 'postgres';
import { dev } from '$app/environment';

declare global {
  // eslint-disable-next-line no-var
  var __sql: postgres.Sql;
}

global.__sql ??= postgres(dev ? import.meta.env.VITE_DATABASE_URL : import.meta.env.DATABASE_URL);

export default global.__sql;
