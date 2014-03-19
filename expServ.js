var express = require('express');
var app = express();
var fs = require('fs');
	var connStr = 'mongodb://localhost:27017/test';
var ObjectId = require('mongodb').ObjectID;
var Post = require('./app/models/post.js');
var Comment = require('./app/models/comment.js');
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient
, format = require('util').format;

app.configure(function(){
	app.use(express.bodyParser());
});

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

function sendRoot(request, response){
	response.writeHead(200, {'Content-type': 'text/html'});
	fs.createReadStream("./index.html").pipe(response);
}

function sendBlogs(request, response){
	MongoClient.connect(connStr, function(err, db){
		if(err) throw err;
		var collection = db.collection('blogs');
		collection.find().toArray(function(err, results){
			if(err) throw err;
			sendJSON(response, results);
			db.close();
		});	
	});
}

function sendPosts(request, response){
	MongoClient.connect(connStr, function(err, db){
		if(err) throw err;
		var collection = db.collection('posts');
		collection.find().toArray(function(err, results){
			if(err) throw err;
			response.json(results);
		});	
	});
}

/*function sendHome(request, response){
	MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db){
		if(err) throw err;
		var collection = db.collection('posts');
		collection.find().toArray(function(err, results){
			if(err) throw err;
			sendJSON(response, results);
			db.close();
		});	
	});
}*/

function sendUsers(request, response){
	MongoClient.connect(connStr, function(err, db){
		if(err) throw err;
		var collection = db.collection('users');
		collection.find().toArray(function(err, results){
			if(err) throw err;
			sendJSON(response, results);
			db.close();
		});	
	});
}

function sendComments(request, response){
	MongoClient.connect(connStr, function(err, db){
		if(err) throw err;
		var collection = db.collection('comments');
		collection.find().toArray(function(err, results){
			if(err) throw err;
			sendJSON(response, results);
			db.close();
		});	
	});
}

function writePost(request, response){
	mongoose.connect(connStr, function(err){
		if(err) throw err;
		console.log('adding post' + request.body);
	});
	var newPost = new Post({
		title: request.body.title,
		authors: [request.body.author],
		createDate: new Date(),
		tldr: request.body.tldr,
		paragraphs: request.body.paragraphs.split("\n"),
		tags: request.body.tags.split(",")
	});
	newPost.save();
	mongoose.disconnect();
	response.json(newPost);
}

function writeComment(request, response){
	mongoose.connect(connStr, function(err){
		if(err) throw err;
		console.log('adding comment' + request.body);
	});
	var comment = request.body;
	var newComment = new Comment({
		post_id: comment.post_id,
		//need to work here once I get user auth working
		user_id: new ObjectId(),
		stance: 2,
		postDate: comment.postDate,
		text: comment.text
	});
	console.log(newComment);
	newComment.save();
	mongoose.disconnect();
	//response.json(newComment);
}

function createUser(request, response){
	console.log(request.body);
}

function getPost(request, response){
		MongoClient.connect(connStr, function(err, db){
		if(err) throw err;
		var collection = db.collection('posts');
		var id = ObjectId(request.params.postId);
		//var post = collection.findOne();
		var post = collection.find({_id:id}).toArray(function(err, results){
			if(err) throw err;
			console.log(results);
			sendJSON(response, results);
			db.close();
		});		
	});
}



app.post("/comments", writeComment);
app.get("/blogs", sendBlogs);
app.get("/posts", sendPosts);
app.get("/users", sendUsers);
app.post("/posts", writePost);
app.post("/users", createUser);
app.get("/posts/:postId", getPost);
app.get("/comments", sendComments);
app.get("/", sendRoot);
app.use('/app', express.static(__dirname + '/app'));
//app.use('/home', express.static(__dirname + '/partials'));

app.listen("3000");
console.log("Port 3000");