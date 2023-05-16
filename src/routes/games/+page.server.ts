import { queryAllGames } from "$lib/server/db/game";

export async function load({locals}) {
        
    return {
        gameSourceData: await queryAllGames(locals.sql)
    };
}