const { plugin } = require("@bird-studio/interactive-message");

const commitConfig = [
  {
    value: "feat",
    description: "Introducing new features",
  },
  { value: "fix", description: "Fixing a bug" },
  {
    value: "refactor",
    description: "Refactoring code (Not Introducing features or fix)",
  },
  { value: "docs", description: "add documents" },
  {
    value: "test",
    description: "Adding unit tests or e2e test",
  },
  { value: "perf", description: "Improving performance" },
  {
    value: "style",
    description: "Updating the UI and style files",
  },
  { value: "build", description: "build artifacts" },
  {
    value: "ci",
    description: "working about CI build system",
  },
  { value: "wip", description: "Work in progress" },
  {
    value: "chore",
    description: "Work with configuration or other stuff",
  },
  {
    value: "tweak",
    description: "Fine tune it",
  },
];

const notSelected = { description: "_NotSelected_", value: "" };

const gitmoji = plugin.gitmoji.gitmojis.map((v) => ({
  description: `${v.emoji} ${v.description}`,
  value: v.code,
}));

const gitConf = {
  owner: plugin.git.getOwner(),
  repo: plugin.git.getRepo(),
  userName: plugin.git.getUserName(),
};

/**
 * https://github.com/octokit/rest.js/
 */
const fetchMyIssues = () =>
  plugin.github
    .fetchIssues({
      owner: gitConf.owner,
      repo: gitConf.repo,
      state: "open",
    })
    .then((r) =>
      r.data
        .filter((v) => !v.pull_request)
        .filter((v) => v.assignees.find((a) => a.login === gitConf.userName))
        .map((issue) => ({
          description: `#${issue.number}: ${issue.title}`,
          value: `${issue.number}`,
        }))
    )
    .then((v) => [notSelected, ...v])
    .catch(() => [notSelected]);

/**
 * @type {import('interactive-message').Setting}
 */
module.exports = {
  template: `{{type}}({{scope}}): {{gitmoji}} {{subject}}

{{body}}

Close #{{issue}}
BREAKING CHANGE: {{breakingChange}}`,
  questionDictionary: [
    {
      name: "type",
      type: "search-list",
      message: "Please select a type.",
      getChoices: () =>
        commitConfig.map((v) => ({
          value: v.value,
          description: `${v.value}: (${v.release ? v.release : "no release"}) ${
            v.description
          }`,
        })),
    },
    {
      name: "scope",
      type: "search-list",
      message: "Please select a scope.",
      getChoices: () => [
        ...require("fs")
          .readdirSync("./src")
          .map((v) => ({
            description: v,
            value: v,
          })),
        { description: "other: Other directory", value: "other" },
        notSelected,
      ],
      overwriteTpl: (tpl) => tpl.replace("()", ""),
    },
    {
      name: "gitmoji",
      type: "search-list",
      message: "Please select a gitmoji",
      getChoices: () => gitmoji,
    },
    {
      name: "subject",
      type: "input",
      message: "Please input the subject.",
    },
    {
      name: "body",
      type: "input",
      message: "Please input the body.",
      overwriteTpl: (tpl) => tpl.replace(/\r?\n{2,}/, "\r\n\r\n").trim(),
    },
    {
      name: "issue",
      type: "search-list",
      message: "Close the issue?",
      /**
       * Get the issue.
       */
      getChoices: fetchMyIssues,
      overwriteAnswer: (ans) => (ans ? ans : ""),
      overwriteTpl: (tpl) => tpl.replace(/Close #\r?\n/, "").trim(),
    },
    {
      name: "breakingChange",
      type: "input",
      message: "Please input the breakingChange.",
      overwriteAnswer: (ans) => (ans ? ans : ""),
      overwriteTpl: (tpl) => tpl.replace(/BREAKING CHANGE: $/, "").trim(),
    },
  ],
  config: {
    /**
     * This is the theme color of the terminal.
     */
    color: "green",
    templateName: "Conventional Commit",
  },
};
