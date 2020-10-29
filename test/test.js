const Perms = require('../src/index.js');
const Discord = require('discord.js');
let global = {}

const client = new Discord.Client();

client.on('ready', () => {
  console.log("Client Ready");
});

client.on('message', (msg) => {
  if (global.pmgr.getPermission(msg.member, 'invertedcode.test')) {
    console.log('a');
  }
});

async function main() {
  client.login(process.env.dtoken);
  const testguild = await client.guilds.fetch('767871239938375690')
  global.pmgr = new Perms.PermissionManager(testguild);
  console.log(global.pmgr)
  global.pmgr.setPermission('767872345737658419', 'invertedcode.test', true)
  console.log(global.pmgr)
  Perms.Save(global.pmgr, "./test/a.json");
  global.pmgr = null;
  global.pmgr = Perms.Load('./test/a.json');
  console.log(global.pmgr);
}

main();
