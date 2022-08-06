import type * as WorkFlow from "~/domain/interactiveCommit/workFlow";
import * as workFlow from "~/useCase/interactiveCommit/workFlow";

export const interactiveCommit: WorkFlow.InteractiveCommit = async (p) => {
  const question = workFlow.getQuestion(p.setting);
  const template = p.setting.template;

  if (question === undefined) {
    return Promise.resolve(template).finally(p.ui.clear);
  }

  const answerVO = await p.ui.renderingQnA({ ...p.setting, question });

  const mayBeAnswer = p.ui.validator.valid({
    answerVO,
    questionName: question.name,
  });

  if (mayBeAnswer.isErr) {
    throw new Error(mayBeAnswer.error.reason);
  }

  const answer = question.overwriteAnswer
    ? await question.overwriteAnswer(mayBeAnswer.value.answer)
    : mayBeAnswer.value.answer;

  const newTemplate = workFlow.updateTemplate({
    answer,
    template,
    searchValue: question.name,
  });

  const tpl = question.overwriteTpl
    ? question.overwriteTpl(newTemplate)
    : newTemplate;

  return interactiveCommit({
    ui: p.ui,
    setting: {
      questionDictionary: p.setting.questionDictionary,
      template: tpl,
      config: p.setting.config,
    },
  });
};
