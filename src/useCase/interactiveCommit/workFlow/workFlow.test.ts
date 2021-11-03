import { makeQuestion as makeQuestionForInput } from "./qAndA/input";
import { makeQuestion as makeQuestionForSearchList } from "./qAndA/searchList";
import { getQuestion, prepareQuestions, updateTemplate } from "./workFlow";

jest.mock("./qAndA/input");
jest.mock("./qAndA/searchList");

describe("getQuestion", () => {
  test("array is empty", () => {
    expect(
      // @ts-expect-error
      getQuestion({
        questionDictionary: [],
      })
    ).toEqual(undefined);
  });

  test("array has value", () => {
    expect(
      getQuestion({
        // @ts-expect-error
        questionDictionary: ["ok"],
      })
    ).toEqual("ok");
  });
});

describe("updateTemplate", () => {
  test("replace test", () => {
    const newTpl = updateTemplate({
      template: "{{type}}{{(scope)}}",
      answer: "feat",
      searchValue: "type",
    });

    expect(newTpl).toEqual("feat{{(scope)}}");
  });
});

describe("prepareQuestions", () => {
  test("search-list", () => {
    (makeQuestionForSearchList as jest.Mock) = jest.fn();
    //@ts-expect-error
    prepareQuestions({ question: { type: "search-list" } }, "");
    expect(makeQuestionForSearchList).toHaveBeenCalled();
  });

  test("input", () => {
    (makeQuestionForInput as jest.Mock) = jest.fn();
    //@ts-expect-error
    prepareQuestions({ question: { type: "input" } }, "");
    expect(makeQuestionForInput).toHaveBeenCalled();
  });

  test("error test", () => {
    expect(() =>
      //@ts-expect-error
      prepareQuestions({ question: { type: "" } }, "")
    ).toThrowError();
  });
});
