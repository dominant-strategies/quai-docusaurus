---
title: Tables
description: Style for tables in documentation
sidebar_position: 3
keywords:
  - quai
  - tables
  - style
---

- Tables should written using markdown syntax when possible. It offers better readability, is easier to maintain, and follows globally set styling configurations.
- If a table becomes too large or complex to write in markdown, use JSX syntax instead.

An example of a markdown table:

```md
| Name         | Description         |
| ------------ | ------------------- |
| Example name | Example description |
```

Which looks like this when rendered:

| Name         | Description         |
| ------------ | ------------------- |
| Example name | Example description |

:::info
If you creating tables, we recommend utilizing [Prettier's on-save formatter](https://prettier.io/) to ensure consistency and handle markdown table formatting for you.
:::
