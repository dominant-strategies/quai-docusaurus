---
title: Contributing to Docs
description: How to contribute to the Quai Network documentation.
sidebar_position: 2
keywords:
  - guide
  - quai
  - contribute
---

## Introduction

This article aims to provide a step by step guide on how to contribute to the Quai Network documentation using a uniform workflow. We'll help you set up your local development environment, create a PR, go through the review process, and merge your changes into the docs.

## Environment Setup

### 1. Fork the repository

To get started, you'll need to fork the [`quai-docs`](https://github.com/dominant-strategies/quai-docs) repository. If you're logged into Github, you can do this simply by clicking [here](https://github.com/dominant-strategies/quai-docs/fork), or by clicking the "Fork" button in the top right corner of the repository page.

Once you've forked the repository, you'll need to clone it to your local machine. Do this by running the following command in your terminal:

```bash
git clone https://github.com/<your-github-username>/quai-docs.git
```

### 2. Install dependencies

The Quai Docs utilize `npm` to manage dependencies and run scripts. To **navigate to your fork and install dependencies**, run the following command in your terminal:

```bash
cd quai-docs && npm install
```

### 3. Run the docs locally

At this point, we recommend **testing your local environment** to ensure everything is working properly. To do this, run the following command in your terminal:

```bash
npm start
```

This should automatically open a browser tab at `localhost:3000` with the Quai Docs homepage. If you see this, **you're good to go!**

## Contribution workflow

### 1. Create a branch

:::warning
Before creating your a branch on your fork, **make sure you're on the `main` branch** and have pulled the latest changes from the upstream repository.
:::

For branch naming, we follow a convention that includes both _your name_ and _short description of the branch_. For example, let's say your name is Hal you're adding a new article about animals with fins, you would name your branch `hal/fins`.

To checkout and name a new branch for your feature, run:

```bash
git checkout -b <your-name>/<branch-description>
```

### 2. Make your changes

To start making your local changes, spin up the your development server with:

```bash
npm start
```

You'll be able to see any changes you make to the docs in real time at `localhost:3000` in the browser.

All of the docs content lives within `.md` and `.mdx` files inside of the `/docs` directory. Edit these files directly to make your changes. If you're unfamiliar with markdown or MDX, checkout our [markdown guide](/category/markdown-guide) for some tips.

As you start making changes, we ask that you reference the [Quai docs style guide](/category/style) to ensure your changes are consistent in style and format to the rest of the docs. Feel free to find a similar page in the docs and use it as a template for your changes, this tends to be the easiest way to match our style guide.

### 3. Stage and commit your changes

After you've made your changes, you'll need to stage and commit them. Commit messages should always be prefixed by the change type, e.g. `add:`, `fix:`, `update:`, etc. Stage and commit your changes with:

```bash
git add . && git commit -m "<change-type>:<your-commit-message>"
```

:::warning
The `quai-docs` repo utilizes pre-commit linters to ensure commit quality. If your commit fails the linter, check the output of the linter and make the necessary changes to your commit. For more details on how to resolve linting errors, check out the [style guide](/category/style).
:::

Our team isn't particular about your commit size or frequency, but we do ask that for larger features, you break your commits up into smaller chunks descriptive of each action. This makes the review process easier for our team and will keep the commit history organized and logical.

### 4. Test your changes

While the linter will catch and correct most spelling and formatting errors, but it's still important to test your changes locally to ensure everything is working as expected. We don't have any automated tests for the docs, so the testing process consists of manually building and serving the docs to ensure everything is working as expected.

To build the docs, run:

```bash
npm run build
```

This should output something similar to this:

```bash
[SUCCESS] Generated static files in "build".
[INFO] Use `npm run serve` command to test your build locally.
```

If you get an output that doesn't contain `[SUCCESS]`, there's likely an error in your changes. Check the output of the build command for any errors and make the necessary changes to your code. The most common errors include:

- Broken markdown links
- Incorrect image links
- Missing component imports

Once you've successfully built the docs with the `[SUCCESS]` message, you can serve them locally with:

```bash
npm run serve
```

Check if the site renders correctly at `localhost:3000` in your browser. Go through your changes, check for broken links, images, or any other issues. If everything looks good, you're ready to push your changes.

### 5. Push your changes

Now that your changes are staged, committed, and tested, you're ready to push them to your fork. Push your changes with:

```bash
git push origin <branch-name>
```

### 6. Create a pull request

Visit your fork of [`quai-docs`](https://github.com/dominant-strategies/quai-docs) on Github and you should see a banner at the top of the page that says "your-branch-name had recent pushes 1 minute ago". Click the "Compare & pull request" button to create a PR.

Github will walk you through finishing your PR. Make sure to follow the instructions in the PR template and add any relevant labels to your PR. Once you've finished the PR, click "Create pull request" to submit it.

Now, you can request a review from one of our team members (Max and Judi are most active in this repo). Feel free to ping us on [Discord](https://discord.gg/s8y8asPwNC) as well if you'd like us to review your PR. We'll get back to you as soon as we can.

**Thanks for contributing to the Quai Network docs! We're incredibly appreciative of your help and look forward to reviewing your PR.**
