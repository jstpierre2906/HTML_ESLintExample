// https://eslint.org/docs/latest/extend/custom-rules#options-schemas

module.exports = (description, category = "Best Practices") => ({
  type: "problem",
  docs: {
    description: description,
    category: category,
    recommended: false,
  },
  fixable: "code",
  schema: [], // no options
});
