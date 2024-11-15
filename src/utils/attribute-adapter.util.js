module.exports = (() => {
  let attributes = {};
  const setAttributes = (attribute) => {
    attributes = {
      traditional: attribute,
      angularTraditional: `[${attribute}]`,
      angularCamel: (() => {
        if (attribute.indexOf("-") === -1) {
          return null;
        }
        try {
          const camelCased = attribute
            .split("-")
            .filter((a) => a.length > 0)
            .map((a, i) => (i > 0 ? `${a.substring(0, 1).toUpperCase()}${a.substring(1)}` : a))
            .reduce((acc, current) => acc.concat(current), "");
          return `[${camelCased}]`;
        } catch (error) {
          console.warn(error);
          return null;
        }
      })(),
    };
  };
  const buildArray = () => {
    return Object.keys(attributes)
      .filter((k) => !!attributes[k])
      .map((k) => attributes[k]);
  };
  return {
    init: (attr) => setAttributes(attr),
    toArray: () => buildArray(),
  };
})();
