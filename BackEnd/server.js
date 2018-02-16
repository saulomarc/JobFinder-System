const mysql = require('mysql');
const express = require('express');
const app = express();
const router = express.Router();

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '2015-01544',
	database: 'harmony',
});


app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  res.setHeader('Cache-Control', 'no-cache');
  next();
});

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const EmployeeRouter = require('./routes/employee-router');
app.use('/employees', EmployeeRouter);

app.get('/harmony/tables', function(req,res) {
	connection.query("select count(name) as id from company_profile;", function(error,rows,fields) {
		if(error) {
			console.log("Error in the query");
		} else {
			console.log("Successful query");
			res.send(rows);
		}
	});
})

app.get('/harmony/company_user', function(req,res) {
	connection.query("select * from company_user;", function(error,rows,fields) {
		if(error) {
			console.log("Error in the query");
		} else {
			console.log("Successful query");
			res.send(rows);
		}
	});
})

app.get('/harmony/company_profile', function(req,res) {
	connection.query("select * from company_profile;", function(error,rows,fields) {
		if(error) {
			console.log("Error in the query");
		} else {
			console.log("Successful query");
			res.send(rows);
		}
	});
})

app.get('/harmony/get-user', function(req,res) {
	connection.query("select * from user u natural join company_user c;", function(error,rows,fields) {
		if(error) {
			console.log("Error in the query");
		} else {
			console.log("Successful query");
			res.send(rows);
		}
	});
})

app.get('/harmony/companyID', function(req,res) {
	connection.query("select companyid from company_profile;", function(error,rows,fields) {
		if(error) {
			console.log("Error in the query");
		} else {
			console.log("Successful query");
			res.send(rows);
		}
	});
})

app.get('/harmony/jobID', function(req,res) {
	connection.query("select count(jobid) as id from job;", function(error,rows,fields) {
		if(error) {
			console.log("Error in the query");
		} else {
			console.log("Successful query");
			res.send(rows);
		}
	});
})

app.get('/notapproved', function(req,res) {
	connection.query("select * from company_profile where is_approved='NO';", function(error,rows,fields) {
		if(error) {
			console.log("Error in the query");
		} else {
			console.log("Successful query");
			res.send(rows);
		}
	});
})

app.get('/companyUserID', function(req,res) {
	connection.query("select count(cuserid) as cuserid from company_user;", function(error,rows,fields) {
		if(error) {
			console.log("Error in the query");
		} else {
			console.log("Successful query");
			res.send(rows);
		}
	});
})

app.get('/jobSeekerUserID', function(req,res) {
	connection.query("select count(jobseekerid) as jobseekerid from jobseeker_user;", function(error,rows,fields) {
		if(error) {
			console.log("Error in the query");
		} else {
			console.log("Successful query");
			res.send(rows);
		}
	});
})

app.get('/jobID', function(req,res) {
	connection.query("select jobid from job;", function(error,rows,fields) {
		if(error) {
			console.log("Error in the query");
		} else {
			console.log("Successful query");
			res.send(rows);
		}
	});
})

app.get('/profileID', function(req,res) {
	connection.query("select count(name) as profileID from jobseeker_profile;", function(error,rows,fields) {
		if(error) {
			console.log("Error in the query");
		} else {
			console.log("Successful query");
			res.send(rows);
		}
	});
})

app.get('/adminID', function(req,res) {
	connection.query("select count(name) as adminID from admin_user;", function(error,rows,fields) {
		if(error) {
			console.log("Error in the query");
		} else {
			console.log("Successful query");
			res.send(rows);
		}
	});
})

app.get('/submittedBy', function(req,res) {
	connection.query("select * from company_user_submits_company_profile;", function(error,rows,fields) {
		if(error) {
			console.log("Error in the query");
		} else {
			console.log("Successful query");
			res.send(rows);
		}
	});
})


app.listen(3001, (err) => {
	if(err) {console.log(err);}
	else {console.log("\nTHIS SERVER IS RUNNING AT http://localhost:3001");}
});