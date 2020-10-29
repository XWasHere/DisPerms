module.exports = {
  PermissionManager: require('./PermissionManager.js'),
  PermissionManagerRole: require('./PermissionManagerRole.js'),
  Save: require("./util/DbFileUtil.js").save,
  Load: require("./util/DbFileUtil.js").load
};
