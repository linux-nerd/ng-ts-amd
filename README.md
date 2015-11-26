# ng-ts-amd
This will  provide workspace for Angular Web App development using Typescript and RequireJs Module.

## Requirement
In order to use this repo, check if 
* Node and npm
* bower
* git
* grunt
* tsd

is installed on your system.

## Installation
` git clone https://github.com/linux-nerd/ng-ts-amd.git `

## Assumption
* Apache WebServer is used (XAMPP, WAMP, MAMP, LAMP)

## Build Process
* ` npm install ` (will execute ` bower install `, ` tsd install` and ` grunt ` command. And browse through localhost:{port}/ng-ts-amd/dist/ and localhost:{port}/ng-ts-amd/dist/apple).
* ` grunt release` (will create release folder . Browse through localhost:{port}/ng-ts-amd/release/)

## Test
` npm test ` (will execute karma start  command and the test  will be executed on PhantomJs)