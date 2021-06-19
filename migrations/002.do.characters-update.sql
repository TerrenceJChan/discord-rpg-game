ALTER TABLE characters ADD CONSTRAINT characters_unique_name UNIQUE (player_id, name);
ALTER TABLE characters ADD COLUMN charge INT NOT NULL DEFAULT 0;
