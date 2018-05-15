# Hesperus
Aktibo insights dashboard

[![Build Status](https://semaphoreci.com/api/v1/projects/aa3622ff-b6a8-47ed-8d8a-6eef8034d3a0/1958350/badge.svg)](https://semaphoreci.com/royipressburger-10/hesperus)


This project is built on top
[Node.js](https://nodejs.org/),
[Redux](https://github.com/reactjs/redux),
[React](https://facebook.github.io/react/), [Webpack](http://webpack.github.io/) and [Babel](http://babeljs.io/).

### Getting Started

  * We recommend using [NVM](https://github.com/creationix/nvm) to manage you node versions.
  * install [Node.js](https://nodejs.org/) >= 8.4
  ```sheel
  git clone git@github.com:aktibo/hesperus.git
  cd hesperus
  npm install
  ```

### Running the project
```shell
$ npm start
```  
This command will build the app and as soon as the initial build completes, it will start the application on [http://localhost:3000/](http://localhost:3000/)

Whenever you modify any of the source files inside the `/src` folder,
the module bundler ([Webpack](http://webpack.github.io/)) will recompile the
app on the fly and refresh all the connected browsers.

Note that the `npm start` command launches the app in `development` mode,
the compiled output files are not optimized and minimized in this case.
You can use the `build` command to check how your app works
in release (production) mode:

```shell
$ npm run build
```

To check the source code for syntax errors and potential issues run:

```shell
$ npm run lint
```

You can also try to fix those error by running:
```shell
$ npm run lint:fix
```

To check the style sheets syntax errors and potential issues run:

```shell
$ npm run lint:scss
```

To launch unit tests:
```shell
$ npm run test      # Run unit tests with jest
```

By default, [Jest](https://facebook.github.io/jest/) test runner is looking for test files
matching the `src/**/__test__/*` pattern.

### More information
  * [Webpack](https://webpack.js.org/guides/) - We use Webpack build tool
  * [react-redux](https://github.com/reactjs/react-redux) - The way to connect components to redux store.
  * [react-redux-router](https://github.com/reactjs/react-router-redux) - connect routing to our redux store.
  * [axios](https://github.com/mzabriskie/axios) - our HTTP client.
  * [ramda](http://ramdajs.com/) - lodash replacement.
  * [redux-form](https://redux-form.com) - Linking forms to redux store.
  * [Style Guide](https://github.com/airbnb/javascript) - Airbnb javascript style guide.
  * [jest](https://facebook.github.io/jest/) - Testing framework
