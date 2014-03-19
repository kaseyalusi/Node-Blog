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
	last: 'Outlook',
	password: 'testpw11'
});

newUser.save();
/*
var newPost = new Post({
	title: "New Test Post",
	author_ids: [User.findOne({email: 'kasey.alusi@gmail.com'}, )]
});*/