// https://www.npmjs.com/package/es-html-parser#ast-format

import { attributeAdapter } from "../utils/attribute-adapter.util.js";

/**
 * @typedef {
 *  | import("es-html-parser").AttributeNode
 *  | import("es-html-parser").OpenTagStartNode
 *  | import("es-html-parser").CloseTagNode} ParserNode
 */

/**
 * @typedef {{
 *  [key: string]: {
 *    node: ParserNode;
 *    replacer: string;
 *    fixMethod: "replaceTextRange" | "insertTextAfterRange" | string
 *  }
 * }} FixerContext
 */

/**
 * @returns {{
 *  init: function(BaseNode): Object,
 *  getContexts: function(): FixerContext
 * }}
 */
export const fixerContext = (() => {
  let node;
  let titleLevelAttr;
  let spanSlotTitle;
  const setTitleLevelAttr = () => {
    const titleLevelAttrAdapter = attributeAdapter.init({
      attribute: "title-level",
      values: ["2", "3", "4", "5", "6"],
    });
    /** @type {string[]}  */
    const titleLevelAttrArray = titleLevelAttrAdapter.toAttrArray();
    /** @type {string[]}  */
    const titleLevelValuesArray = titleLevelAttrAdapter.toValuesArray();
    /** @type {import("es-html-parser").AttributeNode | undefined} */
    titleLevelAttr = node.attributes.find((a) => {
      return (
        titleLevelAttrArray.includes(a.key.value) && titleLevelValuesArray.includes(a.value.value)
      );
    });
  };
  const setSpanSlotTitle = () => {
    const spanSlotTitleAdapter = attributeAdapter.init({ attribute: "slot", values: ["title"] });
    /** @type {string[]}  */
    const slotAttrArray = spanSlotTitleAdapter.toAttrArray();
    /** @type {string[]}  */
    const slotValuesArray = spanSlotTitleAdapter.toValuesArray();
    /** @type {import("es-html-parser").TagNode | undefined}  */
    spanSlotTitle = node.children.find((c) => {
      return (
        c.name === "span" &&
        c.attributes.find((a) => slotAttrArray.includes(a.key.value)) &&
        c.attributes.find((a) => slotValuesArray.includes(a.value.value))
      );
    });
  };
  const setContexts = () => {
    setTitleLevelAttr();
    setSpanSlotTitle();
  };
  return {
    init: (_node) => {
      node = _node;
      setContexts();
      return fixerContext;
    },
    getContexts: () => ({
      titleLevelAttr: {
        node: titleLevelAttr ?? null,
        replacer: "",
        fixMethod: "replaceTextRange",
      },
      spanSlotTitleOpenStart: {
        node: spanSlotTitle?.openStart ?? null,
        replacer: "<h4",
        fixMethod: "replaceTextRange",
      },
      spanSlotTitleClose: {
        node: spanSlotTitle?.close ?? null,
        replacer: "</h4>",
        fixMethod: "replaceTextRange",
      },
      spanSlotTitleCloseAddHTML: {
        node: spanSlotTitle?.close ?? null,
        replacer: "<foo-bar>Baz, bat</foo-bar>",
        fixMethod: "insertTextAfterRange",
      },
    }),
  };
})();
