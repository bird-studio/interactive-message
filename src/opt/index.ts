import { fetchIssues } from "./plugin/github";
import { gitmojis } from "./plugin/gitmoji";
import { getOwner, getRepo, getUserName } from "./plugin/git";
import { makeDictionary, toAns } from "./plugin/typo";
import { checkGrammar, cretaGrammarApi } from "./plugin/grammar";

// ts-prune-ignore-next
export type { Setting } from "~/domain/interactiveCommit/core";

// ts-prune-ignore-next
export const plugin = {
  gitmoji: { gitmojis },
  github: { fetchIssues },
  git: { getRepo, getOwner, getUserName },
  typo: { toAns, makeDictionary },
  grammar: { checkGrammar, cretaGrammarApi },
};
