module.exports = {
  fetchMyIssuesParam: {
    owner: "bird-studio",
    repo: "interactive-message",
    state: "open",
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
};
