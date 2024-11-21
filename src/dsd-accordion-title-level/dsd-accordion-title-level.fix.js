import { fixerContext } from "./dsd-accordion-title-level.context.js";

/**
 * @returns {{
 *  init: function(Object, import("./dsd-accordion-title-level.context.js").ParserNode): Object,
 *  apply: function(): Object[]
 * }}
 */
export const fixerHandler = (() => {
  let fixer;
  /** @type {import("./dsd-accordion-title-level.context.js").FixerContext} */
  let contexts;
  return {
    init: (_fixer, node) => {
      fixer = _fixer;
      contexts = fixerContext.init(node).getContexts();
      return fixerHandler;
    },
    apply: () => {
      return Object.keys(contexts)
        .filter((k) => !!contexts[k].node)
        .map((k) => fixer[contexts[k].fixMethod](contexts[k].node.range, contexts[k].replacer));
    },
  };
})();
