// Working HTTP Server

// We use the HTTP module shipped with Node.js
// and make it available through http variable

var http = require("http");
var url  = require("url");
//var formidable = require("formidable");
//********************************************************
// CreateServer returns an object which has a method
// listen taking the port number.

// In Javascript we can pass functions hence, we are passing it.
//http.createServer(function(request, response)
//{
	//response.writeHead(200, {"Content-Type":"text/plain"});
	//response.write("Hello World");
	//response.end();
//}).listen(8888);

//********************************************************
// Node.js unlike PHP single thread but uses asynchronous callbacks

// To see if our code keeps running even after creating the 
// server and no HTTP request 

// Everytime we refresh, we see "Request received"
// Event-driven asynchronous server-side JavaScript with callbacks
// in action :-)

//function onRequest(request, response) {
	//console.log("Request received.");
	// On receiving a request, writehead sends Helloworld
	//response.writeHead(200, {"Content-Type": "text/plain"});
	//response.write("Hello World");
	// Finish response
	//response.end();
//}

//http.createServer(onRequest).listen(8888);
//console.log("Server has started.");


//********************************************************
// Convert the Server.js into a Node.js module so it can be used by
// the bootstrap - app starter - index.js
//function start(route, handle)
//{
	// Whenever we access localhost:8888 in browser, Request received is printed
	// Request and response can be used to send response back to the browser
	// that requested.
	//function onRequest(request, response) {
		// Distinguish requests based on the URL path requested.
		// We can handle start and upload requests now separately
		//var pathname = url.parse(request.url).pathname;
		//console.log("Request for" + pathname + " received.");
		

		//Instead of expecting a return value from the route() function,
        //we pass it a third parameter, our response object.
		
		//route(handle, pathname, response);
		
		// On receiving a request, writehead sends Helloworld
		// HTTP Status : 200, content type sent in response
		//response.writeHead(200, {"Content-Type": "text/plain"});
		//response.write("Hello World");
		
		// Finish response
		//response.end();
		//}
	//http.createServer(onRequest).listen(8888);
	//console.log("Server has started.");
//}

// Export the function so it can be used by index.js
//exports.start = start;

// File Upload Project

//POST requests can potentially be very large - nothing stops the user from entering text that is
//multiple megabytes in size. Handling the whole bulk of data in one go would result in a blocking operation.
//To make the whole process non-blocking, Node.js serves our code the POST data in small chunks, callbacks that are called upon
//certain events.

//The idea is to put the data and end event callbacks in the
//server, collecting all POST data chunks in the data callback, and
//calling the router upon receiving the end event, while passing
//the collected data chunks on to the router, which in turn passes
//it on to the request handlers.

//function start(route, handle) {
	//function onRequest(request, response) {
		//var postData = "";
		//var pathname = url.parse(request.url).pathname;
		//console.log("Request for " + pathname + " received.");
		// we expect the encoding of the received data to be UTF-8
		///request.setEncoding("utf8");
		
		// Event listener for the “data” event which step by step fills
		// our new postData variable whenever a new chunk of POST data
		// arrives
		//request.addListener("data", function(postDataChunk) {
	//		postData += postDataChunk;
//			console.log("Received POST data chunk '"+
//			postDataChunk + "'.");
		//});
		
		// the call to our router into the end event
		// callback to make sure it’s only called when all POST data is
		// gathered.
		//request.addListener("end", function() {
			// pass the POST data into the router, because
			// we are going to need it in our request handlers
			//route(handle, pathname, response, postData);
		//});
	
	//}


function start(route, handle) {
	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");
		route(handle, pathname, response, request);
	}

		http.createServer(onRequest).listen(8888);
		console.log("Server has started.");
}

	exports.start = start;
	http.createServer(onRequest).listen(8888);
	console.log("Server has started.");
}

exports.start = start;

// APPROACHES
//Right now, our application is able to transport the content (which
//the request handlers would like to display to the user) from the
//request handlers to the HTTP server by returning it up through
//the layers of the application (request handler -> router -> server).

//Our new approach is as follows: instead of bringing the con-
//tent to the server, we will bring the server to the content. To
//be more precise, we will inject the response object (from our
//server’s callback function onRequest()) through the router into
//the request handlers. The handlers will then be able to use this
//object’s functions to respond to requests themselves.


// Node.js ships with its own package
// manager, dubbed NPM. It allows us to install external Node.js
// modules in a very convenient fashion.
// Node image upload module npm install formidable