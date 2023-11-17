---
title: Code Blocks
description: Style for code blocks in documentation
sidebar_position: 3
keywords:
  - quai
  - code blocks
  - code style
  - style
---

- Avoid adding multiple commands into a single code block unless they can be run in succession. Users often copy and past code blocks into their terminal without reading them, so it's important to make sure they can be run as-is.
- Use single quotes for everything other than JSON. (The formatter will handle this for you.)
- Always provide an explanation of what the code block does, even if it's obvious. This helps users understand what they're doing and why.
- Refrain from putting commands and the respective response in the same code block.
- Add titles to code blocks when referencing a specific file.

### Javascript

- Add semi-colons to the end of each line. (The formatter will handle this for you.)
- Use single quotes.

Example:

```js title="example.js"
const example = 'example';
```

### JSON

- Use double quotes.
- Don't add comments to JSON code blocks.

Example:

```json title="example.json"
{
  "example": "example"
}
```

### bash

- Specify `bash` as the language for bash commands.
- Break multiple commands into separate code blocks. If applicable, use `&&` or `\` to run multiple commands in succession.
- Put the output of bash commands in a separate code block with the language specified as `text`.

Example:

```bash
# This is a comment
echo 'example'
```

```text
example
```
