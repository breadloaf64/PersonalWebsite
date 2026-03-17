# My Website

Find here the source code for my personal website https://peterkaku.com/

This project is made with [Astro](https://astro.build/), and the build static website is deployed to GitHub pages.

# Development

## Getting started

- You will need node installed
- In vscode, install the [Astro extension](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode)
- Go to project root and run `npm install`

## Developing

To run in dev mode (with live update and hot reloading courtesy of Vite) use `npm run dev`

At the minute the project is develped using node 18. This is relevant for deployment, because the build step in the workflow requires a node version.

# Deployment

The project is deployed using a GitHub action according to [instructions on the Astro Docs](https://docs.astro.build/en/guides/deploy/github/).

# Blog

To add a blog post, go to src/content/feed/ and add a new md file. Define the type in the frontmatter as "blog". I suggest copying an existing blog and then editing it.

Blogs are rendered via src/pages/blog/[slug].md
