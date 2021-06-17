import { MessageButton, MessageActionRow } from 'discord.js';

export const greet = ({ msg }) => {
  msg.channel.send('Hello', {
    components: [new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomID('fish')
          .setEmoji('fish')
          .setLabel('Fish?')
          .setStyle('PRIMARY'),
        new MessageButton()
          .setCustomID('monster')
          .setEmoji('monster')
          .setLabel('Monster!')
          .setStyle('DANGER'),
      )],
  });
  return 'You have been greeted.';
};
