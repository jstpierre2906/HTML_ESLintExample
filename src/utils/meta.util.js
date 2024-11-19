// https://eslint.org/docs/latest/extend/custom-rules#options-schemas

/**
 * @typedef {{
 *  type: string;
 *  docs: { description: string; category: string; recommended: boolean},
 *  fixable: string;
 *  schema: string[]
 * }} Meta
 */

/**
 * @returns {{
 *  init: function(string, string): Object;
 *  getMeta: function(): Meta
 * }}
 */
export const metaHandler = (() => {
  let description;
  let category;
  return {
    init: (desc, cat = "Best Practices") => {
      description = desc;
      category = cat;
      return metaHandler;
    },
    getMeta: () => ({
      type: "problem",
      docs: {
        description: description,
        category: category,
        recommended: false,
      },
      fixable: "code",
      schema: [], // no options
    }),
  };
})();
