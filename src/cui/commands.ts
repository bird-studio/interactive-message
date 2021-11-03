import { cac } from "cac";
import { cosmiconfigSync } from "cosmiconfig";
import { commitMsg } from "~/cui/commit";
import * as terminal from "~/cui/terminal";
import { interactiveCommit } from "~/presenter/interactiveCommit";
const cli = cac();

cli
  .command("commit", "Interactively commit using the prompts")
  .option("--hook", "DO NOT USE")
  .action((args) => {
    if (!args.hook) {
      return;
    }
    const setting = cosmiconfigSync("interactive-message").search()?.config;
    interactiveCommit({ setting, ui: terminal })
      .then(commitMsg)
      .catch(console.error);
  });

cli.help();
cli.parse();
