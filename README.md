# Discord Adventure RPG (Name TBD)

Slayer of beasts, guardian of the last bastion of humanity, venture to the den of monsters and defeat the enemies of humankind!

This is a text-based adventure RPG played on [Discord](https://discord.com/), a free VoIP app. Individuals and groups of players craft and customize their characters to face-off against powerful enemies in turn-based combat.

  - [Game Design](#game-design)
    + [Philosophy and Influences](#philosophy-and-influences)
    + [Game Loop](#game-loop)
  - [Stacks Used](#stacks-used)
  - [Contributors](#contributors)
  - [Progress](#progress)
  - [Roadmap](#roadmap)

## Game Design

Although this section can be read in any order, the explanation for how this game is conceived is best read from top to bottom, starting with the [Philosophy and Influences](#influences).

### Philosophy and Influences

"Grinding" is a controversial mechanic in game design. Detractors argue that by arbitrarily increasing the amount of time it takes for players to reach a goal disrespects the player's time, and waters down the gaming experience into an unmeaningful repetition of actions. Conversely, some players enjoy the long and steady work towards a goal, and sense of *pride and accomplishment* outweighs the possible troughs in the gaming experience.

The popular **Monster Hunter** video game series features heroic players who wield over-the-top, menacing weapons to face-off against even more menacing enemies, which typically include massive, dinosaur-esque creatures.

Here, grinding is a core mechanic where players repeatedly slay and capture monsters to obtain their materials to craft new equipment. Said equipment feature special properties, such as increased fire protection, or increased damage against certain types of enemies. This creates a feedback loop where players slay monsters, craft new gear, and try to slay monsters even more efficiently with their gained experience and new items.

This Discord game aims to streamline the intensity of this experience into a more strategic experience, where players similarly fight off against powerful enemies, but in turn-based combat. By nature, the game will have long "reach" goals for the player to work towards, while being a more casual experience.

Thanks to the power of Discord, many digital communities are made between friends and similarly-minded gamers. This allows this game to be very accessible to individuals, groups of friends, or "hardcore" players who might want to team up together to tackle the hardest challenges the game has to offer.

### Game Loop

Players control an adventuring company of customizable characters. They venture off alone or with a party of other players to fight monsters.

Combat is turn-based, with various mechanics including cooldowns and skill variety (think **Pokémon!**) on both the players' and enemy's part, creating a situation where fights should be pre-planned and tactical decisions being made during a fight.

Once a monster is slain, the participating players gain monster-specific crafting material in which they use to craft new gear, be it armours or weapons.

With new gear worn and in hand, players venture off to take on another battle!

## Stack Used

This game is being developed using [Node.js](https://nodejs.org/en/) and [PostgreSQL](https://www.postgresql.org/). The game is played over **Discord**, and it takes advantage of the [npm package](https://discord.js.org/#/) `discord.js` to allow the game's bot to describe the game world and interact with players.

## Contributors

Made by two friends!

- [TerrenceJChan](https://github.com/TerrenceJChan) / Code Monkey, "Ideas Guy", "Hey Cam, why isn't this working?"
- [foxfriends](https://github.com/foxfriends) / Database Guru, Houses the biggest brain, Is more interested in the code than the game ¯\_(ツ)_/¯

## Progress

**June 28:** This game is currently "working" in its Alpha phase in our development server! We can fight monsters using a variety of attacks, and the monsters return in kind! Focusing on creating the database to store player information for game persistence.

## Roadmap

| Alpha (Current)                                              | Closed-Beta (ETA Mid-Late July)                              | Open-Beta (TBD)                                              | Launch                                                       |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | ------------------------------------------------------------ |
| Crafting (recipes, item stats, inventory)<br /><br />Fighting monsters (cooldowns, skills)<br /><br />Discord game user account creation<br /><br />Uploading and retrieving player information onto database | Closed Discord server for initial player testing<br /><br />Party features (group combat)<br /><br />Item enhancement and upgrading<br /><br />Initial power-curving design | Open Discord server for larger-scale testing<br /><br />Enemy AI for more engaging fights<br /><br />Power-curving refinement and general balancing | Game Bot available for users to add to their servers<br /><br />Playing the game ourselves! |
