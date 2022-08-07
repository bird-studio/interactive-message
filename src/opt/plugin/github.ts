import { Octokit } from "@octokit/rest";
const octokit = new Octokit();

/**
 * https://github.com/octokit/rest.js/
 */
export const fetchIssues = octokit.issues.listForRepo;
