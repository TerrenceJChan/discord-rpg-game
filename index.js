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

const hunt = () => {
    fightState = true;
}

const attack = () => {
    const random20 = () => {
        return 1 + ((Math.floor(Math.random() * 41) - 20) / 100);
    }

    let enemyDamage = Math.floor((player.atk * random20()) - (enemy.def * random20()));
    console.log(enemyDamage);
    if (enemyDamage < 0) {
        enemyDamage = 0;
    }

    let playerDamage = Math.floor((enemy.atk * random20()) - (player.def * random20()));
    console.log(playerDamage);
    if (playerDamage < 0) {
        playerDamage = 0;
    }

    enemy.hp =- enemyDamage;
    player.hp =- playerDamage;

    return(`The adventurer slashes the dragon for ${enemyDamage} damage! The dragon retaliates and deals ${playerDamage} damage!`)
}

bot.on("message", msg => {
    if (fightState === false) {
        if (msg.content.charAt(0) === COMMAND) {
            switch (msg.content) {
                case COMMAND + "hunt":
                    msg.channel.send("You encounter a dragon! You assume a battle stance as it directs its furious attention in your direction.");
                    hunt();
                    break;
                case COMMAND + "greet":
                    msg.channel.send("Hello!");
                    break;
            }
            // msg.reply("noot noot");
        }
    } else {
        if (msg.content.charAt(0) === COMMAND) {
            switch (msg.content) {
                case COMMAND + "attack":
                    msg.channel.send(attack());
                    break;
            }
            // msg.reply("noot noot");
        }
    }
});