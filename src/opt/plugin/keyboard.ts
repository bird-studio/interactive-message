// eslint-disable-next-line @typescript-eslint/no-var-requires
const { keyboard } = require("@nut-tree/nut-js");
keyboard.config.autoDelayMs = 0;

export const send = (p: { txt: string }) => keyboard.type(p.txt);
