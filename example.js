const { plugin } = require("@bird-studio/interactive-message");

const commitConfig = [
  {
    value: "feat",
    description: "Introducing new features",
    release: "minor",
  },
  { value: "fix", description: "Fixing a bug", release: "patch" },
  {
    value: "refactor",
    description: "Refactoring code (Not Introducing features or fix)",
    release: "patch",
  },
  { value: "docs", description: "add documents", release: false },
  {
    value: "test",
    description: "Adding unit tests or e2e test",
    release: false,
  },
  { value: "perf", description: "Improving performance", release: "patch" },
  {
    value: "style",
    description: "Updating the UI and style files",
    release: "patch",
  },
  { value: "build", description: "build artifacts", release: false },
  {
    value: "ci",
    description: "working about CI build system",
    release: false,
  },
  { value: "wip", description: "Work in progress", release: false },
  {
    value: "chore",
    description: "Work with configuration or other stuff",
    release: false,
  },
  {
    value: "tweak",
    description: "Fine tune it",
    release: "patch",
  },
];

const notSelected = { description: "_NotSelected_", value: "" };

const gitmoji = plugin.gitmoji.gitmojis.map((v) => ({
  description: `${v.emoji} ${v.description}`,
  value: v.code,
}));

/**
 * https://github.com/octokit/rest.js/
 */
const fetchMyIssues = () =>
  plugin.github
    .fetchIssues({
      owner: "bird-studio",
      repo: "interactive-message",
      state: "open",
    })
    .then((r) =>
      r.data
        .filter((v) => !v.pull_request)
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
  template: `{{type}}({{scope}}): {{gitmoji}} {{description}}

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
      name: "description",
      type: "input",
      message: "Please input the description.",
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
