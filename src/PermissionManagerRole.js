const Discord = require('discord.js');

class PermissionManagerRole {
  constructor(role) {
    this.id = role.id;
    this.priority = role.position;
    this.perms = {};
  }
  setPerm(permission, value) {
    this.perms[permission] = value;
  }
}
