import type { Sql } from 'postgres';

// ===================== BEGIN TABLE DEFINITION =====================
const createGameTable = async (sql: Sql) => {
  await sql`
    CREATE TABLE game (
        game_id SERIAL,
        name VARCHAR(64) NOT NULL,
        release_date DATE,
        website VARCHAR(255),
        description TEXT,
        franchise VARCHAR(64),
        platform VARCHAR(64),
        genre VARCHAR(64),
        PRIMARY KEY (game_id)
    );    
  `;

  await sql`CREATE INDEX idx_gameID ON game (game_id)`;
};

const createPublisherTable = async (sql: Sql) => {
  await sql`
    CREATE TABLE publisher (
        publisher_id SERIAL,
        name VARCHAR(64) NOT NULL,
        website VARCHAR(255),
        PRIMARY KEY (publisher_id)
    );
    `;

  await createPublishmentshipTable(sql);
};

const createPublishmentshipTable = async (sql: Sql) => {
  await sql`
    CREATE TABLE publishmentship (
        game_id INT,
        publisher_id INT,
        PRIMARY KEY (game_id, publisher_id)
    );
    `;
};

const createDeveloperTable = async (sql: Sql) => {
  await sql`
    CREATE TABLE developer (
        developer_id SERIAL,
        name VARCHAR(64) NOT NULL,
        PRIMARY KEY (developer_id)
    );
    `;

  await createDevelopmentshipTable(sql);
};

const createDevelopmentshipTable = async (sql: Sql) => {
  await sql`
    CREATE TABLE developmentship (
        game_id INT,
        developer_id INT,
        PRIMARY KEY (game_id, developer_id)
    );
    `;
};

const createDLCTable = async (sql: Sql) => {
  await sql`
    CREATE TABLE dlc (
        dlc_id SERIAL,
        game_id INT,
        name VARCHAR(64) NOT NULL,
        release_date DATE,
        description TEXT,
        PRIMARY KEY (dlc_id, game_id),
        FOREIGN KEY (game_id) REFERENCES game(game_id)
    );
    `;
};

/**
 * Set up foreign key relationships
 */
const makeFK = async (sql: Sql) => {
  sql`ALTER TABLE publishmentship ADD CONSTRAINT publishment_gameID FOREIGN KEY (game_id) REFERENCES game(game_id);`;

  sql`ALTER TABLE publishmentship ADD CONSTRAINT publishment_publisherID FOREIGN KEY (publisher_id) REFERENCES publisher(publisher_id);`;

  sql`ALTER TABLE developmentship ADD CONSTRAINT development_gameID FOREIGN KEY (game_id) REFERENCES game(game_id);`;

  sql`ALTER TABLE developmentship ADD CONSTRAINT development_developerID FOREIGN KEY (developer_id) REFERENCES developer(developer_id);`;

  sql`ALTER TABLE dlc ADD CONSTRAINT dlc_gameID FOREIGN KEY (game_id) REFERENCES game(game_id)`;
};
// ===================== END TABLE DEFINITION =====================

const dropTables = async (sql: Sql) => {
  await sql`DROP TABLE IF EXISTS dlc`;
  await sql`DROP TABLE IF EXISTS developmentship`;
  await sql`DROP TABLE IF EXISTS developer`;
  await sql`DROP TABLE IF EXISTS publishmentship`;
  await sql`DROP TABLE IF EXISTS publisher`;
  await sql`DROP TABLE IF EXISTS game`;
};

export const createGame = async (sql: Sql) => {
  await dropTables(sql);

  await Promise.all([
    createGameTable(sql),
    createPublisherTable(sql),
    createDeveloperTable(sql),
    createDLCTable(sql)
  ]);

  await makeFK(sql);
};

// QUERY OPERATIONS
// export const query = async (sql: Sql, table : string, columns : string[], condition: string) => {

//     let command = `SELECT `;
//     command += (columns != null || columns.length == 0) ? `*` : columns.join(`, `);

//     command += ` FROM ` + "table";

//     if (condition)
//     command += ` ` + (condition.startsWith(`WHERE`) ? condition : (`WHERE ` + condition));
//     command += `;`;

//     return await sql `` + command;
//   };

export const queryGame = async (sql: Sql) => {
  return await sql`SELECT * FROM game`;
};

export const queryGameByID = async (sql: Sql, gameID: number) => {
  const [game] = await sql`SELECT * FROM game WHERE game_id = ${gameID}`;
  return game;
};

export const queryPublisher = async (sql: Sql, gameID: number) => {
  return await sql`SELECT * FROM 
    publisher INNER JOIN publishmentship 
    ON publisher.publisher_id = publishmentship.publisher_id AND publishmentship.game_id = ${gameID}`;
};

export const queryPublishmentship = async (sql: Sql) => {
  return await sql`SELECT * FROM publishmentship`;
};

export const queryDeveloper = async (sql: Sql, gameID: number) => {
  return await sql`SELECT * FROM 
    developer INNER JOIN developmentship 
    ON developer.developer_id = developmentship.developer_id AND developmentship.game_id = ${gameID}`;
};

export const queryDevelopmentship = async (sql: Sql) => {
  return await sql`SELECT * FROM developmentship`;
};

export const queryProducer = async (sql: Sql, gameID: number) => {
  return await sql`SELECT name FROM 
    publisher INNER JOIN publishmentship 
    ON publisher.publisher_id = publishmentship.publisher_id AND publishmentship.game_id = ${gameID}
    UNION
    SELECT name FROM 
    developer INNER JOIN developmentship 
    ON developer.developer_id = developmentship.developer_id AND developmentship.game_id = ${gameID}
    `;
};

export const queryDLC = async (sql: Sql) => {
  return await sql`SELECT * FROM dlc`;
};

export const queryGameDLC = async (sql: Sql, gameID: number) => {
  return await sql`SELECT * FROM dlc WHERE game_id = ${gameID}`;
};

// INSERT OPERATIONS
export const insertGame = async (
  sql: Sql,
  name: string,
  release_date: string,
  website: string,
  description: string,
  franchise: string,
  platform: string,
  genre: string
) => {
  await sql`INSERT INTO game (name, release_date, website, description, franchise, platform, genre) VALUES (${name}, ${release_date}, ${website}, ${description}, ${franchise}, ${platform}, ${genre});`;
};

export const insertPublisher = async (sql: Sql, name: string, website: string) => {
  await sql`INSERT INTO publisher (name, website) VALUES (${name}, ${website});`;
};

export const insertPublishmentship = async (sql: Sql, game_id: number, publisher_id: number) => {
  await sql`INSERT INTO publishmentship (game_id, publisher_id) VALUES (${game_id}, ${publisher_id});`;
};

export const insertDeveloper = async (sql: Sql, name: string) => {
  await sql`INSERT INTO developer (name) VALUES (${name});`;
};

export const insertDevelopmentship = async (sql: Sql, game_id: number, developer_id: number) => {
  await sql`INSERT INTO developmentship (game_id, developer_id) VALUES (${game_id}, ${developer_id});`;
};

export const insertDLC = async (
  sql: Sql,
  game_id: number,
  name: string,
  release_date: string,
  description: string
) => {
  await sql`INSERT INTO dlc (game_id, name, release_date, description) VALUES (${game_id}, ${name}, ${release_date}, ${description});`;
};

export const queryGameMatchingText = async (sql: Sql, searchStr: string) => {
  return await sql`SELECT * FROM game WHERE 
    name LIKE %${searchStr}%
    OR release_date LIKE %${searchStr}%
    OR platform LIKE %${searchStr}%
    OR genre LIKE %${searchStr}%;`;
};

export const queryAllGames = async (sql: Sql) => {
  return await sql`SELECT * FROM game`;
};

export const queryGameByAttributeValue = async (
  sql: Sql,
  attribute: string,
  attribute_value: number | string | Date
) => {
  // idk if Date will work
  return await sql`SELECT * FROM "game" WHERE ${attribute} = ${attribute_value}`;
};

// export const insertGame = async (sql: Sql, name: string, release_date: Date, website: string, description: string, franchise: string, platform: string, genre: string) => {
//   await sql`
//     INSERT INTO "game"
//       (name, release_date, website, description, franchise, platform, genre)
//     VALUES
//       (${name}, ${release_date}, ${website}, ${description}, ${franchise}, ${platform}, ${genre})
//   `;
// };
