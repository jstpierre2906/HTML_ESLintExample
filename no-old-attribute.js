const setMeta = () => ({
  type: "problem",
  docs: {
    description: "disallow old HTML attributes and replace bgcolor",
    category: "Best Practices",
    recommended: false,
  },
  fixable: "code",
  schema: [], // no options
});
const fromPredicate = (attr) => {
  return (
    attr.key.type === "AttributeKey" &&
    attr.key.value === "bgcolor" &&
    attr.value.type === "AttributeValue" &&
    attr.value.value === "turquoise"
  );
};
const callFixerFunc = (fixer, attr) => {
  const start = attr.range[0];
  const end = attr.range[1];
  return fixer.replaceTextRange([start, end], 'class="turquoise"');
};
const setReport = (attr) => ({
  node: attr,
  message: "Old HTML attribute 'bgcolor' is not allowed. Use 'class' instead.",
  fix: (fixer) => callFixerFunc(fixer, attr),
});
module.exports = {
  meta: setMeta(),
  create: (context) => ({
    Tag(node) {
      if (!node?.attributes.length) {
        return;
      }
      node.attributes
        .filter((attr) => fromPredicate(attr))
        .forEach((attr) => context.report(setReport(attr)));
    },
  }),
};
