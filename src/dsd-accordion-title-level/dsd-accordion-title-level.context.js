// https://www.npmjs.com/package/es-html-parser#ast-format

const attributeAdapter = require("../utils/attribute-adapter.util.js");

/**
 * @typedef {{
 *  [key: string]: {
 *    node:
 *      | import("es-html-parser").AttributeNode
 *      | import("es-html-parser").OpenTagStartNode
 *      | import("es-html-parser").CloseTagNode;
 *    replacer: string;
 *    fixMethod: "replaceTextRange" | "insertTextAfterRange"
 *  }
 * }} FixerContext
 */

/** @returns {FixerContext} */
module.exports = (node) => {
  attributeAdapter.init({ attribute: "title-level", values: ["2", "3", "4", "5", "6"] });

  /** @type {string[]}  */
  const titleLevelAttrArray = attributeAdapter.toAttrArray();

  /** @type {string[]}  */
  const titleLevelValuesArray = attributeAdapter.toValuesArray();

  /** @type {import("es-html-parser").AttributeNode | undefined} */
  const titleLevelAttr = node.attributes.find((a) => {
    return (
      titleLevelAttrArray.includes(a.key.value) && titleLevelValuesArray.includes(a.value.value)
    );
  });

  attributeAdapter.init({ attribute: "slot", values: ["title"] });

  /** @type {string[]}  */
  const slotAttrArray = attributeAdapter.toAttrArray();

  /** @type {string[]}  */
  const slotValuesArray = attributeAdapter.toValuesArray();

  /** @type {import("es-html-parser").TagNode | undefined}  */
  const spanSlotTitle = node.children.find((c) => {
    return (
      c.name === "span" &&
      c.attributes.find((a) => slotAttrArray.includes(a.key.value)) &&
      c.attributes.find((a) => slotValuesArray.includes(a.value.value))
    );
  });

  return {
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
  };
};
