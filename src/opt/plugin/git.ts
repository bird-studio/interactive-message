import * as fs from "fs";
import * as ini from "ini";
import * as child_process from "child_process";

const getGitConfigRemoteOriginUrl = () =>
  ini.parse(fs.readFileSync(".git/config", "utf-8"))['remote "origin"'].url;

export const getRepo = () =>
  getGitConfigRemoteOriginUrl().split("/")[1]?.replace(/.git$/, "");

export const getOwner = () =>
  getGitConfigRemoteOriginUrl().split("/")[0]?.split(":").slice(1).pop();

export const getUserName = () =>
  child_process
    .execSync("git config user.name")
    .toString()
    .replace(/\r?\n/g, "");
