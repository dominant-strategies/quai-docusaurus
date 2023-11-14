# README

Thanks for your interest in contributing to the [Quai Network documentation](https://qu.ai/docs/)! This document contains information on how this repository is managed, and how to contribute to the documentation. 

To learn how to contribute to this repository, check out [CONTRIBUTING.md](./CONTRIBUTING.md)

## Table of Contents

- [Who Owns This Repo?](#who-owns-this-repo)
- [Docs Architecture](#docs-architecture)
- [Markdown (.md & .mdx)](#markdown-md--mdx)
- [Images](#images)

## Who Owns This Repo?

This repository is owned by [Dominant Strategies](https://dominantstrategies.io/), a software development company working on [Quai Network](https://qu.ai/), under the [GNU General Public License (v3)](https://www.gnu.org/licenses/gpl-3.0.en.html). All changes to this repository must be approved by the Dominant Strategies team before being merged into the main branch.

For help contributing to this repository or to discuss proposed changes, you can join and chat in the [Quai Dev Discord Server](https://discord.gg/s8y8asPwNC).

### Docs Architecture

This documentation runs off of the [Docusaurus 3.0 framwork](https://docusaurus.io/).

The Quai documentation is divided into three seperate **tabs**: Learn, Participate, and Develop. The Learn tab focuses on general information and explanations, while the Participate tab focuses on using Quai and running hardware and the Develop tab focuses on software (smart contracts/APIs). Each of these tabs has a variety of **docs** within them.

Most contributions to this repository will not require the creation of a new doc, and will focus on editing existing docs; however, if your proposed changes do require a new doc, you can learn how to create one in the [Docusaurus documentation](https://docusaurus.io/docs/create-doc). While there are no strict guidelines for the organization of docs within tabs, proposed changes should follow the existing docs structure as closely as possible.

### Markdown (.md & .mdx)

Each **doc** is created in Markdown as a .md or .mdx file. To learn how to format in Markdown, you can visit the [Markdown Guide](https://www.markdownguide.org/basic-syntax/).

.mdx files allow for the use of components in your Markdown docs. You can learn more about the full capabilities of .mdx files in the [mdxjs documentation](https://mdxjs.com/docs/).

### Images

Images live in the /static/img/ folder of this repository. To add a new image, add the file to the /static/img/ folder and reference it in your Markdown doc(s) with the following: `![AltText](imagepath)`
