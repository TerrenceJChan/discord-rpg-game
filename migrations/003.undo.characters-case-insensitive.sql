DROP INDEX characters_unique_name;
ALTER TABLE characters ADD CONSTRAINT characters_unique_name UNIQUE (player_id, name);
