const html = require("@html-eslint/eslint-plugin");
const htmlParser = require("@html-eslint/parser");

const noBgcolorTurquoisePlugin = require("./src/no-bgcolor-turquoise.plugin.js");

module.exports = [
  {
    // Doesn't seem to change anything
    // ...html.configs["flat/recommended"],
    files: ["**/*.html"],
    languageOptions: {
      parser: htmlParser,
    },
    plugins: {
      // Vanilla linter
      // "@html-eslint": html,

      // A custom rule must be wrapped inside a custom plugin
      local: noBgcolorTurquoisePlugin,
    },
    rules: {
      // Doesn't seem to change anything
      // ...html.configs["flat/recommended"].rules,
      // Vanilla linter
      // "@html-eslint/no-inline-styles": "warn",

      // <plugins-key>/<rules.key>: <notice-type>
      "local/enforce-no-bgcolor-turquoise": "error",
    },
  },
];
