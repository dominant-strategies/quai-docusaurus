---
title: Code Blocks
description: Code block guide for the Quai Network documentation
sidebar_position: 2
keywords:
  - code blocks
  - quai
  - mdx
  - markdown
---

Docusaurus utilizes [`prism`](https://www.npmjs.com/package/prismjs) for code highlighting and syntax definition.

## Language Specification

The base `prism` installation supports very few languages by default. If your code block utilizes an unsupported language, you can add support for it via the `prism` object in the `docusaurus.config.ts` file. We've already added support for a few additional languages, including Solidity, Bash, and JSON.

To add a language specification to a code block, simply put the language name after the opening code block ticks.

For example, the following code block utilizes the `bash` language specification:

````markdown
```bash
echo 'example'
```
````

Which renders as:

```bash
echo 'example'
```

## Code Highlighting

`prism` provides succinct syntax for highlighting individual lines within a code block.

The following example **highlights lines 1 and 3** of the code block:

````markdown
```js {1,3}
const example = 'example';
const string = 'string';
const number = 1;
```
````

Which renders as:

```js {1,3}
const example = 'example';
const string = 'string';
const number = 1;
```
