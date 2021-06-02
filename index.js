require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();

const TOKEN = process.env.TOKEN;
bot.login(TOKEN);

bot.on("ready", () => {
    console.log(`Logged in as ${bot.user.tag}!`)
});


const COMMAND = "!";
let fightState = false;


let enemy = {
    "name": "Dragon",
    "hp": 100,
    "atk": 10,
    "def": 5
}

let player = {
    "name": "Hero",
    "hp": 100,
    "atk": 20,
    "def": 7
}

bot.on("message", msg => {
    if (msg.content.charAt(0) === COMMAND) {
        switch (msg.content) {
            case COMMAND + "test":
                msg.channel.send('test');
                break;
            case COMMAND + "greet":
                msg.channel.send('Hello!');
                break;
        }
        // msg.reply("noot noot");
    }
});