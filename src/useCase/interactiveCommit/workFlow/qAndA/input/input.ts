import type { InputTypeQ, Setting } from "~/domain/interactiveCommit/core";
import type * as WorkFlow from "~/domain/interactiveCommit/workFlow";

type MakeQuestion = (p: {
  question: InputTypeQ;
  template: Setting["template"];
}) => Promise<WorkFlow.InputTypeQnTpl>;
export const makeQuestion: MakeQuestion = (p) => Promise.resolve(p);
