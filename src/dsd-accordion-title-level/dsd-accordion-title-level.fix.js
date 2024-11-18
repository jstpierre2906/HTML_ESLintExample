import setFixerContext from "./dsd-accordion-title-level.context.js";

export default (fixer, node) => {
  /** @type {import("./dsd-accordion-title-level.context.js").FixerContext} */
  const fixerContext = setFixerContext(node);

  return Object.keys(fixerContext)
    .filter((k) => !!fixerContext[k].node)
    .map((k) => {
      return fixer[fixerContext[k].fixMethod](fixerContext[k].node.range, fixerContext[k].replacer);
    });
};
