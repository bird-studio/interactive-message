import { makeQuestion } from "./index";

describe("makeQuestion", () => {
  test("res test", async () => {
    const v = "";
    // @ts-expect-error
    const res = await makeQuestion(v);
    expect(res).toEqual(v);
  });
});
