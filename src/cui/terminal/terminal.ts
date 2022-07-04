import * as clc from "cli-color";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const inquirer = require("inquirer");
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import * as inquirerAutocompletePrompt from "inquirer-search-list";
import { table } from "table";
import type { Question, Setting } from "~/domain/interactiveCommit/core";
import type * as WorkFlow from "~/domain/interactiveCommit/workFlow";
import * as workFlow from "~/useCase/interactiveCommit/workFlow";
inquirer.registerPrompt("search-list", inquirerAutocompletePrompt);

type RenderTpl = (p: { question: Question } & Setting) => void;
const renderTpl: RenderTpl = (p) => {
  const content = table(
    [
      [`${p.questionDictionary.length + 1} questions left.`],
      [
        p.template
          .replace(
            new RegExp(`${p.question.name}`),
            clc.inverse.bold[p.config.color](p.question.name)
          )
          .replace(new RegExp("{{", "g"), "")
          .replace(new RegExp("}}", "g"), ""),
      ],
    ],
    {
      columnDefault: {
        paddingLeft: 1,
        paddingRight: 1,
      },
      header: {
        alignment: "center",
        content: clc.bold(p.config.templateName),
      },
      border: {
        topBody: clc[p.config.color](`─`),
        topJoin: clc[p.config.color](`┬`),
        topLeft: clc[p.config.color](`┌`),
        topRight: clc[p.config.color](`┐`),

        bottomBody: clc[p.config.color](`─`),
        bottomJoin: clc[p.config.color](`┴`),
        bottomLeft: clc[p.config.color](`└`),
        bottomRight: clc[p.config.color](`┘`),

        bodyLeft: clc[p.config.color](`│`),
        bodyRight: clc[p.config.color](`│`),
        bodyJoin: clc[p.config.color](`│`),

        joinBody: clc[p.config.color](`─`),
        joinLeft: clc[p.config.color](`├`),
        joinRight: clc[p.config.color](`┤`),
        joinJoin: clc[p.config.color](`┼`),
      },
    }
  );

  console.log(content);
};

type QAndA = (p: {
  question: Question;
  template: Setting["template"];
}) => Promise<WorkFlow.AnswerVO>;
const qAndA: QAndA = (p) =>
  workFlow
    .prepareQuestions(p)
    // @ts-expect-error -- fixme
    .then((v) => inquirer.prompt<WorkFlow.AnswerVO>(v.question as any));

type Clear = () => void;
export const clear: Clear = console.clear;

type RenderingQnA = (
  p: { question: Question } & Setting
) => Promise<WorkFlow.AnswerVO>;
export const renderingQnA: RenderingQnA = (p) => {
  clear();
  renderTpl(p);
  return qAndA(p);
};
