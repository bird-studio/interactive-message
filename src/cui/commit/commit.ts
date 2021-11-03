import * as fs from "fs";
import * as path from "path";

export const commitMsg = (msg: string) =>
  fs.writeFileSync(path.join(process.cwd(), ".git", "COMMIT_EDITMSG"), msg);
