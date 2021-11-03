import { valid } from "./validator";

describe("valid", () => {
  test("string answer", () => {
    const v = "dummy";
    const r = valid({ answerVO: { key: v }, questionName: "key" });
    expect(r).toEqual({ isErr: false, value: { answer: v } });
  });

  test("number answer", () => {
    const v = 123;
    const r = valid({ answerVO: { key: v }, questionName: "key" });
    expect(r).toEqual({ isErr: false, value: { answer: v.toString() } });
  });

  test("null answer", () => {
    // @ts-expect-error
    const r = valid({ answerVO: { key: null }, questionName: "key" });
    expect(r).toEqual({
      isErr: true,
      error: { reason: "The answer need to be string or number." },
    });
  });
});
