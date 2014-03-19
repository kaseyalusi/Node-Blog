var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');

var MongoClient = require('mongodb').MongoClient
	, format = require('util').format;

//MONGO
MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db){
	if(err) throw err;
	var collection = db.collection('blogs');
	collection.find().toArray(function(err, results){
		if(err) throw err;
		console.dir(results);
		db.close();
	});
});
//helper response functions
//these are used by the specific routing functions below
function sendJSON(response, data) {
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end(JSON.stringify(data));   
}

function sendNotFound(response) {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.end('That resource does not exist!');
}

function sendError(response, e) {
    response.writeHead(500, {'Content-Type': 'application/json'});
    response.end(JSON.stringify(e));
}

//ROUTES
var routes = [
    {pattern: new RegExp('^/$'), fn: sendRoot},
    {pattern: new RegExp('^/blogs/?$'), fn: sendBlogs},
    {pattern: new RegExp('^/posts/?$'), fn: sendPosts},
    {pattern: new RegExp('^/comments/?$'), fn: sendComments},
    {pattern: new RegExp('^/users/?$'), fn: sendUsers}
];


function sendRoot(request, response){
	response.writeHead(200, {'Content-type': 'text/html'});
	fs.createReadStream("./index.html").pipe(response);
}

function sendBlogs(request, response){
	MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db){
		if(err) throw err;
		var collection = db.collection('blogs');
		collection.find().toArray(function(err, results){
			if(err) throw err;
			sendJSON(response, results);
			db.close();
		});	
	});
}

function sendPosts(){

}

function sendComments(){

}

function sendUsers(){

}


http.createServer(function(request, response){
    //parse the URL and use the path to determine which resource is being requested
    var parsedUrl = url.parse(request.url, true);
    var path = parsedUrl.path;

    //test the requested path against our various routes
    //if one matches, then call the requested function passing any
    //captures from the regular expression
    var captures;
    var route;
    var idx;
    for (idx = 0; idx < routes.length; ++idx) {
        route = routes[idx];
        captures = route.pattern.exec(path);
        if (null != captures) {
            try {
                route.fn(request, response, captures);
            }
            catch(e) {
                sendError(response, e);
            }

            return;
        } //if pattern matched
    } //for each route

    //if we got here, no route matched
    sendNotFound(response);
}).listen(3000, '127.0.0.1');
console.log('Server running at http://127.0.0.1:3000/');

