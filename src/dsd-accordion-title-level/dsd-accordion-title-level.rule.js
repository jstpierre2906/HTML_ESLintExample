const attributeAdapter = require("../utils/attribute-adapter.util.js");
const setMeta = require("../utils/meta.util.js");

const message = "Replacing dsd-accordion title-level";
const dsdAccordionTitleLevelAttrPredicate = (a) => {
  attributeAdapter.init({ attribute: "title-level", values: ["2", "3", "4", "5", "6"] });
  const titleLevelAttrArray = attributeAdapter.toAttrArray();
  const titleLevelValuesArray = attributeAdapter.toValuesArray();
  return titleLevelAttrArray.includes(a.key.value) && titleLevelValuesArray.includes(a.value.value);
};
let fixerContext = {};

const fromPredicate = (attr) => {
  attributeAdapter.init({ attribute: "slot", values: ["title"] });
  const slotAttrArray = attributeAdapter.toAttrArray();
  const slotValuesArray = attributeAdapter.toValuesArray();
  return (
    attr.parent?.parent.name === "dsd-accordion" &&
    attr.parent?.parent?.attributes?.find((a) => dsdAccordionTitleLevelAttrPredicate(a)) &&
    attr.parent.name === "span" &&
    slotAttrArray.includes(attr.key.value) &&
    slotValuesArray.includes(attr.value.value)
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
