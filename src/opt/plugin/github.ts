import { Octokit } from "@octokit/rest";
const octokit = new Octokit();

export const fetchIssues = octokit.issues.listForRepo;
