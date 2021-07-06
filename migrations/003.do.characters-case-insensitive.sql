ALTER TABLE characters DROP CONSTRAINT characters_unique_name;
CREATE UNIQUE INDEX characters_unique_name ON characters (player_id, LOWER(name));
