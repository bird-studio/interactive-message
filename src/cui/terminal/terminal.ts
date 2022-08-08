import * as clc from "cli-color";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const inquirer = require("inquirer");
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import * as inquirerAutocompletePrompt from "inquirer-search-list";
import { table } from "table";
import type {
  Question,
  Setting,
  MsgArray,
} from "~/domain/interactiveCommit/core";
import type * as WorkFlow from "~/domain/interactiveCommit/workFlow";
import * as workFlow from "~/useCase/interactiveCommit/workFlow";
inquirer.registerPrompt("search-list", inquirerAutocompletePrompt);

type RenderTpl = (
  p: {
    question: Question;
    msgArray?: MsgArray;
    inputtedValue?: string;
  } & Setting
) => void;
const renderTpl: RenderTpl = (p) => {
  const color = p.msgArray ? p.config.errorColor : p.config.color;

  const content = table(
    [
      [`${p.questionDictionary.length + 1} questions left.`],
      [
        p.template
          .replace(
            new RegExp(`${p.question.name}`),
            clc.inverse.bold[color](p.question.name)
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
        topBody: clc[color](`─`),
        topJoin: clc[color](`┬`),
        topLeft: clc[color](`┌`),
        topRight: clc[color](`┐`),

        bottomBody: clc[color](`─`),
        bottomJoin: clc[color](`┴`),
        bottomLeft: clc[color](`└`),
        bottomRight: clc[color](`┘`),

        bodyLeft: clc[color](`│`),
        bodyRight: clc[color](`│`),
        bodyJoin: clc[color](`│`),

        joinBody: clc[color](`─`),
        joinLeft: clc[color](`├`),
        joinRight: clc[color](`┤`),
        joinJoin: clc[color](`┼`),
      },
    }
  );

  console.log(content);
  if (Array.isArray(p.msgArray)) {
    console.log(JSON.stringify(p.msgArray, null, 2));
  }
};

type QAndA = (p: {
  question: Question;
  template: Setting["template"];
}) => Promise<WorkFlow.AnswerVO>;
const qAndA: QAndA = (p) =>
  workFlow
    .prepareQuestions(p)
    // @ts-expect-error -- FIXME
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .then((v) => inquirer.prompt<WorkFlow.AnswerVO>(v.question as any));

type Clear = () => void;
export const clear: Clear = console.clear;

type RenderingQnA = (
  p: {
    question: Question;
    msgArray?: MsgArray;
    inputtedValue?: string;
  } & Setting
) => Promise<WorkFlow.AnswerVO>;
export const renderingQnA: RenderingQnA = (p) => {
  clear();
  renderTpl(p);
  return qAndA(p);
};
