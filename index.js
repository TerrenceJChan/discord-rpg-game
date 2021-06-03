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
    "name": "The dragon",
    "hp": 100,
    "atk": 10,
    "def": 5,
    "msgs": {
        "defeat": "With a final growl, the defeated dragon collapses onto the ground.",
        "encounter": "Your party tracks down the nest of a large dragon. It shrieks as it rears its head towards you. It's going to attack!",
        "sub50": ["Blood runs down the dragon's scaly hide. The dragon gives a terrifying roar.", false]
    }
}

let player = {
    "name": "Hero",
    "hp": 100,
    "atk": 20,
    "def": 7
}

let fightInfo = {
    "startingEnemyHp": enemy.hp
}

const hunt = () => {
    fightState = true;
    return enemy.msgs.encounter;
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

    enemy.hp -= enemyDamage;
    player.hp -= playerDamage;

    let genericMsg = `${player.name} slashes the dragon for ${enemyDamage} damage! ${enemy.name} retaliates and deals ${playerDamage} damage!`;

    if (player.hp <= 0) {
        return `${player.name} has taken too much damage and cannot carry on! ${player.name} retreats from the battle.`
    } else {
        switch (true) {
            case enemy.hp <= 0:
                return genericMsg + " " + enemy.msgs.defeat;
            case enemy.hp <= fightInfo.startingEnemyHp * 0.5 && enemy.msgs.sub50[1] === false:
                enemy.msgs.sub50[1] = true;
                return genericMsg + " " + enemy.msgs.sub50[0];
            default:
                return genericMsg;
        }
    }
}
// return (`The adventurer slashes the dragon for ${enemyDamage} damage! The dragon retaliates and deals ${playerDamage} damage!`);

const check = () => {
    return `The ${enemy.name} has ${enemy.hp} health remaining.`
}

bot.on("message", msg => {
    if (fightState === false) {
        if (msg.content.charAt(0) === COMMAND) {
            switch (msg.content) {
                case COMMAND + "hunt":
                    msg.channel.send(hunt());
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
                case COMMAND + "check":
                    msg.channel.send(check());
                    break;
            }
            // msg.reply("noot noot");
        }
    }
});