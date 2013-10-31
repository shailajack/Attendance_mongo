var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AttendanceSchema = new Schema({
	studentName : String,
	studentEmail : String,
	studentContactNum : Number,
	enrollmentDate : String,
	totalHrs : Number,
	hrsAttended : Number,
	today : {type: Date, default: Date.now},
	present : {type: Boolean, default: false }
});

module.exports = mongoose.model('AttendanceModel', AttendanceSchema);