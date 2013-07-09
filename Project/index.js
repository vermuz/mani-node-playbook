// Application Stack


// *************** Server ***********************
// We can receive HTTP requests but we need to do
// something with them

// Use Server Module
var server = require("./server");

//*************** Router ***************************
// Making different HTTP requests point at different parts of our code is called routing
// We need to be able to feed the requested URL and possible additional GET and POST parameters 
// into our router, and based on these the router then needs to be able to decide which code to
// execute (this “code to execute” is the third part of our application:
// a collection of request handlers that do the actual work when a
// request is received).

// The url module provides methods which allow us to extract the 
// different parts of a URL (like e.g. the requested path and query string), 
// and querystring can in turn be used to parse the query string for request parameters

// All the information we need is available through the request
// object which is passed as the first parameter to our callback
// function onRequest(). But to interpret this information, we need
// some additional Node.js modules, namely url and querystring.

var router = require("./router");



// Inject Request Handlers

var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;

server.start(router.route, handle);

// Server method start
//server.start(router.route);

