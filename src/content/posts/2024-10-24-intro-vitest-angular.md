# Introduction to Vitest and Angular

The Angular team deprecated Karma a few versions ago and are currently working on ways to provide an alternative 3rd party unit testing frameworks. Currently the options talked about so far are Web Test Runner (likely to be the default), this is a browser based unit test runner similar in many ways to Karma. The other option being discussed is Jest, this can be installed now but can be a little tricky sometimes to get set up and some known issues when Angular is set up to use ES builds (the default in Angular 18 onward).

The Angular team is looking at using the CLI for the installation process of these unit testing frameworks, similar to selecting a CSS framework when creating a new project. This is all still very early on in the development cycle and may be a little way off before it becomes developer preview (currently still experimental) and no mention (as yet) of how this would work with an existing project.

Now that newer versions of Angular use Vite as a development build server and the default in Angular 18, it is now possible to use Vitest in our Angular projects. The installation process is straight forward to set up and feels less problematic than setting up Jest from my recent experience. The great news here is that Vitest has a similar syntax to Karma and Jest, so the learning curve should be fairly small.

> [!NOTE]
>
> For more information on the build migration in Angular you can check the documentation at: [Angular build system migration](https://angular.dev/tools/cli/build-system-migration)

In this post I'm going to walk through setting up and configuring Vitest in an Angular 18 application and replacing Karma. I won't be writing unit tests in this post, I'll leave that for another post.

I'm going to start a new project for this post but this will also work on an existing project.

In a directory type the following in the terminal:

```bash
ng new my-vitest-app  && cd my-vitest-app && npm i
```

This will create a new Angular application called `my-vitest-app`, it'll change into that directory and then run `npm install` with our application created we can now remove `Karma`.

From the terminal, type:

```bash
npm uninstall karma karma-chrome-launcher karma-coverage karma-jasmine karma-jasmine-html-reporter
```

We don't need to uninstall `@types/jasmine` and `jasmine-core` as Vitest uses Jasmine under the hood, we can use `it` and `describe` from Jasmine so we don't need to import anything in our test files. It is possible to use `it` and `describe` from Vitest but in doing so we won't be able to use functions like `fakeAysnc` in our unit tests.

The easiest way to get Vitest installed in our project is to use a plugin and AnalogJS has just what we need to setup and configure Vitest for us.

From the terminal type:

```bash
npm i @analogjs/platform -D
```

Followed by:

```bash
ng g @analogjs/platform:setup-vitest --project my-vitest-app
```

This package will install the following files:

```json
 "devDependencies": {
     // other files removed for brevity
    "@analogjs/platform": "^1.9.0",
    "@analogjs/vite-plugin-angular": "^1.9.0",
    "@analogjs/vitest-angular": "^1.9.0",
    "@nx/vite": "~19.8.2",
    "@vitest/coverage-v8": "^2.1.3",
    "@vitest/ui": "^2.1.3",
    "vite": "^5.4.9",
    "vite-tsconfig-paths": "^4.2.0",
    "vitest": "^2.1.3"
  }
```

At the time of writing the `@analogjs` library installs `@nx/vite` 19.8.2, Brandon Roberts (AnalogJS creator) has released a beta version that supports `@nx/vite` 20.0.3.

This `@analog` package should install 2.1.3 of vitest, @vitest/ui and @vitest/coverage-v8, if it installs 1.6.0 then you will need to uninstall these packages and reinstall them using:

```bash
npm i @vitest/coverage-v8 @vitest/ui vitest@latest -D
```

Once complete the following files will be generated:

```typescript
// vite.config.mts
/// <reference types="vitest" />
import angular from "@analogjs/vite-plugin-angular";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [angular()],
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["src/test-setup.ts"],
      include: ["**/*.spec.ts"],
      reporters: ["default"],
    },
    define: {
      "import.meta.vitest": mode !== "production",
    },
  };
});
```

`vite.config.mts` will be in the root of the project, this sets up the configuration for Vitest, what environment to use, the default is `jsdom`, you can change this to `happy-dom` (you will need to install `happy-dom`). The `test-setup.ts` will be in the `src` directory and this sets up the test environment.

```typescript
import "@analogjs/vitest-angular/setup-zone";
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from "@angular/platform-browser-dynamic/testing";
import { getTestBed } from "@angular/core/testing";

getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
```

If you are using a`zoneless` application then the `test-setup.ts` will be slightly different:

```typescript
import "@analogjs/vitest-angular/setup-snapshots";

import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from "@angular/platform-browser-dynamic/testing";
import { getTestBed } from "@angular/core/testing";

getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
```

In `angular.json` the `test` section will be replaced with:

```json
 "test": {
    "builder": "@analogjs/vitest-angular:test"
 }
```

And finally the `tsconfig.spec.json` will be update to:

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/spec",
    "types": [
      "jasmine",
      "vitest/globals" // added
    ],
    "target": "es2016" // added
  },
  "include": ["src/**/*.spec.ts", "src/**/*.d.ts"],
  "files": [
    "src/test-setup.ts" // added
  ]
}
```

To run Vitest tests we need to change the scripts section, in our applications `package.json` file add:

```json
{
 // other scripts
 "test" : "vitest"
}

// we could also use this, if you are not the running vitest command
{
    "test" : "ng test --watch"
}
```

Using `npm run test` will run all of our test files our project.

If you don't want to install Volta you can skip this section.

To run `Vitest` from the terminal we need to install Vitest, we have a couple of options, globally using `npm i -g vitest`, I tend to use Volta, this is a tool chain manager, similar to Node Version Manager (NVM) but Volta handles other JavaScript tooling other than just Node.

> [!NOTE]
>
> If you currently have a version of node installed, you will need to uninstall this first before install Volta, once Volta is installed we can install multiple versions of node without removing the previous versions.

To install Volta head over to `https://volta.sh/` and get the appropriate installer package for your operating system, I'm using Ubuntu and all we need for this is:

```bash
# install volta
curl https://get.volta.sh | bash
# install node
volta install node@20.15.0
```

> [!TIP]
>
> As a side note, one of the nice features of Volta, is the ability to pin the version of node we are using to our `package.json` file, meaning that Volta will always select the correct version of Node, this is real handy when working in a team of developers, to pin a version of Node to our `package.json` file run `volta pin node@20.15.0`.

With `volta` and `node` installed we can now install Vitest:

```bash
volta install vitest
```

With Vitest installed we can run `volta ls` this will show a list of the tooling that we have installed.

```bash
# example listing from Volta
⚡️ Currently active tools:

    Node: v20.15.1 (default)
    Tool binaries available:
        vitest (current @ /home/repo/vitest-app/package.json)
```

---

With everything installed we can now run our unit tests, if we want to run a selection of tests (or a specific test) then we need to use the terminal and pass in an additional parameter, this parameter will run any test file that contains this parameter.

```bash
# run a range of unit tests
vitest dashboard
```

We can also specify a file, this will only run a unit test that matches the file name, note that this doesn't support regex or glob patterns.

```bash
# run a specific unit test
vitest app.component
```

The above will run the unit tests and watch for changes, to run the unit test once and not watch for changes we can change the command to:

```bash
# run unit test(s) once then stop
vitest run [optionally specify an additional parameter]
```

If we want to run our unit tests in a CI environment we don't need for them to be in watch mode, so add a `test:ci` to the script section of the `package.json` file.

```json
{
  // other scripts
  "test": "vitest",
  "test:ci": "vitest run"
}
```

We need to set up our build pipelines to run our tests, setting up build pipelines is out of scope for this post, so I will assume you know how to do this, if not they are plenty of posts on how to do this.

The next part I want to cover is code coverage, so we've written our unit tests for our various features in our project, but have we written enough? Have we covered the important parts that need testing? This is where code coverage comes to the rescue. Code Coverage tell us how much of our feature is covered by unit tests, whether we've missed a path, for example we've covered the `if` condition but not the `else` condition.

Let's add a new script to the scripts section of our `package.json` file.

```json
{
  // other scripts
  "coverage": "vitest run --coverage"
}
```

With this we can run `npm run coverage` locally and will create a `coverage` directory for us in the root of the project and we'll get a table of files along with their code coverage:

| File             | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s |
| ---------------- | ------- | -------- | ------- | ------- | ----------------- |
| All files        | 100     | 100      | 100     | 100     |                   |
| app.component.ts | 100     | 100      | 100     | 100     |                   |

When we run this it might prompt to install a supporting package this can be either `coverage-v8` (the default) or `coverage-instanbul` package, if not we can install them manually using:

```bash
# For v8
npm i -D @vitest/coverage-v8

# For istanbul
npm i -D @vitest/coverage-istanbul
```

We can set the `provider` type in the `coverage` section in the `vite.config.mts` file:

```typescript
export default defineConfig(({ mode }) => {
  return {
    plugins: [angular()],
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["src/test-setup.ts"],
      include: ["**/*.spec.ts"],
      reporters: ["default"],
      coverage: {
        provider: "v8",
        reporter: ["text", "json", "html"],
      },
    },
    define: {
      "import.meta.vitest": mode !== "production",
    },
  };
});
```

To run `code coverage` in our CI environment we need to adjust our `test:ci` script to include a reporter, here I've used `junit` and `junit.xml` and there is a handy plugin for `Azure Devops` to read the `junit.xml` file which will import the file and create a nice dashboard for us.

```json
script:{
// other scripts
"test:ci": "vitest run --reporter=default --reporter=junit --outputFile=reports/junit.xml",
}
```

In `Azure devops` we can add the `PublishTestResults` task in our build pipelines and would have the task run after our unit tests have completed.

When we run our unit tests the results will be displayed in the terminal (unless running in a CI environment), but if you prefer to see the results in a browser this is also possible, first we need to install the ui tooling:

```bash
npm i @vitest/ui
```

You will need to match the version of `@vitest/ui` to the same version of `vitest` installed on your system, once installed we can start it by running `vitest --ui` from the terminal, if we add the `html` to the `reporters` array in our `vite.config.ts` file, this will create an `html` directory with all the files.

```typescript
export default defineConfig(({ mode }) => {
  return {
    plugins: [angular()],
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["src/test-setup.ts"],
      include: ["**/*.spec.ts"],
      reporters: ["default", "html"], // add html into this array.
      coverage: {
        provider: "v8",
        reporter: ["text", "json", "html"],
      },
    },
    define: {
      "import.meta.vitest": mode !== "production",
    },
  };
});
```

## Conclusion

In this post we looked at installing and setting up Vitest, a unit test runner in for Angular applications based on Vite, we also added code coverage to our test runs to see how much code coverage our unit tests cover, we also learnt how we can set this up in our CI in Azure Devops.

If you would like to see a working project then I have a repo on GitHub [Vitest test application](https://github.com/DuncanFaulkner/vitest-app).
