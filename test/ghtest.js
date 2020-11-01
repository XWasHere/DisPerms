const Perms = require('../src/index.js');
const Discord = require('discord.js');
let global = {}

const client = new Discord.Client();
const delay = ms => new Promise(res => setTimeout(res, ms));

client.on('ready', () => {
  console.log("Client Ready");
});

client.on('message', (msg) => {
  try {
    if(!global.Permissions.hasDatabase(msg.guild)) global.Permissions.loadDatabase(msg.guild);
  } catch {
    global.Permissions.initDatabase(msg.guild);
  }
});

async function main() {
  client.login(process.env.dtoken);
  const Permissions = new Perms.PermissionManager(client);
  global.Permissions = Permissions;

  setTimeout(()=>{process.exit(0)}, 1000); //if it works thats the only thing i care about lmao... i need a real test script.
}

main();
