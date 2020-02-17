#test runner:
https://jestjs.io/en/ 

#test framework:
https://developers.google.com/web/tools/puppeteer

#run tests:
_Open src/tests/{filename} => click run on describe or it level(describe level run all suite tests, it level run single test)_

#project structure
_Create BasePage with common methods_

_For any Page create new {Page}.js file extended from BasePage.js_

_Add selectors to selectors.js to appropriate part_

_To change default timeout go to package.json => jest => testTimeout_

`Please note that import/export modules are available only after configuring babel and webPack https://dev.to/alecgodwin/how-to-setup-webpack-and-babel-for-es6-dpk`