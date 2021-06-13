-- TODO:  SET up database
CREATE TABLE players (id VARCHAR(20) PRIMARY KEY);
CREATE TABLE characters (
    id SERIAL PRIMARY KEY,
    player_id VARCHAR(20) NOT NULL references players(id) ON DELETE CASCADE,
    name VARCHAR(12) NOT NULL,
    maxhp INT NOT NULL,
    hp INT NOT NULL,
    atk INT NOT NULL,
    def INT NOT NULL
);
CREATE TYPE enum_enemy AS ENUM('Dragon');
CREATE TABLE enemies (
    id SERIAL PRIMARY KEY,
    type enum_enemy NOT NULL,
    maxhp INT NOT NULL,
    hp INT NOT NULL,
    atk INT NOT NULL,
    def INT NOT NULL
);
CREATE TABLE hunt (
    character_id INT NOT NULL references characters(id) ON DELETE CASCADE,
    enemy_id INT NOT NULL references enemies(id) ON DELETE CASCADE,
    PRIMARY KEY(character_id, enemy_id)
);
ALTER TABLE players ADD COLUMN active_character INT REFERENCES characters(id) ON DELETE SET NULL;
