const noOldAttributeRule = require("./no-old-attribute.js");
const plugin = {
  rules: {
    "enforce-no-old-attribute": noOldAttributeRule,
  },
};
module.exports = plugin;
