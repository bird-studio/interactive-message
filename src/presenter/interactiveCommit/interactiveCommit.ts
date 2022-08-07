import type * as WorkFlow from "~/domain/interactiveCommit/workFlow";
import * as workFlow from "~/useCase/interactiveCommit/workFlow";

export const interactiveCommit: WorkFlow.InteractiveCommit = async (p) => {
  const question = workFlow.getQuestion(p.setting);
  const template = p.setting.template;

  if (question === undefined) {
    return Promise.resolve(template).finally(p.ui.clear);
  }

  const answerVO = await p.ui.renderingQnA({
    ...p.setting,
    question,
    msgArray: p.msgArray,
    inputtedValue: p.inputtedValue,
  });

  const mayBeAnswer = p.ui.validator.valid({
    answerVO,
    questionName: question.name,
  });

  if (mayBeAnswer.isErr) {
    throw new Error(mayBeAnswer.error.reason);
  }

  if (question?.exValidate) {
    const validateResult = await question.exValidate(mayBeAnswer.value.answer);
    if (validateResult !== true) {
      return interactiveCommit({
        ui: p.ui,
        msgArray: validateResult,
        inputtedValue: mayBeAnswer.value.answer,
        setting: {
          questionDictionary: [question, ...p.setting.questionDictionary],
          template,
          config: p.setting.config,
        },
      });
    }
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
