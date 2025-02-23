---
author: Diego Parra
pubDatetime: 2025-02-23T13:56:51.000+01:00
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

Github Pages is a hidden gem that I don't see many people taking advantage of.
It is a great platform to host your projects' documentation, or any static
website for free! I'll try my best to explain how to use it, and we'll deploy
our first webpage on it.

## Table of contents

## Ok but what is Github Pages?

Per the
[official documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages):

> GitHub Pages is a static site hosting service that takes HTML, CSS, and
> JavaScript files straight from a repository on GitHub, optionally runs the
> files through a build process, and publishes a website.

Or in fewer words: Free hosting baby 🚀📈

## Should you learn Github Pages?

The short answer? Yes.
<br/> The long answer? Yeeeeeeeeesssss.

<em style="background-color:#E26D63;color:#282828">Hot take</em> Any dev who's
worth their salt should be proficient with the tools they use, or at the very
least be aware of the capabilities of said tools, GitHub being one of the most
used by more than
[100 million of us](https://github.blog/news-insights/company-news/100-million-developers-and-counting/),
knowing more stuff == good,
<em style="background-color:#8BB180;color:#282828">controversial I know</em>.

Anyways, here are some arguments I think will convince you of at least trying it
out:

1. You won't get a crippling bill if someone decides to DDOS your TODO react
   app.
2. It's super simple.
3. Costs 0 dollars.
4. Native github actions integrations makes deploying with any framework super
   easy.
5. IMO for most websites, PaaS offerings are like using a cannon to kill a fly.
6. Your portfolio probably doesn't need a SLA of 99.9% uptime.
7. Without a doubt the best place to host documentation for your projects.
8. You clicked on the post already, may as well finish reading it.

I hope my sales pitch was effective and you're already convinced to try it out.
<img src="https://i.imgflip.com/9jydcb.jpg" width=400 alt="Cutting meat with a
  sword"/>

> Now my portfolio can handle hundreds of requests per second!!!!1

But now you are probably wondering "how do we use this thing?".

## There's two schools of thought

![2025-02-19-at-12-37-54.avif](https://res.cloudinary.com/dn4loabuq/image/upload/s--FBhOCYPU--/f_webp,q_auto/xspniwcf9dhktwfahpcs?_a=BAMCkGUq0)

> FACT: Bears. Eat. Beets.

We have two approaches for deploying on Github Pages:

### `[0] = The classic way`

Github looks for an index.html file in one of the following sources:

- The root of the repository.
- A /docs directory.

It then takes those files and serves them, easy peasy. The default branch is
used for deployments (main or master) but we can configure this and deploy from
an arbitrary branch (deployments, docs, etc).

<ins>The pros</ins>

- It's dead simple, you just push the static files on the configured source and
  _voilà_ a working website.
- You can specify the branch from where you want to deploy those files easily
  with a drop-down menu.

<ins>The cons</ins>

- Very little flexibility.
- You are limited to static files ready to serve, so if you're using a framework
  like Astro, for example, you would have to build your webpage beforehand and
  then commit the built files (do not even attempt to do this, please).

### `[1] = The DIY way`

If you want to have full control of the deployment process you can leverage
github actions to achieve this, we will be using this method to build and serve
a React app (but you can use whatever shiny framework you like).

<ins>The pros</ins>

- All the flexibility in the world (thanks to github actions).
- It's implied in the previous point, but you can bring any framework you like,
  because we will do the building process and deployment ourselves.

<ins>The cons</ins>

- You'll need to know github actions.

  _But if you ask me that's a plus._

![2025-02-19-at-19-16-22.avif](https://res.cloudinary.com/dn4loabuq/image/upload/s--zIA3VTiP--/f_webp,q_auto/hs5ynkjxv7gv9lcxofx5?_a=BAMCkGUq0)

> I lied about there only being two ways

### `[2] = The third way`

Github actions has a jekyll integration, but I won't be covering it here, it's a
bit convoluted for my taste and at that point you may as well just use github
actions, but _yeah well that's just like my opinion man_. You can read about it
[here](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/creating-a-github-pages-site-with-jekyll).

## The boilerplate

First of all I will assume you have a basic understanding of how web frameworks
work as well as basic git and github for this section (You know how to git push
to a remote repository).

### 1. Setup the repo

Go and create a repository on github and name it whatever you like, in my case I
will name it github-pages-example:

![2025-02-18-at-14-24-15.avif](https://res.cloudinary.com/dn4loabuq/image/upload/s--lLg9z1ng--/f_webp,q_auto/xlg2rhv4zgivjwxko6by?_a=BAMCkGUq0)

### 2. Scaffold the project

On your local machine let's create the react project using vite:

```bash
npm create vite@latest
```

Which vite options you choose here are irrelevant for the purposes of the
tutorial, but you should end up with something like this:

![2025-02-18-at-14-47-06.avif](https://res.cloudinary.com/dn4loabuq/image/upload/s--mosmMhl5--/f_webp,q_auto/lobhytxala52ja0tnwgo?_a=BAMCkGUq0)

Now inside the repo let's install our dependencies and run the project to verify
everything is a-ok:

```bash
npm i
npm run dev
```

Go to the localhost url (usually localhost:4321) and you should see the vite
starting page:

![2025-02-18-at-14-55-57.avif](https://res.cloudinary.com/dn4loabuq/image/upload/s--nU-alASS--/f_webp,q_auto/bf7zxdn8px0y5vpodpfd?_a=BAMCkGUq0)

Now let's create a `.github` directory with a `workflows` directory inside,
here's were our workflow files will live:

```bash
mkdir -p .github/workflows
```

And that's it, that's all the boilerplate we need to start working:

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

> You should end up with something similar

### 3. Vite specific config

The base default path for vite is `/` but our deployment url will look something
like this: `https://<USERNAME>.github.io/<REPO>/`. Leaving this base path will
means the browser will try to fetch static files from
`https://<USERNAME>.github.io/style.css` instead of
`https://<USERNAME>.github.io/<REPO>/style.css`, for example, leading to a 404.
Read more about url paths
[here](https://www.w3schools.com/html/html_filepaths.asp).

Having explained the why, let's now configure the `base` property in the
configuration file (`vite.config.ts` in my case) to use the name of our repo, in
my case `/github-pages-example/`:

![2025-02-23-at-02-02-43.avif](https://res.cloudinary.com/dn4loabuq/image/upload/s--raW6zSaN--/f_webp,q_auto/vfpqveejxcammg4ydexh?_a=BAMCkGUq0)

We could also use a relative path `"./"` but vite recommends using the repo name
on their [docs](https://vite.dev/guide/static-deploy#github-pages).

### 4. Push to remote

Hit it with some good ol' git action:

```bash
git init -b main
git add -A
git commit -m "First commit"
git remote add origin git@github.com:0bCdian/github-pages-example.git
git push -u origin main
```

And now you should see the remote repo with the recent changes reflected:

![2025-02-18-at-15-17-07.avif](https://res.cloudinary.com/dn4loabuq/image/upload/s--JyD4_-pB--/f_webp,q_auto/c98m3v31hsfbzbzmw2je?_a=BAMCkGUq0)

### 5. Configuring the deployment source

In the github repo go to settings > pages:

![2025-02-18-at-15-21-40.avif](https://res.cloudinary.com/dn4loabuq/image/upload/s--xPZnChwm--/f_webp,q_auto/oq4pyvk4ekdybbx7stsw?_a=BAMCkGUq0)

> Click the gear icon

![2025-02-18-at-15-22-41.avif](https://res.cloudinary.com/dn4loabuq/image/upload/s--20h0qAAF--/f_webp,q_auto/mevhtw7fgfd2fqap9hqh?_a=BAMCkGUq0)

> Click the pages tab

Now in the pages tab we're going to change the source from branch to github
action:

![2025-02-18-at-15-25-31.avif](https://res.cloudinary.com/dn4loabuq/image/upload/s--fqIFnE-G--/f_webp,q_auto/edztreiyho2v08vbkanq?_a=BAMCkGUq0)

> Before

![2025-02-18-at-15-25-49.avif](https://res.cloudinary.com/dn4loabuq/image/upload/s--rMQ61tBU--/f_webp,q_auto/jrdltr6piwxmhp9ixtxf?_a=BAMCkGUq0)

> After

And that's all the configuring we need for now. Next on the list is creating the
workflow file that will build and deploy our site.

But first...

## Github actions crash course

![ibai.gif](https://res.cloudinary.com/dn4loabuq/image/upload/s--Y6SjLtqw--/f_webp,q_auto/dgozaoj1aubrmoauo27t?_a=BAMCkGUq0)

If you're already familiar with github actions feel free to
[skip ahead](#4321-deploy), for everyone else here's the quick and dirty
explanation:

Github actions is a CI/CD platform for automating your workflows, without
getting into much detail, it boils down to writing configuration files that
define the steps we want to execute every time something happens (we decide
which something). The files are written in [YAML](https://yaml.org/) and must be
created inside the `.github/workflows` directory. When a new commit is pushed,
github looks in the workflows directory for files, parses them and if the
triggers are met, the workflows run. If you don't even know yaml/yml do not
fret, it's just a configuration language that uses indentation for specifying
context similar to python, and you can learn the gist of it in like
[5 minutes](https://learnxinyminutes.com/yaml/), if you'd like a more thorough
explanation
[go read the friendly manual here](https://docs.github.com/en/actions).

![2025-02-18-at-15-39-01.avif](https://res.cloudinary.com/dn4loabuq/image/upload/s--5aYXXY66--/f_webp,q_auto/l6jpvj66etbqonasibxm?_a=BAMCkGUq0)

> Overly simplified diagram of github actions

When you create your workflows and push them to a branch they will be picked up
by github and will appear in the actions tab of your repository, like so:

![2025-02-19-at-10-01-01.avif](https://res.cloudinary.com/dn4loabuq/image/upload/s--1YBJQZ3d--/f_webp,q_auto/qvdbweat29caff6kkzya?_a=BAMCkGUq0)

### The guts of a workflow

I will be very brief about the syntax but here's the usual structure goes
something like this:

```yaml
# Optional name for the workflow, this name is what shows up in the actions tab
name: GitHub Actions Demo
# The name that will appear in the "black box" (the workflow instance if you will)
run-name: ${{ github.actor }} is testing out GitHub Actions 🚀
# Definitions of events that trigger this workflow
on:
  # For example, on pushes...
  push:
    # In the main branch
    branches: [main]
# The list of jobs this workflow will run
jobs:
  # The name of the job
  Explore-GitHub-Actions:
    # The machine that will run this job (the os basically)
    runs-on: ubuntu-latest
    # The steps of this job
    steps:
      # steps run commands in the shell (bash in this case)
      # They can have names, in this case the first three don't
      - run: echo "🎉 The job was automatically triggered by a ${{ github.event_name }} event."
      - run: echo "🐧 This job is now running on a ${{ runner.os }} server hosted by GitHub!"
      - run: echo "🔎 The name of your branch is ${{ github.ref }} and your repository is ${{ github.repository }}."
        # This named step "uses" the action "action/checkout" version 4
      - name: Check out repository code
        uses: actions/checkout@v4
        # More unnamed steps
      - run: echo "💡 The ${{ github.repository }} repository has been cloned to the runner."
      - run: echo "🖥️ The workflow is now ready to test your code on the runner."
        # Another named step
      - name: List files in the repository
        run: |
          ls ${{ github.workspace }}
        # You get the idea
      - run: echo "🍏 This job's status is ${{ job.status }}."
```

There's a lot to unpack here but the general structure of a workflow is:

- The name of the workflow (optional)
- The name of the workflow instance, or run-name (optional)
- The triggers that kick off the workflow, defined with the `on` keyword.
- The jobs in the workflow.
- The steps in a job.

In short a workflow is a series of jobs, a job is a series of steps.

![2025-02-22-at-23-01-35.avif](https://res.cloudinary.com/dn4loabuq/image/upload/s--qDuRUAH5--/f_webp,q_auto/btyxr9mf0exqqt2m2shq?_a=BAMCkGUq0)

You probably noticed that we used two different keywords in the steps, `uses`
and `run`:

- `run` is for running commands directly in the shell of the operating system
  (bash, powershell, etc).
- `uses` is meant for running actions.

### And what is an action then? You may ask

You can think of an action as a song, and a workflow as a playlist. In more
technical terms, an action is a self-contained piece of code meant to be run as
a step in a larger workflow. There's actually a
[marketplace](https://github.com/marketplace?type=actions) for actions and
Github itself maintains quite a lot of [them](https://github.com/actions). The
name of an action has the following structure `repo/action-name@version`, for
example, `actions/checkout@v4` which clones the repo, and then configures the
working directory of the machine to be the root of your repository (I would bet
this is the most used action by far).

I won't extend further as I could write a blog just on this topic,
[refer to the docs](https://docs.github.com/en/actions/sharing-automations/creating-actions/about-custom-actions)
if you want to learn more about it.

### Running our first workflow

Let's paste the example workflow from the
[the previous section](#the-guts-of-a-workflow) in a file called
`my-first-action.yml` inside the `.github/workflows/` directory:

```bash
cat <<EOF >>.github/workflows/my-first-action.yml
name: GitHub Actions Demo
run-name: ${{ github.actor }} is testing out GitHub Actions 🚀
on:
  push:
    # In the main branch
    branches: [main]
jobs:
  Explore-GitHub-Actions:
    runs-on: ubuntu-latest
    steps:
      - run: echo "🎉 The job was automatically triggered by a ${{ github.event_name }} event."
      - run: echo "🐧 This job is now running on a ${{ runner.os }} server hosted by GitHub!"
      - run: echo "🔎 The name of your branch is ${{ github.ref }} and your repository is ${{ github.repository }}."
      - name: Check out repository code
        uses: actions/checkout@v4
      - run: echo "💡 The ${{ github.repository }} repository has been cloned to the runner."
      - run: echo "🖥️ The workflow is now ready to test your code on the runner."
      - name: List files in the repository
        run: |
          ls ${{ github.workspace }}
      - run: echo "🍏 This job's status is ${{ job.status }}."
EOF
```

> One-liner bash command to create the workflow

Then commit this file and push it to the remote:

```bash
git add .github/workflows/my-first-action.yml
git commit -m "Adding our first workflow!"
git push origin main
```

![2025-02-19-at-19-34-44.avif](https://res.cloudinary.com/dn4loabuq/image/upload/s--L6gFdx9---/f_webp,q_auto/qpmunoko5hc2an8adlix?_a=BAMCkGUq0)

You will see a yellow dot beside the commit message, and on the actions tab as
well, this means the workflow was read successfully and is currently running:
![2025-02-23-at-00-06-21.avif](https://res.cloudinary.com/dn4loabuq/image/upload/s--ij3uxtXV--/f_webp,q_auto/xz9zvdfkkzybdgd8y7tg?_a=BAMCkGUq0)

Navigate to the actions tab and you should see the worfklow in action:

![2025-02-23-at-00-07-12.avif](https://res.cloudinary.com/dn4loabuq/image/upload/s--_DVN3ecf--/f_webp,q_auto/pm5kb4ulgwa6ghwikaeh?_a=BAMCkGUq0)

![2025-02-23-at-00-07-41.avif](https://res.cloudinary.com/dn4loabuq/image/upload/s--FS_w68Us--/f_webp,q_auto/tqut2akqz7dxvrm5ymza?_a=BAMCkGUq0)

![2025-02-23-at-00-15-36.avif](https://res.cloudinary.com/dn4loabuq/image/upload/s--V2tqDMXz--/f_webp,q_auto/izmutgticksgegmelbx3?_a=BAMCkGUq0)

> Inspecting a job

Congratulations, you just ran your first workflow! 🎉

There's a lot more you can do with workflows, but I can't cover all of it in
this post for brevity's sake, go to the
[official documentation](https://docs.github.com/en/actions/writing-workflows/about-workflows)
to learn more about github action workflows.

Now let's get down to business.

## 4..3..2..1.. Deploy!! 🚀

Now back on our local repo, let's write the workflow for deploying our site.

This is the basic overview of what we are going to do:

![2025-02-18-at-22-00-16.avif](https://res.cloudinary.com/dn4loabuq/image/upload/s--XOGxk-uO--/f_webp,q_auto/ixtmalnil3xq5jepbxax?_a=BAMCkGUq0)

If you check your `package.json` you will see a build command, if you run it
vite will output a `./dist` directory with the contents of the website ready to
serve. We are going to upload those files to an
[artifact](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/storing-and-sharing-data-from-a-workflow)
and deploy them with the help of these two official github actions:

- [`actions/upload-pages-artifact@v3`](https://github.com/actions/upload-pages-artifact)
- [`actions/deploy-pages@v4`](https://github.com/actions/deploy-pages)

The names are self-explanatory but the general idea is that the first one takes
the directory we give it as an input, and packages it in a specific way before
uploading it as an artifact. The second one downloads the artifact we uploaded
before, and creates a new deployment with the static files downloaded.

### We need to make a quick stop on environments

[Per the documentation](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/using-environments-for-deployment):

> Environments are used to describe a general deployment target like production,
> staging, or development. When a GitHub Actions workflow deploys to an
> environment, the environment is displayed on the main page of the repository.

The reason we need them for using Github Pages is because:

![2025-02-23-at-01-05-21.avif](https://res.cloudinary.com/dn4loabuq/image/upload/s--9F_rQAc2--/f_webp,q_auto/wolgz9bxvqg2uxd0it2b?_a=BAMCkGUq0)

But really, the reason lies within the capabilities that environments give you,
like branch protection rules, variables and secrets managing, etc, so github by
default requires that all deployments sit on top of an environment, and since we
are going to make a deployment, we therefore need an environment.

### Back on track

Let's create a file called `deploy.yml` (the name is arbitrary) and open it in
your favorite editor, bonus points if it's neovim (I use neovim btw):

This is what we are going to paste in that file:

```yaml
name: Deploy to github pages

on:
  # on pushes...
  push:
    # to the main branch...
    branches: ["main"]
    paths: ["src/**"]
    # on workflow_dispatch enables a button to run this action manually
  workflow_dispatch:
jobs:
  build:
    runs-on: "ubuntu-latest"
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
          npm ci
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
    # we specify the permissions needed for the next step, granted to this runner
    permissions:
      pages: write
      id-token: write
    # we specify the environment for this deployment, called github-pages
    environment:
      name: github-pages
      # we set the environment url to the output of the next step
      # this may confuse you but this runs asynchronously
      # even though we are defining a field before the step is run and has
      # output anything yet
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: "ubuntu-latest"
    steps:
      # We kick off the deployment
      - name: Deploy to github pages
        id: deployment
        uses: actions/deploy-pages@v4
```

After that some git elbow grease:

```bash
git add .github/workflows/deploy.yml
git commit -m "Let's deploy some pages!"
git push origin main
```

![2025-02-23-at-01-16-12.avif](https://res.cloudinary.com/dn4loabuq/image/upload/s--fQ2DHuj5--/f_webp,q_auto/hizhjiexjpwee7u6ya4a?_a=BAMCkGUq0)

And then check your actions tab to witness the magic happening 🪄:

![2025-02-23-at-01-19-13.avif](https://res.cloudinary.com/dn4loabuq/image/upload/s--Y0L92ZSQ--/f_webp,q_auto/c2e21q5rkmukvtcmqzok?_a=BAMCkGUq0)

> 🦗🦗🦗

Absolutely nothing happened:

![2025-02-23-at-01-21-50.avif](https://res.cloudinary.com/dn4loabuq/image/upload/s--r4L7kriS--/f_webp,q_auto/vurxzzxgllflzc1ip4qq?_a=BAMCkGUq0)

> You've been bamboozled

Don't worry, if you've been following the tutorial step by step <ins>_I did this
on purpose_<ins/>.

<img alt="cat huh meme" src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTMwaTV2ZDJkc3E1ZGZ1NXB6a3FiZnp1M3gxamVmbTVncDE4aW42NyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/GRk3GLfzduq1NtfGt5/giphy.gif"/>

If you paid attention, in the trigger we specified a `path` condition, so not
only do we have to push to main, we also have to push changes to `/src/**`
specifically for the workflow to run.

```yaml
name: Deploy to github pages

on:
  push:
    branches: ["main"]
    # Here's the ඞ
    paths: ["src/**"]
```

So let's do just that, edit the `src/App.tsx` file and add any changes you like:

![2025-02-23-at-01-42-50.avif](https://res.cloudinary.com/dn4loabuq/image/upload/s--xMs79di9--/f_webp,q_auto/bjqj55skqyl9ce1xokng?_a=BAMCkGUq0)

Commit and push those changes and you should see the deploy workflow running (I
swear):

![2025-02-23-at-01-39-44.avif](https://res.cloudinary.com/dn4loabuq/image/upload/s--JFfjft9Y--/f_webp,q_auto/tbmsfbhgukl91wlynbkm?_a=BAMCkGUq0)

![2025-02-23-at-03-02-42.avif](https://res.cloudinary.com/dn4loabuq/image/upload/s---YrgHVkF--/f_webp,q_auto/oqzqqxx3nkqresg9pf1w?_a=BAMCkGUq0)

Click on the link aaaaand:

![2025-02-23-at-03-06-44.avif](https://res.cloudinary.com/dn4loabuq/image/upload/s--2MZo0g1x--/f_webp,q_auto/ixfjtkkrnffpncjgskc5?_a=BAMCkGUq0)

> +500 Aura

![2025-02-23-at-03-21-52.avif](https://res.cloudinary.com/dn4loabuq/image/upload/s--9iwxKVNt--/f_webp,q_auto/jhyiopumniipkqqutste?_a=BAMCkGUq0)

> You've reached the end of the post traveler, feel free to rest here.

## Conclusion

Congratulations! You’re now the proud recipient of -20 minutes of your life. 😆
Jokes aside, I hope you learned something new and can apply this knowledge to
other frameworks.

If you found this post helpful or have any thoughts to share, feel free to reach
out to me on social media. Thanks for reading! ✌🏾
