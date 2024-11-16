const attributeAdapter = require("../utils/attribute-adapter.util.js");

module.exports = (node) => {
  attributeAdapter.init({ attribute: "title-level", values: ["2", "3", "4", "5", "6"] });
  const titleLevelAttrArray = attributeAdapter.toAttrArray();
  const titleLevelValuesArray = attributeAdapter.toValuesArray();
  const titleLevelAttr = node.attributes.find((a) => {
    return (
      titleLevelAttrArray.includes(a.key.value) && titleLevelValuesArray.includes(a.value.value)
    );
  });

  attributeAdapter.init({ attribute: "slot", values: ["title"] });
  const slotAttrArray = attributeAdapter.toAttrArray();
  const slotValuesArray = attributeAdapter.toValuesArray();
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
