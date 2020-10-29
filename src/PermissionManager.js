const Discord = require('discord.js');
const PermissionManagerRole = require('./PermissionManagerRole');

/**
 * 
 */
class PermissionManager {
  /**
   * @param {Discord.Guild} [guild]
   */
  constructor(guild) {
    if (guild) {
      /**
       * The Guild ID used to identify it
       * @type {String}
       */
      this.guild = guild.id;

      /**
       * A collection of roles
       * @type {Map<String, PermissionManagerRole>}
       */
      this.roles = {};

      /**
       * A little list of role ID's in order by position in the guild settings
       * @type {String[]}
       */
      this.friendlyRoleIndex = [];

      /**
       * The permissions and roles that have them
       */
      this.perms = {};
      for (const [k,v] of guild.roles.cache) {
        this.roles[k] = new PermissionManagerRole(v);
        this.friendlyRoleIndex[v.position] = k;
      };
    }
  }
  /**
   * Set a permission to a specific value for a role
   * @param {Discord.Role | Discord.Snowflake | String} [role]
   * @param {String} [perm]
   * @param {Boolean} [value=true]
   */
  setPermission(role, perm, value = true) {
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

  /**
   * Gets a permission for a member
   * @param {Discord.GuildMember} [member]
   * @param {String} [perm]
   * @returns {Boolean}
   */
  getPermission(member, perm) {
    return member._roles.some(r=> this.perms[perm].includes(r))
  }
}

module.exports = PermissionManager;
