import { fetchIssues } from "./plugin/github";
import { gitmojis } from "./plugin/gitmoji";
import { getOwner, getRepo, getUserName } from "./plugin/git";

// ts-prune-ignore-next
export type { Setting } from "~/domain/interactiveCommit/core";

// ts-prune-ignore-next
export const plugin = {
  gitmoji: { gitmojis },
  github: { fetchIssues },
  git: { getRepo, getOwner, getUserName },
};
