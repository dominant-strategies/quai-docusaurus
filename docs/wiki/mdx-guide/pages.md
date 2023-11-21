---
title: Pages
description: Page structure guide for the Quai Network documentation
sidebar_position: 2
keywords:
  - pages
  - quai
  - mdx
  - markdown
---

## Front Matter

Docusaurus provides front matter configuration at the top of each markdown or MDX file. Each page should have a block of YAML front matter at the top that defines key page parameters like title, description, SEO keywords, etc. All available options can be found in the [Docusaurus documentation](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs#markdown-front-matter).

Every doc should have at least the following front matter:

```yaml
---
title: <title>
description: <description>
sidebar_position: <position>
keywords:
  - <keyword>
  - <keyword>
  - <keyword>
---
```

:::danger
Please refrain from utilizing the `slug:` front matter property. Docusaurus automatically generates slugs for each page based on the page title. If you define a slug, it will override the automatically generated slug any references to the page.
:::

## Title

Page titles can be defined in two different ways:

As a string in the front matter

```yaml
---
title: <title>
---
```

As a first-level heading in the markdown/MDX file

```md
# Title
```

If both are defined, the front matter title will reflect as the page label in the sidebar, while the first-level heading will be displayed within the page. This can be useful to display a shorter title in the sidebar, while having a more descriptive title within the page.

:::info
If you're interested in further information on how Docusaurus docs pages work, visit the [Docusaurus docs specification page](https://docusaurus.io/docs/docs-introduction).
:::
