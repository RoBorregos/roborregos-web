<img src="roborregos_git_logo.png" width="80" ><img> 

# RoBorregos Web                 


Front-end web app for the official RoBorregos' (international robotics team) web site.

Developed by RoBorregos' members and colaborators, in order to publish general
information about the team, sponsors, news, competitions and related content.

You can consult the application on production at [roborregos.com](https://roborregos.com)

## Table of contents

- [RoBorregos Web](#roborregos-web)
  - [Table of contents](#table-of-contents)
  - [Project Details](#project-details)
    - [Development team](#development-team)
    - [Environment URLs](#environment-urls)
  - [Project setup](#project-setup)
    - [Running project](#running-project)
  - [Devel setup](#devel-setup)

## Project Details

This project is made using [React.js](https://reactjs.org/) with [Material UI](https://material-ui.com/getting-started/supported-components/) and [React Bootstrap](https://react-bootstrap.github.io/components/alerts/) components.
Deployment is made with [DeployHQ](https://www.deployhq.com/).

For more information about project management and standards you can check our [wiki](https://github.com/RoBorregos/roborregos-web/wiki).

### Development team

| Name                    | Email                                                               | Github                                                       | Role      |
| ----------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------ | --------- |
| Ivan Alberto Romero Wells | [i.wells.ar@gmail.com](mailto:i.wells.ar@gmail.com)                       | [@IvanRomero03](https://github.com/IvanRomero03)                         | PM |
| Lorena Martinez   | [@gmail.com](mailto:@gmail.com)         | [@](https://github.com/)       | Developer |
| Yair Reyes  | [@gmail.com](mailto:@gmail.com)         | [@](https://github.com/)                   | Developer |
| Héctor Rubén  | [@gmail.com](mailto:@gmail.com)         | [@](https://github.com/)                   | Developer |
| Sebastián Segovia  | [@gmail.com](mailto:@gmail.com)     | [@](https://github.com/AnaGarza)                     | Developer  |
| Emérico Pedraza  | [@gmail.com](mailto:@gmail.com)               | [@](https://github.com/)                       | Developer |
| Alexis Chapa | [@gmail.com](mailto:@gmail.com)               | [@](https://github.com/)                       | Developer |

### Environment URLs

- **Production** - [roborregos.com](https://roborregos.com)
- **Preview** - [roborregos-web.vercel.app](https://roborregos-web.vercel.app)

## Project setup

Before setting up the project, you should have installed the following development tools:

- [Git](https://git-scm.com/downloads)
- [Node.js](https://www.npmjs.com/get-npm)

Once you have installed the required third-party software, you can follow this steps:

1. Clone the project repository on your local machine.

   SSH:

   ```bash
   $ git clone git@github.com:RoBorregos/roborregos-web.git
   ```

   or HTTPS:

   ```bash
   $ git clone https://github.com/RoBorregos/roborregos-web.git
   ```

2. Create the __node_modules__ directory needed to run react apps.

   ```bash
   $ npm install
   ```
3. Create .env file and fill its variables.

	```bash
	$ cp .sample-env .env
	```

### Running project

In your terminal, run:

```bash
$ npm start
```

In order to run the service in other window, just run:

```bash
$ START "" npm start
```
if on windows, or

```bash
$ npm start &
```
to run in the background, on Unix.

Use `Ctrl + C` to exit the logs and turn the application down.

## Publishing a blog post

Blog posts show up on the Home page (below Mission/Vision) and at `/blog/<slug>`. Each post is a JSON file added with a pull request; merging it to `develop` publishes it.

1. Copy `src/data/blog/_template.json` to `src/data/blog/<slug>.json` (e.g. `larc-2026.json`). The file name becomes the URL.
2. Put the post's images in `src/images/blog/<slug>/` and reference them relative to `src/images/blog/` (e.g. `"cover": "larc-2026/cover.jpg"`). Full `https://` image URLs also work. Keep images under ~500 KB.
3. Fill in `title`, `date` (`YYYY-MM-DD`), `summary` and the `content` blocks (`paragraph`, `heading`, `image`, `video` with a YouTube `/embed/` URL). Any text can be a plain string or `{ "es": "...", "en": "..." }`.
4. Set `"draft": false` (drafts and files starting with `_` are hidden).
5. Check it with `npm start`, then open a PR to `develop`.


## Devel setup

For the development of the project the following tools are used:

- [ESLint](https://eslint.org/): Following Airbnb's style and using the es2020 standard.
- [Flow](https://flow.org/): A static type checker for Javascript.
- [Babel](https://babeljs.io/): A javascript compiler, which is required for Flow.
- [Jest](https://jestjs.io/): The main Javascript test framework.

It is strongly recommended to use VSCode in order tu automatize some of the checks used by the tools above mentioned. For that, install the following extension:

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint): to check automatically syntax errors and fix them.

**_NOTE: The following are not as strongly recommended, but are helpful too._**

- [Flow Language Support](https://marketplace.visualstudio.com/items?itemName=flowtype.flow-for-vscode): to show flow's errors on intellisense.
- [Babel ES6/ES7](https://marketplace.visualstudio.com/items?itemName=dzannotti.vscode-babel-coloring): it helps to visualize better the code in the most recent standard.

Once installed, everything should be running smoothly with the setting.json configuration.
