var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	User = require('./user'),
	ObjectId = Schema.ObjectId;

var PostSchema = new Schema({
	title: {type: String, required: true, index: {unique:true}},
	authors: {type: [String], required: true},
	createDate: {type: Date, required: true},
	updateDate: {type: Date, required: false},
	tldr: {type: String, required: true},
	paragraphs: {type: [String], required:true},
	tags: {type: [String], required:false}
});

module.exports = mongoose.model('Post', PostSchema);