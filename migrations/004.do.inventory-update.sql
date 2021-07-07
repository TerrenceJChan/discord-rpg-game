CREATE TYPE enum_material AS ENUM('Dragon Talon', 'Dragon Hide', 'Dragon Fang');
CREATE TABLE materials (
    material_type enum_material NOT NULL,
    quantity INT NOT NULL,
    player_id VARCHAR(20) NOT NULL references players(id) ON DELETE CASCADE,
    PRIMARY KEY(player_id, material_type)
);
CREATE TYPE enum_geartype AS ENUM('DragonsBite');
CREATE TABLE equipment (
    id SERIAL PRIMARY KEY,
    player_id VARCHAR(20) NOT NULL references players(id) ON DELETE CASCADE,
    mods JSONB NOT NULL DEFAULT '[]' CHECK (jsonb_typeof(mods) = 'array')
);