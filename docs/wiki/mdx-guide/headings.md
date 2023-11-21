---
title: Headings
description: Headings guide for the Quai Network documentation
sidebar_position: 2
keywords:
  - heading
  - quai
  - mdx
  - markdown
---

## Levels

MDX and Markdown support *six heading levels*, from `#` to `######`, which map to HTML heading elements `<h1>` to `<h6>`.

```md
# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6
```

Which displays on page as:

# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

## Conventions

For each page, there **should only ever be a single `h1` or `#` heading**. First-level headings will always be displayed as the page title and should not be used anywhere else on the page.

When using lower level headings, you can use *as many of each as you like*, but always ensure to use them in logical order, e.g. `h2` should always follow `h1`, `h3` should always follow `h2`, etc.

## Links

Docusaurus natively generates an `id` with an associated anchor link for *each heading on a page*. Heading `id`s are simply the kebab-cased spelling of the heading string. This allows you to link to a specific heading on a page using the `id` as the link target.

Page internal heading links require only the `id`:

```md
[Link to Heading 2](#heading-2)
```

Whereas linking to a page external heading requires appending the `id` to the page URL:

```md
[Link to Heading 2](/wiki/mdx-guide/headings#heading-2)
```
