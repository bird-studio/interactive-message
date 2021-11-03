import type { SearchListTypeQ, Setting } from "~/domain/interactiveCommit/core";
import type * as WorkFlow from "~/domain/interactiveCommit/workFlow";

type MakeQuestion = (p: {
  question: SearchListTypeQ;
  template: Setting["template"];
}) => Promise<WorkFlow.SearchListTypeQnTpl>;
export const makeQuestion: MakeQuestion = async (p) => {
  const choicesObj = await p.question.getChoices();

  const choices = choicesObj.map((v) => ({
    ...v,
    name: v.description,
  }));
  return {
    ...p,
    question: { ...p.question, choices },
  };
};
