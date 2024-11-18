// Used for vanilla linter
// import html from "@html-eslint/eslint-plugin";
import htmlParser from "@html-eslint/parser";
import dsdAccordionTitleLevelPlugin from "./src/dsd-accordion-title-level/dsd-accordion-title-level.plugin.js";

export default [
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
      dsdAccordionTitleLevel: dsdAccordionTitleLevelPlugin,
    },
    rules: {
      // Doesn't seem to change anything
      // ...html.configs["flat/recommended"].rules,
      // Vanilla linter
      // "@html-eslint/no-inline-styles": "warn",

      // <plugins-key>/<rules.key>: <notice-type>
      "dsdAccordionTitleLevel/enforce-dsd-accordion-title-level": "error",
    },
  },
];
