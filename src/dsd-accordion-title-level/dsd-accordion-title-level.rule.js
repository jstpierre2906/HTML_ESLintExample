const setMeta = require("../utils/meta.util.js");

const message = "Replacing dsd-accordion title-level";
const dsdAccordionTitleLevelAttrPredicate = (a) => {
  return a.key.value === "title-level" && a.value.value === "4";
};
let fixerContext = {};

const fromPredicate = (attr) => {
  // Needs to be refactored in case dsd-accordion textContent is placed before span slot=title
  return (
    attr.parent?.parent.name === "dsd-accordion" &&
    attr.parent?.parent?.attributes?.find((a) => dsdAccordionTitleLevelAttrPredicate(a)) &&
    attr.parent.name === "span" &&
    attr.key.value === "slot" &&
    attr.value.value === "title"
  );
};

const fixerFunc = (fixer) => {
  // https://github.com/eslint/eslint/blob/cceccc771631011e04b37122b990205f0e8b6925/lib/rules/utils/fix-tracker.js#L83
  return [
    fixer.replaceTextRange(fixerContext.span.openStart.range, "<h4"),
    fixer.replaceTextRange(fixerContext.span.close.range, "</h4>"),
    fixer.replaceTextRange(fixerContext.dsdAccordionTitleLevelAttr.range, ""),
  ];
};

module.exports = {
  meta: setMeta(message),
  create: (context) => ({
    // https://github.com/yeonjuan/es-html-parser?tab=readme-ov-file#ast-format
    Tag(node) {
      if (!node.attributes?.length) {
        return;
      }
      node.attributes
        .filter((attr) => fromPredicate(attr))
        .map((attr) => {
          // Needs to be refactored in case dsd-accordion textContent is placed before span slot=title
          fixerContext = {
            span: attr.parent,
            dsdAccordionTitleLevelAttr: attr.parent.parent.attributes.find((a) =>
              dsdAccordionTitleLevelAttrPredicate(a)
            ),
          };
          return attr;
        })
        .forEach((attr) =>
          context.report({
            node: attr,
            message: message,
            fix: (fixer) => fixerFunc(fixer),
          })
        );
    },
  }),
};
