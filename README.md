#test runner:
https://jestjs.io/en/ 

#test framework:
https://developers.google.com/web/tools/puppeteer

#run tests:
_Open src/tests/{filename} => click run on describe or it level(describe level run all suite tests, it level run single test)_

_To run all tests in parallel (for example in CI)  go to package.json scripts => testParall. To run sequentially package.json scripts => testInOrder_

_If you setup CI job don't forget to set CI=true otherwise tests will be run in watch mode_

#project structure:
_Create BasePage with common methods_

_For any Page create new {Page}.js file extended from BasePage.js_

_Add selectors to selectors.js to appropriate part_

_To change default timeout go to package.json => jest => testTimeout_

#Headless mode:
_If you want to run tests in headless mode you must to got to testfiles and set headless: true_

#XPATH selectors:
https://www.w3schools.com/xml/xpath_syntax.asp

#CSS Selectors:
https://www.w3schools.com/cssref/css_selectors.asp

`Please note that import/export modules are available only after configuring babel and webPack https://dev.to/alecgodwin/how-to-setup-webpack-and-babel-for-es6-dpk(THIS PROJECT IS ALREADY SETUP TO SUPPORT MODULES)`