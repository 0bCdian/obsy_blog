---
author: Diego Parra
pubDatetime: 2025-02-10T13:25:41.000+01:00
modDatetime:
title: Github Pages for people in a hurry
featured: false
draft: false
tags:
  - CI/CD
  - Github
  - JsonResume
  - Hosting
  - Github Pages
description: Let's go in and out, 20 minutes adventure!
---

Github Pages is hidden gem that I don't see many people taking advantage of. It is a great platform to host your project's documentation, or any website
for free! I'll try my best to explain how to use it, and we'll deploy our first
webpage on it.

## Table of contents

## `Why should you care?`

Maybe you've heard of github pages before but didn't bother to learn about it,
here are some of the reasons I think you should at least have a basic
understanding of it:

1. You won't get a massive bill if someone decides to DDOS your
   TODO react app.
2. It's simple.
3. You're a broke boy like me.
4. Native github actions integrations makes deploying with any framework super
   easy.
5. IMO for most websites, PaaS offerings are like using a cannon to kill a fly.

<img src="https://i.imgflip.com/9jydcb.jpg" width=400 alt="Cutting meat with a
  sword"/>

## `But like, how does it work?`

Per the [official documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages):

> GitHub Pages is a static site hosting service that takes HTML, CSS, and JavaScript files straight from a repository on GitHub, optionally runs the files through a build process, and publishes a website.

There are two ways to go about deploying a site on github pages, the classic
way, and the github actions way.

### `The classic way`

Github pages looks for an index.html file in one of the following sources:

- The root of the repository.
- A /docs directory.

The default branch (main or master) is used for deployments but we can configure this and
deploy from an arbitrary branch (deployments, etc).

#### <ins>The pros</ins>

- It's dead simple, just push the code on the source configured and voilá.
- You can specify the branch you want to deploy those files.

#### <ins>The cons</ins>

- Very little flexibility.
- You are limited to static files ready to serve, so if you're using a framework
  like Astro for example
  you would have to build your webpage and commit the built files (Do not even
  attempt to do this, please).

### `The DIY way`

If you want to have full control of the deployment process you can leverage
github actions to achieve this, we will use this method to build and
serve a React app (But you can use whatever tool you like).

#### <ins>The pros</ins>

- All the flexibility in the world (Thanks to gh actions).
- It's implied in the previous point, but you can bring any framework you
  like, because we will do the building process and deployment ourselves.

#### <ins>The cons</ins>

- You'll need to know github actions.

  _But if you ask me that's a plus._

## `Let's get to it`

First of all I will assume you have a basic understanding of how web frameworks
work as well as basic git and github (You know how to git push to a remote
repository).

### `Setup the repo`

Go and create a repository on github and name it whatever

![2025-02-18-at-14-24-15.avif](https://res.cloudinary.com/dn4loabuq/image/upload/s--lLg9z1ng--/f_webp,q_auto/xlg2rhv4zgivjwxko6by?_a=BAMCkGUq0)

Now on your local machine let's create the react project using vite:

```bash
npm create vite@latest
```

What vite options you choose here is irrelevant for the purposes of the tutorial, but you
should end up with something like this:

![2025-02-18-at-14-47-06.avif](https://res.cloudinary.com/dn4loabuq/image/upload/s--mosmMhl5--/f_webp,q_auto/lobhytxala52ja0tnwgo?_a=BAMCkGUq0)

Now inside the repo let's install those dependencies and run the project to
verify everything is a-ok:

```bash
npm i
npm run dev
```

Go to the localhost url (normally localhost:4321) and you should see the vite starting page:

![2025-02-18-at-14-55-57.avif](https://res.cloudinary.com/dn4loabuq/image/upload/s--nU-alASS--/f_webp,q_auto/bf7zxdn8px0y5vpodpfd?_a=BAMCkGUq0)

Now let's create a `.github` directory with a `workflows` directory inside,
here's were our workflows for github actions will live:

```bash
mkdir -p .github/workflows
```

And we should have all the boilerplate we need to start working:

```bash
.
├── eslint.config.js
├── .github
│   └── workflows
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── public
│   └── vite.svg
├── README.md
├── src
│   ├── App.css
│   ├── App.tsx
│   ├── assets
│   │   └── react.svg
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts

6 directories, 17 files
```

Now some good ol' git action and we are set:

```bash
git init -b main
git add -A
git commit -m "First commit"
git remote add origin git@github.com:0bCdian/github-pages-example.git
git push -u origin main
```

And you should see the remote repo with the recent changes now reflected:

![2025-02-18-at-15-17-07.avif](https://res.cloudinary.com/dn4loabuq/image/upload/s--JyD4_-pB--/f_webp,q_auto/c98m3v31hsfbzbzmw2je?_a=BAMCkGUq0)

### `Configuring the deployment source`

In the github repo go to settings > pages:

![2025-02-18-at-15-21-40.avif](https://res.cloudinary.com/dn4loabuq/image/upload/s--xPZnChwm--/f_webp,q_auto/oq4pyvk4ekdybbx7stsw?_a=BAMCkGUq0)
![2025-02-18-at-15-22-41.avif](https://res.cloudinary.com/dn4loabuq/image/upload/s--20h0qAAF--/f_webp,q_auto/mevhtw7fgfd2fqap9hqh?_a=BAMCkGUq0)

In here we're going to change the source from branch to github action:

![2025-02-18-at-15-25-31.avif](https://res.cloudinary.com/dn4loabuq/image/upload/s--fqIFnE-G--/f_webp,q_auto/edztreiyho2v08vbkanq?_a=BAMCkGUq0)

> Before

![2025-02-18-at-15-25-49.avif](https://res.cloudinary.com/dn4loabuq/image/upload/s--rMQ61tBU--/f_webp,q_auto/jrdltr6piwxmhp9ixtxf?_a=BAMCkGUq0)

> After

And that's all the configuring we need for now, all we have to do next is
create the github action that will build and deploy our site.

### `Creating our action`

![ibai.gif](https://res.cloudinary.com/dn4loabuq/image/upload/s--Y6SjLtqw--/f_webp,q_auto/dgozaoj1aubrmoauo27t?_a=BAMCkGUq0)

Now back on our local repo, let's write our workflow. If you've never used
actions before, don't worry, it's basically a .yml file that declares the steps
we want to execute every time some event is triggered on the remote repository (Like a push, a pull request, a new issue open, etc). If you don't even know yml do not fret,
it's just a configuration language that uses indentation for specifying context
similar to python, and you can learn the gist of it in like [5
minutes](https://learnxinyminutes.com/yaml/).

![2025-02-18-at-15-39-01.avif](https://res.cloudinary.com/dn4loabuq/image/upload/s--5aYXXY66--/f_webp,q_auto/l6jpvj66etbqonasibxm?_a=BAMCkGUq0)

> Overly simplified diagram of github actions

Let's create our first action and open it in your favorite editor, bonus points if it's neovim (I use neovim
btw):

```bash
# Create our action file
nvim ./github/workflows/deploy.yml
```

This is what we are going to paste in that file, but don't worry I will explain
what the heck is going on:

```yaml
# Display name of the action on the actions sidebar
name: Deploy to github pages

# Events that trigger this action
on:
  # on pushes...
  push:
    # to the main branch...
    branches: ["main"]
    # only when there are changes on src/
    paths: ["src/**"]
    # on workflow_dispatch enables a button to run this action manually
  workflow_dispatch:
  # run the following jobs
jobs:
  # first job called build
  build:
    # specify the runner machine that will host our actions
    runs-on: "ubuntu-latest"
    # the steps of the job we are in: build
    steps:
      # first step git clone the repo
      - name: Checkout code
        uses: actions/checkout@v4
      # set up nodejs in the ubuntu machine
      - name: Setup node
        uses: actions/setup-node@v4
        with:
          node-version: 22
      # install dependencies (npm ci ensures the package-lock is not modified)
      - name: Install deps
        run: |
          npm run ci
        # we then build our website, default destination of our static files is
        # ./dist
      - name: Build
        run: |
          npm run build
        # we take the ./dist dir and upload it an artifact
      - name: Upload static files to an artifact
        id: build
        if: ${{success()}}
        uses: actions/upload-pages-artifact@v3
        with:
          path: "./dist"
  # we kick the second job called deploy
  deploy:
    # this establishes a dependency between the previous job and this one
    # so if the previous fails, this ones doesn't executes
    needs: build
    # we specify the permissions needed granted to this runner
    permissions:
      pages: write
      id-token: write
    # we specify the environment for this deployment, called github-pages
    environment:
      name: github-pages
      # we set the environment url to the output of the next step
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: "ubuntu-latest"
    steps:
      # We kick off the deployment
      - name: Deploy to github pages
        id: deployment
        uses: actions/deploy-pages@v4
```

Just by glancing at it you can make an educated guess of what's going on, but
here's a diagram of the workflow:

![2025-02-18-at-22-00-16.avif](https://res.cloudinary.com/dn4loabuq/image/upload/s--XOGxk-uO--/f_webp,q_auto/ixtmalnil3xq5jepbxax?_a=BAMCkGUq0)

Thre are some things that are github-actions specific like the syntax or what
are those `actions/something@v4`

> TODO: finish blogpost
