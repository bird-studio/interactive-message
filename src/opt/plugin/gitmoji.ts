// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import * as _gitmojis from "gitmojis";

type Gitmojis = Array<{
  emoji: string;
  entity: string;
  code: string;
  description: string;
  name: string;
  semver: null | string;
}>;

/**
 * https://gitmoji.dev/
 */
export const gitmojis = _gitmojis.gitmojis as Gitmojis;
