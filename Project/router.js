// we removed any response method calls from the onRequest()
// handler, because we now expect route to take care of that.


//function route(handle, pathname, response) {
	//console.log("About to route a request for " + pathname);
	// Check if the request handler for a path exists
	//if (typeof handle[pathname] === 'function') {
	//handle[pathname](response);
	//} 
	//else 
	//{
		//console.log("No request handler found for " + pathname);	
		//response.writeHead(404, {"Content-Type": "text/plain"});
		//response.write("404 Not found");
		//response.end();
	//}
//}

// File Upload Project

//On the /upload page, we will display the received content.
//function route(handle, pathname, response, postData) {
	//console.log("About to route a request for " + pathname);
	//if (typeof handle[pathname] === 'function') {
		//handle[pathname](response, postData);
	//} else {
		//console.log("No request handler found for " + pathname);
		//response.writeHead(404, {"Content-Type": "text/plain"});
		//response.write("404 Not found");
		//response.end();
	//}
//}

function route(handle, pathname, response, request) {
	console.log("About to route a request for " + pathname);
	if (typeof handle[pathname] === 'function') {
		handle[pathname](response, request);
	} else {
		console.log("No request handler found for " + pathname);
		response.writeHead(404, {"Content-Type": "text/html"});
		response.write("404 Not found");
		response.end();
	  }
}

exports.route = route;
