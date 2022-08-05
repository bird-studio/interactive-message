// eslint-disable-next-line @typescript-eslint/no-var-requires
const Typo = require("typo-js");

/**
 * @refs https://github.com/cfinke/Typo.js
 */
export const makeDictionary = (p: { langCode: string }) => new Typo(p.langCode);
export const toAns = (p: Array<string>) => {
  if (p.length === 0) {
    return true;
  }
  return p.join(", ");
};
