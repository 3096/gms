import type { Sql } from 'postgres';

export const testDB = async (sql: Sql) => {
  await sql`INSERT INTO game
    (name, release_date, website, description, franchise, platform, genre)
    VALUES
    ('Xenoblade Chronicles 3', '2022-07-29', 'https://www.nintendo.co.jp/switch/az3ha', 'Join Noah and Mio, members of the two opposing nations of Keves and Agnus, on a heartfelt journey through a warring world with a dark secret. Traverse massive, fantastical landscapes and master seamless real-time RPG combat as you expose the true enemy pulling the strings.', 'Xenoblade Chronicles', 'Nintendo Switch', 'Action, JRPG'),
    ('Rocket League', '2015-07-07', 'https://www.rocketleague.com/', 'Rocket League is a high-powered hybrid of arcade-style soccer and vehicular mayhem with easy-to-understand controls and fluid, physics-driven competition.', 'Rocket League', 'PC, PS4, Xbox One, Nintendo Switch', 'Sports, Driving');
  `;
  await sql`INSERT INTO publisher
    (name, website)
    VALUES
    ('Nintendo', 'https://www.nintendo.com/'),
    ('Epic Games', 'https://www.epicgames.com/site/en-US/home/');
  `;
  await sql`INSERT INTO publishmentship
    (game_id, publisher_id)
    VALUES
    (1, 1),
    (2, 2);
  `;
  await sql`INSERT INTO developer
    (name)
    VALUES
    ('Monolith Soft'),
    ('Psyonix');
  `;
  await sql`INSERT INTO developmentship
    (game_id, developer_id)
    VALUES
    (1, 1),
    (2, 2);
  `;
  await sql`
    INSERT INTO dlc
    (game_id, name, release_date, description)
    VALUES
    (1, 'Expansion Pass', '2022-07-29', 'The Xenoblade Chronicles 3 Expansion Pass includes access to multiple waves of DLC content.'),
    (2, 'Season 10 Veteran Pack', '2023-04-26', 'Reach the stars with this sky-flying drift car! Pick up the Sky Blue Takumi RXT Car and the perfectly paired Black Hiro Wheels.');
  `;

  await sql`INSERT INTO "user"
    (username)
    VALUES
    ('dvdsng'),
    ('3096'),
    ('azlothe');
  `;
  await sql` INSERT INTO user_favorite
    (user_id, game_id)
    VALUES
    (1, 2),
    (1, 1),
    (2, 1),
    (3, 1);
  `;
  await sql`INSERT INTO user_game
    (user_id, game_id, hours_played, money_spent)
    VALUES
    (1, 2, 2000, 26.87),
    (1, 1, 62, 59.99),
    (2, 1, 64, 59.99),
    (3, 1, 168, 59.99);
  `;
  await sql`  INSERT INTO user_game_review
    (user_id, game_id, rating, review)
    VALUES
    (1, 2, 8, 'fun'),
    (1, 1, 8, 'idk');
  `;
};
