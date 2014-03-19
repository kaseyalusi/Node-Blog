var mongoose = require('mongoose')
	User = require('./user'),
	Post = require('./post'),
	Comment = require('./comment');

var connStr = 'mongodb://localhost:27017/test';
mongoose.connect(connStr, function(err){
	if(err) throw err;
	console.log('Mongoose Create Data Connection');
});

var newUser = new User({
	email: 'kasey.alusi@gmail.com',
	first: 'Kasey',
	last: 'Gmail',
	password: 'testpw11'
});

newUser.save();

var newUser1 = new User({
	email: 'kasey.alusi@outlook.com',
	first: 'Kasey',
	last: 'Outlook',
	password: 'testpw12'
});

newUser1.save();


var postAuth = newUser.first + " " + newUser.last;
var newPost = new Post({
	title: "New Test Post",
	authors: [postAuth],
	createDate: new Date(),
	tldr: "Summary of new Test Post",
	paragraphs: ["Para one", "Para 2", "Para Three"],
	tags: ["test", "new", "cool"]
});

newPost.save();

var postAuth1 = newUser1.first + " " + newUser1.last;
var newPost1 = new Post({
	title: "New Test Post2",
	authors: [postAuth1],
	createDate: new Date(),
	tldr: "Summary of new Test Post",
	paragraphs: ["Para one", "Para 2", "Para Three"],
	tags: ["test", "new", "cool"]
});

newPost1.save();


/* TEST SAVE + USER ID
newPost.save(function(err){
	if(err) throw err;

	Post.findOne({author_ids: newUser._id}, function(err, post){
		if(err) throw err;
		
		console.log(post.title);	
	});
});*/

var newComment = new Comment({
	user_id: newUser1._id,
	stance: 2,
	postDate: new Date(),
	text: "Best Blog Evar!",
	post_id: newPost._id
});

newComment.save();

mongoose.disconnect();