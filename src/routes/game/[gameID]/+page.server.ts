import { queryGameByID, queryGameDLC, queryProducer } from '$lib/server/db/game.js';

export async function load({locals, params}) {

    const sql = locals.sql;
    const gameID = parseInt(params.gameID);

    return {
        gameData : queryGameByID(sql, gameID),
        producers : queryProducer(sql, gameID),
        dlc : queryGameDLC(sql, gameID)
    };
}