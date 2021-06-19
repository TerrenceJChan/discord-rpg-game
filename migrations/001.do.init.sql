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
CREATE TYPE enum_material AS ENUM('Dragon Talon', 'Dragon Hide', 'Dragon Fang');
CREATE TABLE materials (
    type enum_material NOT NULL,
    quantity (int),
    PRIMARY KEY(player_id, material_id)
);
CREATE TYPE enum_geartype AS ENUM('DragonsBite');
CREATE TABLE equipment (
    id SERIAL PRIMARY KEY,
    player_id INT NOT NULL references players(id) ON DELETE CASCADE,
    type enum_geartype NOT NULL;
);
-- CREATE TYPE enum_mod AS ENUM('PhysAtk', 'FireAtk', 'IceAtk', 'ShockAtk', 'PhysDef', 'FireDef', 'IceDef', 'ShockDef');
CREATE TABLE equipment_mods (
    mods JSONB,
    PRIMARY KEY(player_id, equipment_id),
);
ALTER TABLE players
ADD COLUMN active_character INT REFERENCES characters(id) ON DELETE
SET NULL;