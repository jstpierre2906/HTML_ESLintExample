// Docs:
// https://github.com/yeonjuan/es-html-parser?tab=readme-ov-file#ast-format
// https://github.com/eslint/eslint/blob/cceccc771631011e04b37122b990205f0e8b6925/lib/rules/utils/fix-tracker.js#L83
// https://eslint.org/docs/latest/extend/custom-rules#applying-fixes

import { metaHandler } from "../utils/meta.util.js";
import { fixerHandler } from "./dsd-accordion-title-level.fix.js";

const MESSAGE = "Replacing dsd-accordion title-level";
const TAG = "dsd-accordion";

export default {
  meta: metaHandler.init(MESSAGE).getMeta(),
  create: (context) => ({
    Tag(node) {
      if (node.name === TAG) {
        return context.report({
          node: node,
          message: MESSAGE,
          fix: (fixer) => fixerHandler.init(fixer, node).apply(),
        });
      }
    },
  }),
};
