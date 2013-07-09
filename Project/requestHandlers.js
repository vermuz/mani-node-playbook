var exec = require("child_process").exec;


// File Upload Project

// what we pass on to the router and the
// request handlers is the complete body of our POST request. We
// will probably want to consume the individual fields that make
// up the POST data, in this case, the value of the text field.

var querystring = require("querystring");
fs = require("fs");

function start(response) {
console.log("Request handler 'start' was called.");

var body = 	var body = 	'<html>'+
						'<head>'+
						'<meta http-equiv="Content-Type" '+
						'content="text/html; charset=UTF-8" />'+
						'</head>'+
						'<body>'+
						'<form action="/upload" enctype="multipart/form-data" '+
						'method="post">'+
						'<input type="file" name="upload" multiple="multiple">'+
						'<input type="submit" value="Upload file" />'+
						'</form>'+
						'</body>'+
						'</html>';

		response.writeHead(200, {"Content-Type": "text/html"});
		response.write(body);
		response.end();

}

//function start(response) {
	//console.log("Request handler 'start' was called.");
	
	//Normal operation
	//exec("ls -lah", function (error, stdout, stderr) 
	//{
		//response.writeHead(200, {"Content-Type": "text/plain"});
		//response.write(stdout);
		//response.end();	
	//});
	
    // TEST EXPENSIVE OPERATION
    // If you would like to prove that an expensive operation behind
    // start will no longer block requests for /upload from answering
	//expensive operation
	//exec("find /", 
		//{timeout: 10000, maxBuffer: 20000*1024},
		//function (error, stdout, stderr) {
		//response.writeHead(200, {"Content-Type": "text/plain"});
		//response.write(stdout);
		//response.end();
	//});
//}

function upload(response, request) {
	console.log("Request handler 'upload' was called.");
	//response.writeHead(200, {"Content-Type": "text/plain"});
	//response.write("Hello Upload");
	//response.write("You have sent "+ querystring.parse(postData).text);
	//response.end();
	var form = new formidable.IncomingForm();
	console.log("about to parse");

	form.parse(request, function(error, fields, files) {
	console.log("parsing done");

	/* Possible error on Windows systems:
	tried to rename to an already existing file */
	fs.rename(files.upload.path, "/tmp/test.png", function(error) {
	if (error) {
		fs.unlink("/tmp/test.png");
		fs.rename(files.upload.path, "/tmp/test.png");
		}
	});
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write("received image:<br/>");
	response.write("<img src='/show' />");
	response.end();
	});
}


// show, which will
// hardcodingly display the contents of the file /tmp/test.png

function show(response, postData) {
	console.log("Request handler 'show' was called.");
	fs.readFile("/tmp/test.png", "binary", function(error, file) {
		if (error) {
			response.writeHead(500, {"Content-Type": "text/plain"});
			response.write(error + "\n");
			response.end();
		} else {
			response.writeHead(200, {"Content-Type": "image/png"});
			response.write(file, "binary");
			response.end();
		  }
	});
}

// That’s it, we are now able to receive POST data and use it in our
// request handlers. what we pass on to the router and the
// request handlers is the complete body of our POST request.

exports.start = start;
exports.upload = upload;
exports.show  = show;