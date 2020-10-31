const Discord = require('discord.js');
const PermissionManagerGuild = require('./PermissionManagerGuild.js');
const PermissionManagerRole  = require('./PermissionManagerRole.js');
const dbsl = require('./util/DbFileUtil.js');
const {DatabaseAlreadyLoadedError} = require('./util/errors');
const fs = require('fs');
const debug = true;
const log = (data) => {if (debug) console.log(data);};

class PermissionManager {
  /**
   * Initalize a PermissionManager
   * @param {Discord.Client} [clientapp]
   */
  constructor(clientapp, options = {}) {
    this._client = clientapp;

    this.databasePath = options.dbdir ?? './pdatabase/';
    this.databases = {};
    this.databasesDie = options.hasTimeout ?? true;
    this.databasetimeout = options.dbtimeout ?? 100000;
    if (!fs.existsSync(this.databasePath)) fs.mkdirSync(this.databasePath);
  }

  loadDatabase(guild) {
    if (this.databases[guild.id]) {
      throw DatabaseAlreadyLoadedError;
    }
    this.databases[guild.id] = dbsl.load(this.databasePath + guild.id);
    this.databases[guild.id].dies = false;
    if (this.databasesDie) {
      this.databases[guild.id].dies = true;
      this.databases[guild.id].setTimeout(this.databasetimeout);
      this.databases[guild.id]._startTimeout();
    }
    return this.databases[guild.id];
  }

  unloadDatabase(guild) {
    if (!this.databases[guild.id]) throw DatabaseNotLoadedError;
    dbsl.save(this.databases[guild.id], this.databasePath + guild.id);
    delete this.databases[guild.id];
  }

  hasDatabase(guild) {
    return (this.databases[guild.id]);
  }

  getDatabase(guild) {
    return this.databases[guild.id];
  }

  initDatabase(guild) {
    this.databases[guild.id] = new PermissionManagerGuild(guild, this.databasetimeout);
    dbsl.save(this.databases[guild.id], this.databasePath + guild.id);
    return this.databases[guild.id];
  }

  _hookToDie(a) {
    a.signals.on('die', () => {
      dbsl.save(a, a.guild);
      delete this.databases[a.guild];
    })
  }
}

module.exports = PermissionManager;