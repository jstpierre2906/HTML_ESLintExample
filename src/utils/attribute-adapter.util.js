import handleError from "./error-handler.util.js";

/**
 * @typedef {{
 *  traditional: string;
 *  angularTraditional: string;
 *  angularCamel: string | null;
 * }} AttributesObj
 */

/**
 * @typedef {{
 *  traditional: string[];
 *  angular: string[] | null;
 * }} ValuesObj
 */

/**
 * @typedef {{
 *  init: function({attribute: string; values: string[]}): void;
 *  toAttrArray: function(): string[];
 *  toValuesArray: function(): string[];
 * }} AttributeAdapter
 */

/** @returns {AttributeAdapter} */
export default (() => {
  /** @type {AttributesObj | null} */
  let attributesObj = {};

  /** @type {ValuesObj | null} */
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
          return handleError(error);
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
          return handleError(error);
        }
      })(),
    };
  };

  /**
   * @param {{
   *  obj: AttributesObj | ValuesObj;
   *  mapMethod: "map" | "flatMap";
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
    },
    toAttrArray: () => buildArray({ obj: attributesObj, mapMethod: "map" }),
    toValuesArray: () => buildArray({ obj: valuesObj, mapMethod: "flatMap" }),
  };
})();
