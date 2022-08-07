import type { Answer, InputTypeQ, Question, Setting, MsgArray } from "./core";

export type AnswerVO = Record<Question["name"], string | number>;

type UI = {
  /**
   * 画面の初期化
   */
  clear: () => void;
  /**
   * 設問のレンダリング
   */
  renderingQnA: (
    p: {
      question: Question;
      msgArray?: MsgArray;
      /**
       * 直前の入力値
       */
      inputtedValue?: string;
    } & Setting
  ) => Promise<AnswerVO>;
  validator: {
    /**
     * 回答の検証
     */
    valid: (p: { answerVO: AnswerVO; questionName: Question["name"] }) =>
      | {
          isErr: false;
          value: {
            answer: string;
          };
        }
      | {
          isErr: true;
          error: {
            reason: string;
          };
        };
  };
};

/**
 * 設定を元に、入力値で補間されたテンプレートを返す
 */
export type InteractiveCommit = (p: {
  setting: Setting;
  ui: UI;
  /**
   * 設問部分に表示するメッセージ用
   */
  msgArray?: MsgArray;
  /**
   * 直前の入力値
   */
  inputtedValue?: string;
}) => Promise<Setting["template"]>;

/**
 * 設問の取得
 */
export type GetQuestion = (p: Setting) => Question | undefined;

/**
 * 設問の回答をテンプレートに反映
 */
export type UpdateTemplate = (p: {
  template: Setting["template"];
  searchValue: string;
  answer: Answer;
}) => Setting["template"];

/**
 * 入力形式の設問とテンプレート
 */
export type InputTypeQnTpl = {
  question: InputTypeQ;
  template: Setting["template"];
};

/**
 * 選択形式の設問とテンプレート
 */
export type SearchListTypeQnTpl = {
  question: {
    choices: Array<{ name: string; description: string; value: string }>;
  };
  template: Setting["template"];
};

/**
 * 設問の取得など、設問表示前の準備を行う
 */
export type PrepareQuestions = (p: {
  question: Question;
  template: Setting["template"];
}) => Promise<InputTypeQnTpl | SearchListTypeQnTpl | never>;
