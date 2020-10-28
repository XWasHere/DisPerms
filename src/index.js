const Void = (...crap) => {};

const Discord = require('discord.js');
const fs = require('fs');





class PermissionManager {
  constructor(guild) {
    this.roles = {};
    this.friendlyRoleIndex = [];
    this.perms = {};
    for (const [k,v] of guild.roles.cache) {
      this.roles[k] = new PermissionManagerRole(v);
      this.friendlyRoleIndex[v.position] = k;
    };
  }
  setPermission(role, perm, value) {
    var r = '0';
    if (role instanceof Discord.Role) {
      r = role.id;
    } else {
      r = role;
    }
    this.roles[r].setPerm(perm, value);
    if (this.perms[perm] == null) {
      this.perms[perm] = [];
    }
    this.perms[perm].push(r);
  }
  getPermission(member, perm) {
    
  }
}
