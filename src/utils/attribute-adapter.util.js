const handleError = require("./error-handler.util.js");

module.exports = (() => {
  let attributesObj = {};
  let valuesObj = {};
  const setAttributesObj = (attribute) => {
    attributesObj = {
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
          return handleError(error);
        }
      })(),
    };
  };
  const setValuesObj = (values) => {
    valuesObj = {
      traditional: values,
      angular: (() => {
        try {
          return values.map((v) => `'${v}'`);
        } catch (error) {
          return handleError(error);
        }
      })(),
    };
  };
  const buildArray = ({ obj, mapMethod }) => {
    return Object.keys(obj)
      .filter((k) => !!obj[k])
      [mapMethod]((k) => obj[k]);
  };
  return {
    init: ({ attribute, values }) => {
      setAttributesObj(attribute);
      setValuesObj(values);
    },
    toAttrArray: () => buildArray({ obj: attributesObj, mapMethod: "map" }),
    toValuesArray: () => buildArray({ obj: valuesObj, mapMethod: "flatMap" }),
  };
})();
