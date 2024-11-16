// Docs:
// https://github.com/yeonjuan/es-html-parser?tab=readme-ov-file#ast-format
// https://github.com/eslint/eslint/blob/cceccc771631011e04b37122b990205f0e8b6925/lib/rules/utils/fix-tracker.js#L83

const setFix = require("./dsd-accordion-title-level.fix.js");
const setMeta = require("../utils/meta.util.js");

const MESSAGE = "Replacing dsd-accordion title-level";
const TAG = "dsd-accordion";

module.exports = {
  meta: setMeta(MESSAGE),
  create: (context) => ({
    Tag(node) {
      if (node.name === TAG) {
        return context.report({
          node: node,
          message: MESSAGE,
          fix: (fixer) => setFix(fixer, node),
        });
      }
    },
  }),
};
