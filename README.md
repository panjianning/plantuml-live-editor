# PlantUML Live Editor

Edit, preview and share plantuml charts/diagrams.

based on [mermaid-live-editor](https://github.com/mermaid-js/mermaid-live-editor)

## Features

- Edit and preview flowcharts, sequence diagrams, gantt diagrams in real time.
- Save the result as a svg
- Get a link to a viewer of the diagram so that you can share it with others.
- Get a link to edit the diagram so that someone else can tweak it and send a new link back

## Live demo

You can try out a live version [here](https://panjianning.com/puml/).

## Setup
```bash
npm install -g global cross-env
npm install
```
## Development

```bash
npm run build
npm run preview
```

or

``` bash
npm run dev
```

Then open http://localhost:3000/puml

Note: If you want to use the root directory, edit the `kit.paths.base` variable in svelte.config.js and replace
`'/puml/'` to `'/'` in app.html.

## Static Deployment

```bash
npm run build
```

The dist directory contains the generated static files.

