import { queryAllGames, insertGame } from "$lib/server/db/game";

export async function load({locals}) {

    insertGame(locals.sql, 'Xenoblade Chronicles 3', '2022-07-29', 'https://www.nintendo.co.jp/switch/az3ha', 'xeno game', 'Xenoblade Chronicles', 'Nintendo Switch', 'Action, JRPG');
    insertGame(locals.sql, 'a', '2022-07-29', 'b', 'c', 'd', 'e', 'f, g');
    insertGame(locals.sql, 'b', '2022-07-29', 'b', 'c', 'd', 'e', 'f, g');
    insertGame(locals.sql, 'fg', '2022-07-29', 'b', 'c', 'd', 'e', 'f, g');
    insertGame(locals.sql, 'rhgfrfghjhgf', '2022-07-29', 'b', 'c', 'd', 'e', 'f, g');
    insertGame(locals.sql, 'qwertghn', '2022-07-29', 'b', 'c', 'd', 'e', 'f, g');
        
    return {
        gameSourceData: await queryAllGames(locals.sql)
    };
}