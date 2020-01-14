# nodecg-template

This is the template for how I create [nodecg](https://nodecg.com) bundles. This template installs the following dependencies:

- vue
- tailwind
- ava
- parcel

## General Structure

All code goes into `src/` in the appropriate sub directory. Parcel compiles and bundles all the code, outputting it into appropriate folders for nodecg to use.

### `dashboard/`

Each dashboard panel should go into its own folder, with its own `index.html` being the entry point.

### `extension/`

All extension code goes into the `extension/` folder, with each thing being broken out into its own file. Each file is loaded by an `index.js` file.

### `graphics/`

Each graphic shuold go in its own folder, with its own `index.html` beng the entry point.

