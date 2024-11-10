const setMeta = require("../utils/meta.util.js");

const message = "Replacing dsd-accordion title-level";
const dsdAccordionTitleLevelAttrPredicate = (a) =>
  a.key.value === "title-level" && a.value.value === "4";

const fromPredicate = (attr) => {
  return (
    attr.parent.parent.name === "dsd-accordion" &&
    attr.parent.parent.attributes.find((a) => dsdAccordionTitleLevelAttrPredicate(a)) &&
    attr.parent.name === "span" &&
    attr.key.value === "slot" &&
    attr.value.value === "title"
  );
};

const fixerFunc = (fixer, attr) => {
  const dsdAccordionTitleLevelAttr = attr.parent.parent.attributes.find((a) =>
    dsdAccordionTitleLevelAttrPredicate(a)
  );
  const span = attr.parent;

  // https://github.com/eslint/eslint/blob/cceccc771631011e04b37122b990205f0e8b6925/lib/rules/utils/fix-tracker.js#L83

  return [
    fixer.replaceTextRange(span.openStart.range, "<h4"),
    fixer.replaceTextRange(span.close.range, "</h4>"),
    fixer.replaceTextRange(dsdAccordionTitleLevelAttr.range, ""),
  ];
};

module.exports = {
  meta: setMeta(message),
  create: (context) => ({
    Tag(node) {
      if (!node?.attributes.length) {
        return;
      }
      node.attributes
        .filter((attr) => fromPredicate(attr))
        .forEach((attr) =>
          context.report({
            node: attr,
            message: message,
            fix: (fixer) => fixerFunc(fixer, attr),
          })
        );
    },
  }),
};
