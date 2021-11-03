import type * as WorkFlow from "~/domain/interactiveCommit/workFlow";

type Answer = WorkFlow.AnswerVO[keyof WorkFlow.AnswerVO];

const isValid = (p: unknown): p is Answer =>
  typeof p === "string" || typeof p === "number";

type FmtAnswer = (p: Answer) => string;
const fmtAnswer: FmtAnswer = (p) =>
  typeof p === "number" ? Number(p).toString() : p;

export const valid: Parameters<WorkFlow.InteractiveCommit>[0]["ui"]["validator"]["valid"] =
  (p) => {
    const mayBeAnswer = p.answerVO[p.questionName];

    if (isValid(mayBeAnswer)) {
      return {
        isErr: false,
        value: { answer: fmtAnswer(mayBeAnswer) },
      };
    }

    return {
      isErr: true,
      error: {
        reason: "The answer need to be string or number.",
      },
    };
  };
