import * as deepl from "deepl-node";

/**
 * https://github.com/DeepLcom/deepl-node
 */
export const createTranslator = (p: { authKey: string }) =>
  new deepl.Translator(p.authKey);

export const translateText = (p: {
  translator: deepl.Translator;
  text: string;
  targetLang: deepl.TargetLanguageCode;
}) => p.translator.translateText(p.text, null, p.targetLang);
