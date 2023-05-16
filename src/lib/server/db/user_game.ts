import type { Sql } from 'postgres';

const createFavoriteTable = async (sql: Sql) => {
  await sql`
    CREATE TABLE user_favorite (
        user_id INT,
        game_id INT,
        PRIMARY KEY (user_id, game_id)
    );

    `;
};

const createUserInfoTable = async (sql: Sql) => {
  await sql`
    CREATE TABLE user_game (
        user_id INT,
        game_id INT,
        hours_played INT,
        money_spent DECIMAL(10, 2),
        PRIMARY KEY (user_id, game_id)
    );
    `;
};

const createReviewTable = async (sql: Sql) => {
  await sql`
    CREATE TABLE user_game_review (
        review_id SERIAL,
        user_id INT,
        game_id INT,
        rating INT NOT NULL,
        review TEXT,
        PRIMARY KEY (review_id, user_id, game_id),
        CONSTRAINT rating_range CHECK (rating >= 1 AND rating <= 10)
    );
    `;
};

const makeFK = async (sql: Sql) => {
  sql`ALTER TABLE user_favorite ADD CONSTRAINT favorite_userID FOREIGN KEY (user_id) REFERENCES user(user_id)`;
  sql`ALTER TABLE user_favorite ADD CONSTRAINT favorite_gameID FOREIGN KEY (game_id) REFERENCES game(game_id)`;

  sql`ALTER TABLE user_game ADD CONSTRAINT intersection_userID FOREIGN KEY (user_id) REFERENCES user(user_id)`;
  sql`ALTER TABLE user_game ADD CONSTRAINT intersection_gameID FOREIGN KEY (game_id) REFERENCES game(game_id)`;

  sql`ALTER TABLE user_game_review ADD CONSTRAINT review_userID FOREIGN KEY (user_id) REFERENCES user(user_id)`;
  sql`ALTER TABLE user_game_review ADD CONSTRAINT review_gameID FOREIGN KEY (game_id) REFERENCES game(game_id)`;
};

const dropTables = async (sql: Sql) => {
  await sql`DROP TABLE IF EXISTS user_game_review`;
  await sql`DROP TABLE IF EXISTS user_game`;
  await sql`DROP TABLE IF EXISTS user_favorite`;
};

export const createUserGameRelation = async (sql: Sql) => {
  await dropTables(sql);

  await Promise.all([createFavoriteTable(sql), createUserInfoTable(sql), createReviewTable(sql)]);

  await makeFK(sql);
};

// QUERY
export const queryUserFavorite = async (sql: Sql, userID: number) => {
  return await sql`SELECT user_favorite.*, game.name, user_game.hours_played, user_game.money_spent 
    FROM user_favorite LEFT JOIN user_game 
    ON user_game.user_id = user_favorite.user_id AND user_game.game_id = user_favorite.game_id 
    INNER JOIN game ON user_favorite.game_id = game.game_id WHERE user_favorite.user_id = ${userID}`;
};

export const queryUserGame = async (sql: Sql, userID: number) => {
  return await sql`SELECT * from user_game WHERE user_id = ${userID}`;
};

export const queryUserReview = async (sql: Sql, userID: number) => {
  return await sql`SELECT user_game_review.*, game.name FROM user_game_review INNER JOIN game ON user_game_review.game_id = game.game_id WHERE user_id = ${userID}`;
};

export const queryTotalHours = async (sql: Sql, userID: number) => {
  const [sum] = await sql`SELECT SUM(hours_played) from user_game WHERE user_id = ${userID}`;
  return sum;
};

export const queryTotalMoney = async (sql: Sql, userID: number) => {
  const [sum] = await sql`SELECT SUM(money_spent) from user_game WHERE user_id = ${userID}`;
  return sum;
};

// INSERT
export const insertFavorite = async (sql: Sql, user_id: number, game_id: number) => {
  await sql`INSERT INTO user_favorite (user_id, game_id) VALUES (${user_id}, ${game_id});`;
};

export const insertUserGame = async (
  sql: Sql,
  user_id: number,
  game_id: number,
  hours_played: number,
  money_spent: number
) => {
  await sql`INSERT INTO user_game (user_id, game_id, hours_played, money_spent) VALUES (${user_id}, ${game_id}, ${hours_played}, ${money_spent});`;
};

export const insertReview = async (
  sql: Sql,
  user_id: number,
  game_id: number,
  rating: number,
  review: string
) => {
  await sql`INSERT INTO user_game_review (user_id, game_id, rating, review) VALUES (${user_id}, ${game_id}, ${rating}, ${review});`;
};
