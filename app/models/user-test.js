var mongoose = require('mongoose'),
	User = require('./user');

var connStr = 'mongodb://localhost:27017/test';
mongoose.connect(connStr, function(err){
	if(err) throw err;
	console.log('Success Mongoose>Mongodb');
});

var testUser = new User({
	email: 'kasey.alusi@outlook.com',
	first: 'Kasey',
	last: 'Outlook',
	password: 'testpw11',
	test: 'Nope'
});

testUser.save(function(err){
	if(err) throw err;

	User.findOne({email: 'kasey.alusi@outlook.com'}, function(err, user){
		if(err) throw err;

		user.comparePassword('testpw11', function(err, isMatch){
			if(err) throw err;
			console.log('testpw11:', isMatch);
		});

		user.comparePassword('testpw111', function(err, isMatch){
			if(err) throw err;
			console.log('testpw111:', isMatch);
		});		
	});
});