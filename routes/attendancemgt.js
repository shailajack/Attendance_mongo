var mongoose = require('mongoose');
var attendance = require('../models/attendance.js');

module.exports = AttendanceMgt;

function AttendanceMgt(connection) {
	mongoose.connect(connection);
  }

AttendanceMgt.prototype = {
	showAttendance: function(req, res) {
		attendance.find({present: false}, function
	foundAttendance(err, students) {
		res.render('index',{title: 'Student Attendance ', attendance_s:
	students})
		});
	  },
      addAttendance: function(req,res) {
		var student = req.body.student;
		newAttendance = new attendance();
		newAttendance.studentName = student.name;
		newAttendance.studentEmail = student.emailid;
		newAttendance.studentContactNum = student.contactnum;
		newAttendance.enrollmentDate = student.enrollmentdate;
		newAttendance.totalHrs = student.totalhrs;
		newAttendance.hrsAttended = student.hrsattended;
		newAttendance.save(function savedAttendance(err){
			if(err) {
				throw err;
			}
		});
		res.redirect('/');
	  },
	  completeAttendance: function(req,res) {
		var completedAttendance = req.body;
		for(attendanceId in completedAttendance) {
			if((completedAttendance[attendanceId]=='true') || (completedAttendance[attendanceId]=='false')) {
				var conditions = { _id: attendanceId };
				var updates = { present:
	completedAttendance[attendanceId] };
				attendance.update(conditions, updates, function
	updatedAttendance(err) {
					if(err) {
						throw err;
					}
				});
			}
		}
		res.redirect('/');
	}
}

