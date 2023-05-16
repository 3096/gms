import type { PageServerLoad } from './$types';
import { queryGameByID, queryGameDLC, queryProducer } from '$lib/server/db/game.js';

export const load = (async ({ locals, params }) => {
  const sql = locals.sql;
  const gameID = parseInt(params.gameID);

  return {
    gameData: queryGameByID(sql, gameID),
    producers: queryProducer(sql, gameID),
    dlc: queryGameDLC(sql, gameID)
  };
}) satisfies PageServerLoad;
