---
author: Diego Parra
pubDatetime: 2025-02-10T13:25:41.000+01:00
modDatetime:
title: Github Pages for devs in a hurry
featured: false
draft: false
tags:
  - CI/CD
  - Github
  - React
  - Hosting
  - Github Pages
description: Let's go, in n' out, 20 minutes adventure!
---

Github Pages is hidden gem that I don't see many people taking advantage of. It is a great platform to host your project's documentation, or any website
for free! I'll try my best to explain how to use it, and we'll deploy our first
webpage on it.

## Table of contents

## Ok but what is github pages?

Per the [official documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages):

> GitHub Pages is a static site hosting service that takes HTML, CSS, and JavaScript files straight from a repository on GitHub, optionally runs the files through a build process, and publishes a website.

Or in fewer words: Free hosting baby 🚀📈

## Should you learn github pages?

The short answer? Yes.
<br/>
The long answer? Yeeeeeeeeesssss.

⚠️ _Hot take_ ⚠️ Any dev who's worth their salt should be proficient with their
tools, or at the very least
be aware of the capabilities of said tools, GitHub being one of the most used by
more than [100 million of us](https://github.blog/news-insights/company-news/100-million-developers-and-counting/), knowing more stuff == good, <ins>_controversial I know_</ins> .

Anyways, here are some of the arguments I think will convince you of at least trying it
out:

1. You won't get a crippling bill if someone decides to DDOS your
   TODO react app.
2. It's super simple.
3. Costs 0 dollars.
4. Native github actions integrations makes deploying with any framework super
   easy.
5. IMO for most websites, PaaS offerings are like using a cannon to kill a fly.
6. Your portfolio probably doesn't need a SLA of 99.9% uptime.
7. Without a doubt the best place to host documentation for your projects.

<img src="https://i.imgflip.com/9jydcb.jpg" width=400 alt="Cutting meat with a
  sword"/>

> Now my portfolio can handle hundreds of requests per second!!!!1

I hope by now my sales pitch was effective and you are probably wondering
"but how do we deploy our sites?"...

## There's two schools of thought

![2025-02-19-at-12-37-54.avif](https://res.cloudinary.com/dn4loabuq/image/upload/s--FBhOCYPU--/f_webp,q_auto/xspniwcf9dhktwfahpcs?_a=BAMCkGUq0)

> FACT: Bears. Eat. Beets.

We have two approaches for deploying on github pages:

### `The classic way`

Github looks for an index.html file in one of the following sources:

- The root of the repository.
- A /docs directory.

It then takes those files and serve them, easy peasy. The default branch (main or master) is used for deployments but we can configure this and
deploy from an arbitrary branch (deployments, etc).

<ins>The pros</ins>

- It's dead simple, just push the static files on the source configured and voilá a working website.
- You can specify the branch you want to deploy those files easily with a
  drop down menu.

<ins>The cons</ins>

- Very little flexibility.
- You are limited to static files ready to serve, so if you're using a framework
  like Astro for example
  you would have to build your webpage and commit the built files (Do not even
  attempt to do this, please).

### `The DIY way`

If you want to have full control of the deployment process you can leverage
github actions to achieve this, we will use this method to build and
serve a React app (But you can use whatever tool you like).

<ins>The pros</ins>

- All the flexibility in the world (Thanks to gh actions).
- It's implied in the previous point, but you can bring any framework you
  like, because we will do the building process and deployment ourselves.

<ins>The cons</ins>

- You'll need to know github actions.

  _But if you ask me that's a plus._

![2025-02-19-at-19-16-22.avif](https://res.cloudinary.com/dn4loabuq/image/upload/s--zIA3VTiP--/f_webp,q_auto/hs5ynkjxv7gv9lcxofx5?_a=BAMCkGUq0)

Github actions has a jekyll integration, but I won't be covering it here, It's a bit convoluted for my taste and at that point you may as well just use github actions, but _yeah well that's just like my opinion man_. You can read about it [here](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/creating-a-github-pages-site-with-jekyll).

## The boilerplate

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

## Github actions crash course

![ibai.gif](https://res.cloudinary.com/dn4loabuq/image/upload/s--Y6SjLtqw--/f_webp,q_auto/dgozaoj1aubrmoauo27t?_a=BAMCkGUq0)

If you're already familiar with github actions feel free to [skip
ahead](#lets-get-the-work-flowing), for
everyone else here's the quick and dirty explanation:

Github actions is a CI/CD platform for automating your workflows, without
getting into much detail, it boils down to writing configuration files that
define the steps we want to execute every time something (we decide which
something) happens. The files are written in yml and must be created inside the `.github/workflows` directory. When a new commit is pushed, github looks in the workflows directory for files, parses them and if the triggers are met, the workflows run. If you don't even know yml do not fret,
it's just a configuration language that uses indentation for specifying context
similar to python, and you can learn the gist of it in like [5
minutes](https://learnxinyminutes.com/yaml/), if you'd like a more thorough
explanation [go read the friendly manual here](https://docs.github.com/en/actions).

![2025-02-18-at-15-39-01.avif](https://res.cloudinary.com/dn4loabuq/image/upload/s--5aYXXY66--/f_webp,q_auto/l6jpvj66etbqonasibxm?_a=BAMCkGUq0)

> Overly simplified diagram of github actions

When you create your workflows and push them to a branch they will
be picked up by github and will appear in the actions tab of your repository,
like so:

![2025-02-19-at-10-01-01.avif](https://res.cloudinary.com/dn4loabuq/image/upload/s--1YBJQZ3d--/f_webp,q_auto/qvdbweat29caff6kkzya?_a=BAMCkGUq0)

Here's an example of what an action file looks like:

```yaml
name: Hello World

on:
  push:
    branches: [main]

jobs:
  say-hello:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Print Greeting
        run: echo "Hello, GitHub Actions! This is a simple workflow."
```

This simple action runs and echoes in the runner terminal "Hello, GitHub
Actions! This is a simple workflow." each time you push to main. You can test
this by creating a file with the contents of the workflow inside the
`.github/workflows` directory. Pasting the following snippet in your
terminal will do the trick:

```bash
cat << EOF >> .github/workflows/my-first-action.yml
# Display name of the workflow
name: Hello World
# Define the triggers
on:
  push:
    branches: [ main ]
# What jobs will be run if the condition is triggered
jobs:
  # First job called say-hello
  say-hello:
    # Specify the machine that will run the workflow
    runs-on: ubuntu-latest
    # Which steps the say-hello job executes
    steps:
        # Name of the step
      - name: Checkout Repository
        # uses keyword means we use an external workflow
        uses: actions/checkout@v4

      - name: Print Greeting
        # run any shell command (bash by default on linux machines and macos,
        # powershell on windows machines)
        run: echo "Hello, GitHub Actions! This is a simple workflow."
EOF
```

Or just create the file yourself and paste it manually, whatever floats your
boat. Then test the
file is there with a cat:

```bash
cat .github/workflows/my-first-action.yml
```

![2025-02-19-at-10-23-48.avif](https://res.cloudinary.com/dn4loabuq/image/upload/s--uwMmpOhE--/f_webp,q_auto/l85vxixhme14bonnar5z?_a=BAMCkGUq0)

> What you should end up with

If you then commit this file and push it to the remote:

```bash
git add .github/workflows/my-first-action.yml
git commit -m "Adding our first workflow!"
git push origin main
```

![2025-02-19-at-19-34-44.avif](https://res.cloudinary.com/dn4loabuq/image/upload/s--L6gFdx9---/f_webp,q_auto/qpmunoko5hc2an8adlix?_a=BAMCkGUq0)

You will see a yellow dot on the
actions tab, meaning the workflow was read successfully and is currently running (I don't have images of this because it ran the workflow too fast).

![2025-02-19-at-19-35-43.avif](https://res.cloudinary.com/dn4loabuq/image/upload/s--O8ScdPoZ--/f_webp,q_auto/m9colrvmm5fgky4l13z0?_a=BAMCkGUq0)
![2025-02-19-at-19-36-04.avif](https://res.cloudinary.com/dn4loabuq/image/upload/s--iLmL6k8t--/f_webp,q_auto/tnmdpnk8j3xpmcfvt1kv?_a=BAMCkGUq0)
![2025-02-19-at-19-36-57.avif](https://res.cloudinary.com/dn4loabuq/image/upload/s--VoHzj1wE--/f_webp,q_auto/n6wo5jxwl1rkjoprqzgh?_a=BAMCkGUq0)

I hope I made a clear point of what actions are and how to define them, If
enough people asks for it (more than 0) I will write a blogpost going more into
detail with this topic.

## The meat and potatos

Now back on our local repo, let's write our workflow.

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
