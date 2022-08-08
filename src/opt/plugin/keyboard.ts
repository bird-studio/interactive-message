// eslint-disable-next-line @typescript-eslint/no-var-requires
const { keyboard } = require("@nut-tree/nut-js");

export const send = (p: { txt: string }) => keyboard.type(p.txt);
