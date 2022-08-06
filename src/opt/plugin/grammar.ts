// eslint-disable-next-line @typescript-eslint/no-var-requires
const textgears = require("textgears-api");

/**
 * https://textgears.com/api
 */
export const createGrammarApi = (p: { key: string; language: string }) =>
  textgears(p.key, { language: p.language });

export const checkGrammar = (p: { grammarApi: any; txt: string }) =>
  p.grammarApi
    .checkGrammar(p.txt)
    .then((data: any) => ({ isFailure: false, data }))
    .catch((error: any) => ({ isFailure: true, error }))
    .then((v: any) => {
      if (v.isFailure) {
        return v;
      }

      if (v.data.status) {
        return v;
      }

      return v.data.response.errors.map((err: any) => ({
        descriptionEn: err.description.en,
        bad: err.bad,
        better: err.better,
      }));
    });
