# interactive-message

<p>
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

<p>
  <a href="https://github.com/bird-studio/interactive-message">
    <img src="https://github.com/bird-studio/interactive-message/blob/main/media/log.png"/>
  </a>
</p>

## Overview

Create messages in an interactive format.

![preview](https://github.com/bird-studio/interactive-message/blob/main/media/eyeCatch.gif)

## Usage

```bash
npm i -D interactive-message

touch interactive-message.config.js
```

example

https://github.com/bird-studio/interactive-message/blob/main/interactive-message.config.js

The part that matches `questionDictionary.name` will be replaced.  
Change the templates and questions as you like.  
This setting is Conventional Commit and gitmoji.

## Commit hook

### githooks

`prepare-commit-msg`

```bash
#!/bin/sh

exec < /dev/tty && yarn interactive-message commit --hook
```

```bash
git -c my.interactive=yes commit
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

exec < /dev/tty && npx interactive-message commit --hook
```
