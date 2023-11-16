---
title: Links
description: Style for links in documentation
sidebar_position: 3
keywords:
  - quai
  - links
  - style
---

## Internal Links

Internal links are links to other pages within the documentation. When using internal links, **always use root relative file paths**, e.g. `/wiki/style/links.md`. **Never use relative file paths**, e.g. `../style/links.md`. While both path types will break links when files are moved, root relative file paths make it significantly easier (on you and our team) to find and fix when this happens.

Link syntax looks like:

```md
[Introduction to Quai](/learn/intro.md)
```

In the link above, "Introduction" to Quai is the display text and `/learn/intro.md` is the root relative file path that the link resolves to.

## External Links

External links follow the same syntax as internal links, but instead of a root relative file path, they use a full URL. For example:

```md
[Quai Website](https://qu.ai)
```

External links should _always be hyperlinked_ using the markdown syntax above. **Never use raw URLs**.
