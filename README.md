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

At the minute the project is developed using node 18. This is relevant for deployment, because the build step in the workflow requires a node version.

# Deployment

The project is deployed using a GitHub action according to [instructions on the Astro Docs](https://docs.astro.build/en/guides/deploy/github/).

# Feed

To add a new item to the feed, go to src/content/feed/ and add a new md file. I suggest copying an existing feed md file and then editing it.

Feed items are either entire blog posts which contain the contents of the blog as well (e.g. the [iceland blog](./src/content/feed/2026-03-15-iceland-2026.md)) or links to external pages (e.g. [Giraffe EP](./src/content/feed/2020-06-21-Giraffe-EP.md)). Make sure you set the `type` in the frontmatter accordingly.

Blog posts are rendered via [src/pages/blog/[slug].astro](./src/pages/blog/[slug].astro)
