const Perms = require('../src/index.js');
const Discord = require('discord.js');

const client = new Discord.Client();

client.on('ready', () => {
  console.log("Client Ready");
});

client.on('message', (msg) => {

});

async function main() {
  client.login(process.env.dtoken);
  const testguild = await client.guilds.fetch('767871239938375690')
  const pmgr = new Perms.PermissionManager(testguild);
  console.log(pmgr)
  pmgr.setPermission('767872345737658419', 'invertedcode.test', true)
  console.log(pmgr)
}

main();
