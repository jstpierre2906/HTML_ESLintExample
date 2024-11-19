import { errorHandler } from "./error-handler.util.js";

/**
 * @returns {{
 *  init: function({attribute: string; values: string[]}): Object;
 *  toAttrArray: function(): string[];
 *  toValuesArray: function(): string[];
 * }}
 */
export const attributeAdapter = (() => {
  /** @type {{ traditional: string; angularTraditional: string; angularCamel: string | null } | null} */
  let attributesObj = {};
  /** @type {{ traditional: string[]; angular: string[] | null } | null} */
  let valuesObj = {};
  /** @param {string} attribute */
  const setAttributesObj = (attribute) => {
    attributesObj = {
      traditional: attribute,
      angularTraditional: `[${attribute}]`,
      angularCamel: (() => {
        if (attribute.indexOf("-") === -1) {
          return null;
        }
        try {
          /** @type {string} */
          const camelCased = attribute
            .split("-")
            .filter((a) => a.length > 0)
            .map((a, i) => (i > 0 ? `${a.substring(0, 1).toUpperCase()}${a.substring(1)}` : a))
            .reduce((acc, current) => acc.concat(current), "");
          return `[${camelCased}]`;
        } catch (error) {
          return errorHandler.apply(error);
        }
      })(),
    };
  };
  /** @param {string[]} values */
  const setValuesObj = (values) => {
    valuesObj = {
      traditional: values,
      angular: (() => {
        try {
          return values.map((v) => `'${v}'`);
        } catch (error) {
          return errorHandler.apply(error);
        }
      })(),
    };
  };
  /**
   * @param {{
   *  obj:
   *    {{ traditional: string; angularTraditional: string; angularCamel: string | null } | null} |
   *    {{ traditional: string[]; angular: string[] | null } | null};
   *  mapMethod: "map" | "flatMap"
   * }}
   * @returns {string[]}
   */
  const buildArray = ({ obj, mapMethod }) => {
    return Object.keys(obj)
      .filter((k) => !!obj[k])
      [mapMethod]((k) => obj[k]);
  };
  return {
    init: ({ attribute, values }) => {
      setAttributesObj(attribute);
      setValuesObj(values);
      return attributeAdapter;
    },
    toAttrArray: () => buildArray({ obj: attributesObj, mapMethod: "map" }),
    toValuesArray: () => buildArray({ obj: valuesObj, mapMethod: "flatMap" }),
  };
})();
