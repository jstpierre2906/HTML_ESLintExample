const { parseForESLint } = require("@html-eslint/parser");

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "disallow old HTML attributes and replace bgcolor",
      category: "Best Practices",
      recommended: false,
    },
    fixable: "code",
    schema: [], // no options
  },
  create: function (context) {
    return {
      Program(node) {
        const html = context.getSourceCode().text;
        const { ast } = parseForESLint(html);

        // console.log(ast.body)
        ast.body
          .filter((b) => b.type === "Tag")
          .forEach((b) => {
            // console.log(b);
            // console.log(b.attributes);
            b.attributes
              .filter((attr) => attr.key.type === "AttributeKey" && attr.key.value === "bgcolor")
              .forEach((attr) => {
                console.log(attr);
                context.report({
                  node: attr,
                  message: "Old HTML attribute 'bgcolor' is not allowed. Use 'class' instead.",
                  fix: (fixer) => {
                    const start = attr.range[0];
                    const end = attr.range[1];
                    return fixer.replaceTextRange([start, end], 'class="turquoise"');
                  },
                });
              });
          });
      },
    };
  },
};
