import { queryDeveloper, queryGameByID, queryGameDLC, queryProducer, queryPublisher } from '$lib/server/db/game.js';

export async function load({locals, params}) {

    const sql = locals.sql;

/*
        await sql`    INSERT INTO game
        (game_id, name, release_date, website, description, franchise, platform, genre)
        VALUES
        (1, 'Xenoblade Chronicles 3', '2022-07-29', 'https://www.nintendo.co.jp/switch/az3ha', 'xeno game', 'Xenoblade Chronicles', 'Nintendo Switch', 'Action, JRPG'),
        (2, 'Rocket League', '2015-07-07', 'https://www.rocketleague.com/', 'car game', 'Rocket League', 'PC, PS4, Xbox One, Nintendo Switch', 'Sports, Driving');`;
        await sql`    INSERT INTO publisher
        (publisher_id, name, website)
    VALUES
        (1, 'Nintendo', 'https://www.nintendo.com/'),
    (2, 'Epic Games', 'https://www.epicgames.com/site/en-US/home/');`;
        await sql`    INSERT INTO publishmentship
        (game_id, publisher_id)
    VALUES
        (1, 1),
        (2, 2);`;
        await sql`    INSERT INTO developer
        (developer_id, name)
    VALUES
        (1, 'Monolith Soft'),
        (2, 'Psyonix');`;
        await sql`    INSERT INTO developmentship
        (game_id, developer_id)
    VALUES
        (1, 1),
        (2, 2);`;
        await sql`    
        INSERT INTO dlc
            (dlc_id, game_id, name, release_date, description)
        VALUES
            (1, 1, 'Expansion Pass', '2022-07-29', '4 waves'),
            (2, 2, 'Season 10 Veteran Pack', '2023-04-26', '6 items');`;
    
    await sql`INSERT INTO "user"
    (id, username)
  VALUES
    (1, 'dvdsng'),
    (2, '3096'),
    (3, 'Azlothe');`;
    await sql` INSERT INTO user_favorite
    (user_id, game_id)
  VALUES
    (1, 2),
    (1, 1),
    (2, 1),
  (3, 1);`;
    await sql`INSERT INTO user_game
    (user_id, game_id, hours_played, money_spent)
  VALUES
    (1, 2, 2000, 26.87),
    (1, 1, 62, 59.99),
    (2, 1, 64, 59.99),
    (3, 1, 168, 59.99);`;
    await sql`  INSERT INTO user_game_review
    (review_id, user_id, game_id, rating, review)
  VALUES
    (1, 1, 2, 8, 'fun'),
    (2, 1, 1, 8, 'idk');`;
*/

    const gameID = parseInt(params.gameID);
    // const gameData = await queryGameByID(sql, gameID);

    // publishers : queryPublisher(sql, gameID),
    // developers : queryDeveloper(sql, gameID),
    return {
        gameData : queryGameByID(sql, gameID),
        producers : queryProducer(sql, gameID),
        dlc : queryGameDLC(sql, gameID)
    };
}