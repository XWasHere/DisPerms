const Perms = require('../src/index.js');
const Discord = require('discord.js');
let global = {}

const client = new Discord.Client();

client.on('ready', () => {
  console.log("Client Ready");
});

client.on('message', (msg) => {
  global.pmgr.getPermission(msg.member, 'invertedcode.test')
});

async function main() {
  client.login(process.env.dtoken);
  const testguild = await client.guilds.fetch('767871239938375690')
  global.pmgr = new Perms.PermissionManager(testguild);
  console.log(global.pmgr)
  global.pmgr.setPermission('767872345737658419', 'invertedcode.test', true)
  console.log(global.pmgr)
}

main();
