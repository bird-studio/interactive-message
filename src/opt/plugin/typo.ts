// eslint-disable-next-line @typescript-eslint/no-var-requires
const Typo = require("typo-js");

export const makeDictionary = (langCode: string) => new Typo(langCode);
