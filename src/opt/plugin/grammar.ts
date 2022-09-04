// eslint-disable-next-line @typescript-eslint/no-var-requires
const textgears = require("textgears-api");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Fixme = any;

export const createGrammarApi = (p: { key: string; language: string }) =>
  textgears(p.key, { language: p.language });

export const checkGrammar = (p: { grammarApi: Fixme; txt: string }) =>
  p.grammarApi
    .checkGrammar(p.txt)
    .then((data: Fixme) => ({ isFailure: false, data }))
    .catch((error: Fixme) => ({ isFailure: true, error }))
    .then((v: Fixme) => {
      if (v.isFailure) {
        return v;
      }

      if (v.data.status) {
        return v;
      }

      if (typeof v.data?.response?.errors === "undefined") {
        return { isFailure: true, error: v };
      }

      return v.data.response.errors.map((err: Fixme) => ({
        descriptionEn: err.description.en,
        bad: err.bad,
        better: err.better,
      }));
    });
