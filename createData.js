var MongoClient = require('mongodb').MongoClient
	, format = require('util').format;
var ObjectID = require('mongodb').ObjectID;
var id = new ObjectID();
MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db){
	if(err) throw err;
	db.collection('users').insert(
	{
		_id: id,
		email: "kasey.alusi@gmail.com",
		first: "Kasey",
		last: "Alusi"
	},
	function(err, inserted){
		console.dir(inserted);
	})
	db.collection('blogs').insert({
		title: "Biohacking Blog New",
		author_ids: [id],
		desc: "Kaseys Biohacking Blog"	
	},
	function(err, inserted){
		if(err)
			console.dir(err);
		else
			console.dir(inserted);
	})
	db.collection('comments').insert({
		user_id: id,
		stance: 2,
		postDate: new Date(),
		text: "I love this blog so much!"
	},
	function(err, inserted){
		if(err)
			console.dir(err);
		else
			console.dir(inserted);
	})
	db.collection('posts').insert({
		_id: "test2",
		blog_id: "biohack",
		title: "Second Test Post",
		author_ids: id,
		createDate: new Date(),
		updateDate: new Date(),
		tldr: "Summary of this post",
		paragraphs: ["This is paragraph one", "This is paragraph 2", "This is paragraph 3"],
		tags: ["biohack", "ketosis", "sleep", "MCT", "Grassfed Butter"]
	},
	function(err, inserted){
		if(err)
			console.dir(err);
		else
			console.dir(inserted);
		db.close();
	})
});
/*
db.blogs.insert(
		{
			_id: "biohack",
			title: "Biohacking Blog",
			authors: ["Kasey Alusi"],
			desc: "A Blog about Biohacking!"
		}
	)


db.posts.insert(
	{
		_id: "test2",
		blog_id: "biohack",
		title: "Second Test Post",
		authors: "Kasey Alusi",
		createDate: new Date(),
		updateDate: new Date(),
		tldr: "Summary of this post",
		paragraphs: ["This is paragraph one", "This is paragraph 2", "This is paragraph 3"],
		tags: ["biohack", "ketosis", "sleep", "MCT", "Grassfed Butter"]
	}
)

db.comments.insert(
	{
		_id: ObjectId(),
		user_id: "billy21",
		stance: 2,
		postDate: new Date()
	}
)

db.users.insert(
	{
		_id: "billy21",
		email: "billy@21.com",
		first: "Billy",
		last: "Joe"
	}
)

db.posts.update(
	{ _id: "test1"},
	{$set: {tags: ["biohack", "autophagy"]}},
	{multi: false}
)
*/