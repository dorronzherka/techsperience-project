var mongoose = require('mongoose');

var DocumentSchema = new mongoose.Schema({
	document_number : Number,
	document_title  : String,
	document_description : String,
	document_physicalLocation : String,
	document_scannedImages : [String],
	document_author : String
});

module.exports = mongoose.model('Document',DocumentSchema);