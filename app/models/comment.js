var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var CommentSchema = new Schema({
	user_id: {type: ObjectId, required:true},
	stance: {type: Number, required:true},
	postDate: {type: Date, required:true},
	text: {type: String, required:true},
	post_id: {type: ObjectId, required:true}
});

module.exports = mongoose.model('Comment', CommentSchema);