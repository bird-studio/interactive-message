import type * as WorkFlow from "~/domain/interactiveCommit/workFlow";
import * as input from "./qAndA/input";
import * as searchList from "./qAndA/searchList";

export const getQuestion: WorkFlow.GetQuestion = (p) =>
  p.questionDictionary.shift();

export const updateTemplate: WorkFlow.UpdateTemplate = (p) =>
  p.template.replace(`{{${p.searchValue}}}`, p.answer);

export const prepareQuestions: WorkFlow.PrepareQuestions = (p) => {
  if (p.question.type === "search-list") {
    return searchList.makeQuestion({
      question: p.question,
      template: p.template,
    });
  }

  if (p.question.type === "input") {
    return input.makeQuestion({ question: p.question, template: p.template });
  }

  throw new Error("type Error");
};
