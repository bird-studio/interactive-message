import { makeQuestion } from "./searchList";

describe("makeQuestion", () => {
  test("res test", async () => {
    const choice = { description: "description", value: "value" };
    const res = await makeQuestion({
      // @ts-expect-error
      question: {
        getChoices: () => [choice],
      },
    });

    expect(res.question.choices).toEqual([{ ...choice, name: "description" }]);
  });
});
