import { fixerContext } from "./dsd-accordion-title-level.context.js";

/**
 * @returns {{
 *  init: function(Object, import("./dsd-accordion-title-level.context.js").ParserNode): Object,
 *  apply: function(): Object[]
 * }}
 */
export const fixerHandler = (() => {
  let fixer;
  let node;
  /** @type {import("./dsd-accordion-title-level.context.js").FixerContext} */
  let contexts;
  return {
    init: (_fixer, _node) => {
      fixer = _fixer;
      node = _node;
      contexts = fixerContext.init(_node).getContexts();
      return fixerHandler;
    },
    apply: () => {
      return Object.keys(contexts)
        .filter((k) => !!contexts[k].node)
        .map((k) => fixer[contexts[k].fixMethod](contexts[k].node.range, contexts[k].replacer));
    },
  };
})();
