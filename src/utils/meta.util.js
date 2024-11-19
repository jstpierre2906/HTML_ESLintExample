// https://eslint.org/docs/latest/extend/custom-rules#options-schemas

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
