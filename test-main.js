/*var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

// Get a list of all the test files to include
Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
    // then do not normalize the paths
    var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '');
    allTestFiles.push(normalizedTestModule);
  }
});*/

var tests = Object.keys(window.__karma__.files).filter(function (file) {
    return /spec\.js$/.test(file);
}).map(function(file) {
    // create relative path from `baseUrl` for specs, without `.js`
    // i.e., instead of requiring `/base/test/appSpec.js`
    // we want to require `../test/appSpec` when the
    // baseUrl is `/base`
    return './' + file.replace(/^\/base\//, '').replace(/\.js$/, '');
});

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base',

  // dynamically load all test files
  deps: tests,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start,
  paths: {
    jquery: "/base/bower_components/jquery/jquery",
    angular: '/base/bower_components/angular/angular',
    angularMocks: '/base/bower_components/angular-mocks/angular-mocks',
    "uiRouter": "/base/bower_components/angular-ui-router/release/angular-ui-router",
    "ocLazyload": "/base/bower_components/oclazyload/dist/ocLazyLoad"
  },
  shim: {
    angular: { exports: 'angular', deps: ["jquery"] },
    angularMocks: { deps: ['angular'] },
    "uiRouter": {
        deps: ["angular"]
    },
    "ocLazyload": {
        deps: ["angular"]
    }
  }
});
