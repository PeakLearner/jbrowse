#!/usr/bin/env node

/* express server for jbrowse
 * (this script gets copied to the app root directory upon npm install)
 */

var express = require('express');
var getopt = require('node-getopt');
var fs = require("fs-extra");
var shelljs = require("shelljs");

var thisPath = process.cwd();
var jbrowsePath = "./";

// check if jbrowse is a module
if (fs.pathExistsSync(thisPath+"/node_modules/jbrowse/utils")) {
	jbrowsePath = "./node_modules/jbrowse";
}

// command line options
var getopt = new getopt([
    ['p' , 'port=NUMBER' , 'listening port'],
    ['h' , 'help'        , 'display this help']
]);              // create Getopt instance
getopt.bindHelp();     // bind option 'help' to default action
opt = getopt.parseSystem(); // parse command line

var port = 80;

var setPort = opt.options['port'];
if (typeof setPort !== 'undefined') {
    port = setPort;
}

// start the server
var app = express();

var dispPort = "";
if (port !== 80) dispPort = ":"+port;

app.use('/', express.static(jbrowsePath));

app.listen(port, function () {
    console.log('JBrowse is running on port %s',port);
    console.log('Point your browser to http://localhost%s',dispPort);
});
