/**
  * @param {object} player Contains the player's information
  * @returns {string} A message to display detailing possible user actions
  */
export const optionsMessage = ({ player }) => {
  const skillDescriptions = () => {
    let listOptions = '';
    for (let i = 0; i < 3; i++) {
      let option = player.skills[i];
      listOptions += `
**!attack ${i + 1}**
Skill: ${option.skill}
Cooldown: ${option.cooldown}
Description: ${option.description}
`;
    }
    return listOptions;
  };
  const message = `
PLAYER! It is your turn to take an action. Your charge count is ${player.charge}.
${skillDescriptions()}
    `;
  return message;
};