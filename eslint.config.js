const html = require("@html-eslint/eslint-plugin");
const htmlParser = require("@html-eslint/parser");

const noOldAttributePlugin = require("./no-old-attribute.plugin.js");

module.exports = [
  {
    // ...html.configs["flat/recommended"],
    files: ["**/*.html"],
    languageOptions: {
      parser: htmlParser,
    },
    plugins: {
      local: noOldAttributePlugin,
      "@html-eslint": html,
    },
    rules: {
    //   ...html.configs["flat/recommended"].rules,
      "local/enforce-no-old-attribute": "warn",
      "@html-eslint/no-inline-styles": "error",
    },
  },
];
