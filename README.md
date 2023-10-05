<p align="center">
  <a href="https://github.com/bird-studio/interactive-message">
    <img src="https://github.com/bird-studio/interactive-message/blob/main/media/logo.png"/>
  </a>
</p>

<p align="center">
  <a href="https://semantic-release.gitbook.io/semantic-release/">
    <img alt="semantic-release" src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg">
  </a>
  <a href="https://gitmoji.dev">
    <img src="https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square" alt="Gitmoji">
  </a>
  <a href="https://codecov.io/gh/bird-studio/interactive-message">
    <img src="https://codecov.io/gh/bird-studio/interactive-message/branch/main/graph/badge.svg?token=RBVLU6CIPQ"/>
  </a>
</p>

# interactive-message

## Alternative

https://github.com/bird-studio/hoipoi_capsule

## Overview

Create messages in an interactive format.

https://user-images.githubusercontent.com/92862731/183108755-09c3b60c-f46d-4422-99f7-e6782cdf9ecd.mov

## I need to use it right away.

https://github.com/akira-toriyama/interactive-message-demo

## Usage

```bash
npm i -D @bird-studio/interactive-message

touch interactive-message.config.js
```

example

https://github.com/akira-toriyama/interactive-message-demo/blob/main/interactive-message.config.js

The part that matches `questionDictionary.name` will be replaced.  
Change the templates and questions as you like.  
This setting is Conventional Commit and gitmoji.

## Commit hook

### githooks

`prepare-commit-msg`

```bash
#!/bin/sh

exec < /dev/tty && yarn interactive-message commit
```

```bash
git commit
```

`package.json`

```json
"scripts": {
  "prepare": "git config --local core.hooksPath .githooks"
}
```

### husky

`prepare-commit-msg`

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

exec < /dev/tty && npx interactive-message commit
```

## Localization

- [grammar](https://github.com/bird-studio/interactive-message/blob/main/src/opt/plugin/grammar.ts)
- [translation](https://github.com/bird-studio/interactive-message/blob/main/src/opt/plugin/translation.ts)

test
