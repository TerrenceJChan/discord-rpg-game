CREATE TYPE enum_material AS ENUM('Dragon Talon', 'Dragon Hide', 'Dragon Fang');
CREATE TABLE materials (
    type enum_material NOT NULL,
    quantity INT NOT NULL,
    PRIMARY KEY(player_id, material_id)
);
CREATE TYPE enum_geartype AS ENUM('DragonsBite');
CREATE TABLE equipment (
    id SERIAL PRIMARY KEY,
    player_id INT NOT NULL references players(id) ON DELETE CASCADE,
    type enum_geartype NOT NULL
);
CREATE TABLE equipment_mods (
    id SERIAL PRIMARY KEY,
    equipment_id INT NOT NULL REFERENCES equipment (id) ON DELETE CASCADE,
    mods JSONB NOT NULL
);
ALTER TABLE players
ADD COLUMN active_character INT REFERENCES characters(id) ON DELETE
SET NULL;
