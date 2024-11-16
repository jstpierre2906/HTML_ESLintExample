// Used for vanilla linter
// const html = require("@html-eslint/eslint-plugin");
const htmlParser = require("@html-eslint/parser");

const dsdAccordionTitleLevelPlugin = require("./src/dsd-accordion-title-level/dsd-accordion-title-level.plugin.js");

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
      dsdSubtitle: dsdAccordionTitleLevelPlugin,
    },
    rules: {
      // Doesn't seem to change anything
      // ...html.configs["flat/recommended"].rules,
      // Vanilla linter
      // "@html-eslint/no-inline-styles": "warn",

      // <plugins-key>/<rules.key>: <notice-type>
      "dsdSubtitle/enforce-dsd-accordion-h4-slot-title": "error",
    },
  },
];
