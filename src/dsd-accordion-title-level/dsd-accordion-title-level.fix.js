const setFixerContext = require("./dsd-accordion-title-level.context.js");

module.exports = (fixer, node) => {
  const fixerContext = setFixerContext(node);
  return Object.keys(fixerContext)
    .filter((k) => !!fixerContext[k].node)
    .map((k) => {
      return fixer[fixerContext[k].fixMethod](fixerContext[k].node.range, fixerContext[k].replacer);
    });
};
