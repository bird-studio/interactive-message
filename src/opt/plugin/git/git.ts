import * as fs from "fs";
import * as ini from "ini";

type GetGitConfig = () => string;
const getGitConfig: GetGitConfig = () => {
  const config = ini.parse(fs.readFileSync(".git/config", "utf-8"));
  return config['remote "origin"'].url;
};

export const getRepo = () =>
  getGitConfig().split("/")[0]?.split(":").slice(1).pop();

export const getOwner = () =>
  getGitConfig().split("/")[1]?.replace(/.git$/, "");
