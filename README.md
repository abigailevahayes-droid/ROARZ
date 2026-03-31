# workspace

A Node.js project managed with [pnpm](https://pnpm.io/) as a monorepo workspace.

## Prerequisites

- [Node.js](https://nodejs.org/) (see `.node-version` or `engines` field in `package.json` for the required version)
- [pnpm](https://pnpm.io/installation)

## Getting started

Install dependencies:

```bash
pnpm install
```

Build the project:

```bash
pnpm run build
```

Start the application:

```bash
pnpm start
```

## Project structure

This is a pnpm workspace monorepo. Packages are organized under the following directories:

- `artifacts/` — deployable application packages
- `lib/` — shared libraries and integrations
- `scripts/` — internal tooling and scripts

## Deployment

This project is deployed on [Railway](https://railway.app/). Railway uses [Railpack](https://railpack.io/) to detect the build and start commands automatically from `package.json`.

> **Note:** The `start` script in `package.json` is currently set to `node index.js` as a placeholder. Update it to match the actual entry point of your application (e.g. `node dist/server.js` or `node src/index.js`) before deploying.
