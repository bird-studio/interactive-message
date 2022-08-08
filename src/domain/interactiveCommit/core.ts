/**
 * 設定ファイルの項目
 */
export type Setting = {
  /**
   * - https://github.com/SBoudrias/Inquirer.js
   * - https://github.com/robin-rpr/inquirer-search-list
   *
   * 設問と候補
   */
  questionDictionary: Array<Question>;
  /**
   * 設問に対応するテンプレート
   */
  template: string;
  /**
   * 雑多な設定項目
   */
  config: {
    templateName: string;
    /**
     * https://github.com/chalk/chalk#colors
     */
    color:
      | "black"
      | "red"
      | "green"
      | "yellow"
      | "blue"
      | "magenta"
      | "cyan"
      | "white";
    errorColor:
      | "black"
      | "red"
      | "green"
      | "yellow"
      | "blue"
      | "magenta"
      | "cyan"
      | "white";
  };
};

/**
 * 設問の回答
 *
 * テンプレートの対応する箇所に、セットされる
 */
export type Answer = string;

/**
 * 直前の回答
 */
export type InputtedAnswer = Answer;

export type MsgArray = Array<Record<string, string>>;

type QuestionBase = {
  name: string;
  messageObj: string;
  /**
   * 入力値の検証
   * JSON.stringifyでエラーメッセージを表示
   */
  exValidate?: <T>(input: T) => true | MsgArray;
  /**
   * 初期値の入力
   */
  exInitValue?: <T>(input: T) => void;
  /**
   * 回答の上書き
   */
  overwriteAnswer?: (p: string) => Promise<Answer>;
  /**
   * テンプレートの上書き
   *
   * 末尾の空白除去などをする。
   */
  overwriteTpl?: (p: Setting["template"]) => Setting["template"];
};

/**
 * リストから選択する形式の設問
 */
export type SearchListTypeQ = {
  type: "search-list";
  getChoices: () =>
    | Promise<Array<{ description: string; value: string }>>
    | Array<{ description: string; value: string }>;
} & QuestionBase;

/**
 * 文字入力形式の設問
 */
export type InputTypeQ = {
  type: "input";
} & QuestionBase;

export type Question = SearchListTypeQ | InputTypeQ;
