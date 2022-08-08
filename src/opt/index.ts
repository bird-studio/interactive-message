import { Octokit } from "./plugin/octokit";
import { gitmojis } from "./plugin/gitmoji";
import { getOwner, getRepo, getUserName } from "./plugin/git";
import { makeDictionary, toAns } from "./plugin/typo";
import { checkGrammar, createGrammarApi } from "./plugin/grammar";
import { createTranslator, translateText } from "./plugin/translation";
import { keyboard } from "./plugin/keyboard";

// ts-prune-ignore-next
export type { Setting } from "~/domain/interactiveCommit/core";

// ts-prune-ignore-next
export const plugin = {
  git: { getRepo, getOwner, getUserName },
  /**
   * https://gitmoji.dev/
   */
  gitmoji: { gitmojis },
  /**
   * https://github.com/octokit/octokit.js
   */
  octokit: { Octokit },
  /**
   *  https://github.com/cfinke/Typo.js
   */
  typo: { toAns, makeDictionary },
  /**
   * https://textgears.com/api
   */
  grammar: { checkGrammar, createGrammarApi },
  /**
   * https://github.com/DeepLcom/deepl-node
   */
  translation: { createTranslator, translateText },
  /**
   * https://github.com/nut-tree/nut.js
   */
  keyboard,
};
