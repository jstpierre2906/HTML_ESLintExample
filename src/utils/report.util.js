module.exports = (attr, fixerFunc) => ({
  node: attr,
  message: "Old HTML attribute 'bgcolor' is not allowed. Use 'class' instead.",
  fix: (fixer) => fixerFunc(fixer, attr),
});
