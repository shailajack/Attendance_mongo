
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();


var AttendanceMgt = require('./routes/attendancemgt');
var attendanceMgt = new AttendanceMgt('localhost:mongodb/attendance');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/view', function(req, res){
	attendance.find({_id:req.params.id}, function(err, docs){
		if(err) res.json(err);
		else res.render('studentlist',{attendance:docs});
	});
});


app.get('/', attendanceMgt.showAttendance.bind(attendanceMgt));
app.post('/addattendance', attendanceMgt.addAttendance.bind(attendanceMgt));
app.post('/completeattendance', attendanceMgt.completeAttendance.bind(attendanceMgt));
//app.get('/studentlist', attendanceMgt.studentList.bind(attendanceMgt));

app.get('/users', user.list);

app.listen(process.env.port || 3000);