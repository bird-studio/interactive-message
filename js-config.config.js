module.exports = {
  interactiveMessageConfig: {
    fetchMyIssuesParam: {
      owner: "bird-studio",
      repo: "interactive-message",
      state: "open",
      assignUser: "akira-toriyama",
    },
    scope: [
      ...require("fs")
        .readdirSync("./src")
        .map((v) => ({
          description: v,
          value: v,
        })),
      { description: "other: Other directory", value: "other" },
    ],
  },
};
