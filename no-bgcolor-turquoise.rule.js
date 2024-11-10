const setMeta = require("./utils/meta.util.js");
const setReport = require("./utils/report.util.js");

const fromPredicate = (attr) => {
  return (
    attr.key.type === "AttributeKey" &&
    attr.key.value === "bgcolor" &&
    attr.value.type === "AttributeValue" &&
    attr.value.value === "turquoise"
  );
};

const fixerFunc = (fixer, attr) => {
  const start = attr.range[0];
  const end = attr.range[1];
  return fixer.replaceTextRange([start, end], 'class="turquoise"');
};

module.exports = {
  meta: setMeta("disallow old HTML attributes and replace bgcolor"),
  create: (context) => ({
    Tag(node) {
      if (!node?.attributes.length) {
        return;
      }
      node.attributes
        .filter((attr) => fromPredicate(attr))
        .forEach((attr) => context.report(setReport(attr, fixerFunc)));
    },
  }),
};
