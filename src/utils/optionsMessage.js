/**
  * @param {Player} player Contains the player's information
  * @param {Character} character Contains the character's information
  * @returns {string} A message to display detailing possible user actions
  */
export const optionsMessage = (player, character) => {
  let skillDescriptions = '';
  for (let i = 0; i < character.skills.length; i++) {
    let option = character.skills[i];
    skillDescriptions += `
**!attack ${i + 1}**
Skill: ${option.skill}
Cooldown: ${option.cooldown}
Description: ${option.description}
`;
  }
  const message = `
PLAYER! It is your turn to take an action. Your charge count is ${character.charge}.
${skillDescriptions}
    `;
  return message;
};
