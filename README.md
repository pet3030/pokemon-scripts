# pokemon-scripts

This is a monorepo including several script for Riliane

## Prerequisites

- [NodeJS](https://nodejs.org/en/download/package-manager)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Git](https://git-scm.com/downloads/win)

## Install

```cmd
git clone https://github.com/pet3030/pokemon-scripts.git
cd pokemon-scripts
npm install
```

## Building

`npm run build` will run the build on all workspaces, output is placed into a `dist` folder in each workspace, which can then be uploaded to Tampermonkey

## Scripts

### Information Extractor

The information extractor script is designed to parse information from tooltips and send that information to the console in a specific format.

### Species Search

The species search script is designed to extract like the information extractor, but filters the output based on the designated search criteria.
