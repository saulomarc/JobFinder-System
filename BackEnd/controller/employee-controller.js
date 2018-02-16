const mysql = require('mysql');
var sql_connection;

var username;

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '2015-01544',
	database: 'harmony',
	});

connection.connect(function(error) {
		if(error) {
			console.log("Error!");
			console.log(error);
		} else {
			console.log("Connected");
		}
});

sql_connection = connection;

exports.Get_Company_User = (req,res,next) => {
	const sql_query = 'select * from user u natural join company_user c where c.username=?';
	sql_connection.query(sql_query, [username], function(err,result) {
		if(err) {
			console.log("Error Query!");
			console.log(err);
		} else if(result == 0) {
			res.send("Username is invalid!");
		} else {
			console.log(result);
			res.send(result);
		}
	});
}

exports.Get_Jobseeker_User = (req,res,next) => {
	const sql_query = 'select * from user u natural join jobseeker_user j where j.username=?';
	sql_connection.query(sql_query, [username], function(err,result) {
		if(err) {
			console.log("Error Query!");
			console.log(err);
		} else if(result == 0) {
			res.send("Username is invalid!");
		} else {
			console.log(result);
			res.send(result);
		}
	});
}



exports.LogIn = (req,res,next) => {
	const data = {
		username: req.body.username,
		password: req.body.password
	}
	const sql_query = 'select * from admin_user where username like ?';
	sql_connection.query(sql_query, [data.username], function(err,rows,result) {
		if(err) {
			console.log("Error Query!");
			console.log(err);
		} else if(rows == 0) {
			res.send(false);
		} else {
			res.send(true);
		}
	});
}

exports.LogIn_Company = (req,res,next) => {
	const data = {
		username: req.body.username,
		password: req.body.password
	}
	username = req.body.username;
	console.log(username);
	const sql_query = 'select * from company_user where username like ?';
	sql_connection.query(sql_query, [data.username], function(err,rows,result) {
		if(err) {
			console.log("Error Query!");
			console.log(err);
		} else if(rows == 0) {
			res.send(false);
		} else {
			res.send(true);
		}
	});
}

exports.LogIn_JobSeeker = (req,res,next) => {
	const data = {
		username: req.body.username,
		password: req.body.password
	}
	username = req.body.username;
	const sql_query = 'select * from jobseeker_user where username like ?';
	sql_connection.query(sql_query, [data.username], function(err,rows,result) {
		if(err) {
			console.log("Error Query!");
			console.log(err);
		} else if(rows == 0) {
			res.send(false);
		} else {
			res.send(true);
		}
	});
}

exports.AddUser_Admin = (req, res, next) => {
	const data = {
   		username: req.body.username,
   		password: req.body.password,
   		name: req.body.name,
   		adminid: req.body.adminid
	}
	username = data.username;
	const sql_query = 'insert into user(username,password) values (?,?)';
	const sql_query2 = 'insert into admin_user(adminid,name,username) values (?,?,?)';
	sql_connection.query(sql_query, [data.username,data.password], function(err,result) {
		if(err) {
			console.log("Error Query!");
			console.log(err);
		} else {
			console.log("Added!");
		}
	});
	sql_connection.query(sql_query2, [data.adminid,data.name,data.username], function(err,result) {
		if(err) {
			console.log("Error Query!");
			console.log(err);
			res.send(false);
		} else {
			console.log("Added!");
			res.send(true);
		}
	});
}

exports.AddUser_JobSeeker = (req, res, next) => {
	const data = {
   		username: req.body.username,
   		password: req.body.password,
   		name: req.body.name,
   		jobseekerid: req.body.jobseekerid,
	}
	username = data.username;
	const sql_query = 'insert into user(username,password) values (?,?)';
	const sql_query2 = 'insert into jobseeker_user(jobseekerid,name,username) values (?,?,?)';
	sql_connection.query(sql_query, [data.username,data.password], function(err,result) {
		if(err) {
			console.log("Error Query 1!");
			console.log(err);
		} else {
			console.log("Added to USER TABLE!");
		}
	});
	sql_connection.query(sql_query2, [data.jobseekerid,data.name,data.username], function(err,result) {
		if(err) {
			console.log("Error Query 2!");
			console.log(err);
			res.send(false);
		} else {
			res.send(true);
			console.log("Added to Job Seeker USER table!");
		}
	});
}

exports.AddUser_Company = (req, res, next) => {
	const data = {
   		username: req.body.username,
   		password: req.body.password,
   		name: req.body.name,
   		cuserid: req.body.userid
	}
	username = data.username;
	const sql_query = 'insert into user(username,password) values (?,?)';
	const sql_query2 = 'insert into company_user(cuserid,name,username) values (?,?,?)';
	sql_connection.query(sql_query, [data.username,data.password], function(err,result) {
		if(err) {
			console.log("Error Query 1!");
			console.log(err);
		} else {
			console.log("Added to USER TABLE!");
		}
	});
	sql_connection.query(sql_query2, [data.cuserid,data.name,data.username], function(err,result) {
		if(err) {
			console.log("Error Query 2!");
			console.log(err);
			res.send(false);
		} else {
			console.log("Added to Company USER table!");
			res.send(true);
		}
	});
}


exports.AddCompany_Profile = (req, res, next) => {
	console.log(username);
	const data = {
		companyid: req.body.companyid,
   		name: req.body.name,
   		email: req.body.email,
   		address: req.body.address,
   		totalemployees: req.body.totalemployees,
   		primlineofbusiness: req.body.primlineofbusiness,
   		telnumber: req.body.telnumber
	}
	console.log(data);
	const sql_query1 = 'select count(name) from company_profile';
	const sql_query3 = 'insert into company_user_submits_company_profile(companyid,username) values(?,?)';
	const sql_query = 'insert into company_profile(companyid,name,email,address,totalemployees,primlineofbusiness,is_approved,date_submitted,username) values (?,?,?,?,?,?,"NO",curdate(),?)';
	const sql_query2 = 'insert into company_profile_telnumber(companyid,telnumber) values (?,?)';
	sql_connection.query(sql_query, [data.companyid,data.name,data.email,data.address,data.totalemployees,data.primlineofbusiness,username], function(err,result) {
		if(err) {
			console.log("Error Query 1!");
			console.log(err);
			res.send(false);
		} else {
			console.log("Added to Company Profile!");
			res.send(true);
			sql_connection.query(sql_query2, [data.companyid,data.telnumber], function(err,result) {
				if(err) {
					console.log("Error Query 2!");
					console.log(err);
				} else {
					console.log("Added to Company Telephone Number!");
					sql_connection.query(sql_query3, [data.companyid,username], function(err,result) {
						if(err) {
							console.log("Error Query 3!");
							console.log(err);
						} else {
							console.log("Added to Company User Submits Company Profile");
						}
					})
				}
			});
		}
	});
}

exports.EditCompany_Profile = (req, res, next) => {
	const data = {
		companyid: req.body.companyid,
   		name: req.body.name,
   		email: req.body.email,
   		address: req.body.address,
   		totalemployees: req.body.totalemployees,
   		primlineofbusiness: req.body.primlineofbusiness,
   		telnumber: req.body.telnumber
	}
	console.log(data);
	const sql_query = 'update company_profile set name=?,email=?,address=?,totalemployees=?,primlineofbusiness=? where companyid=?';
	const sql_query2 = 'update company_profile_telnumber set telnumber=? where companyid=?';
	sql_connection.query(sql_query, [data.name,data.email,data.address,data.totalemployees,data.primlineofbusiness,data.companyid], function(err,result) {
		if(err) {
			console.log("Error Query 1!");
			console.log(err);
		} else {
			console.log("Company Profile has been Edited!");
		}
	});
	sql_connection.query(sql_query2, [data.telnumber,data.companyid], function(err,result) {
		if(err) {
			console.log("Error Query 2!");
			console.log(err);
		} else {
			console.log("Company Telephone Number has been Edited!");
		}
	});
}

exports.ViewCompany_Profile = (req,res,next) => {
	const sql_query = 'select * from company_profile where username=?';
	sql_connection.query(sql_query, [username], function(err,result) {
		if(err) {
			console.log("Error Query 1!");
			console.log(err);
		} else {
			res.send(result);
		}
	});
}

exports.ViewCompanyProfile_Approved = (req,res,next) => {
	console.log(username);
	const sql_query = 'select companyid from company_profile natural join company_user_maintains_company_profile where username=?';
	sql_connection.query(sql_query,[username],function(err,result) {
		if(err) {
			console.log("Error Query 1!");
			console.log(err);
		} else {
			console.log(result);
			res.send(result);
		}
	});
}

exports.ViewAllCompany_Profile = (req,res,next) => {
	const sql_query = 'select * from company_profile where is_approved="YES"';
	sql_connection.query(sql_query, function(err,result) {
		if(err) {
			console.log("Error Query 1!");
			console.log(err);
		} else {
			console.log(result);
			res.send(result);
		}
	});
}

exports.ViewSpecCompany_Profile = (req,res,next) => {
	const data = {
		name: req.body.name
	} 
	console.log(data);
	console.log(res.body);
	const sql_query = 'select * from company_profile where is_approved="YES" and name=?';
	sql_connection.query(sql_query, [data.name],function(err,result) {
		if(err) {
			console.log("Error Query 1!");
			console.log(err);
		} else {
			console.log(result);
			res.send(result);
		}
	});
}

exports.ViewJobSeekerProfiles = (req,res,next) => {
	const sql_query = 'select * from jobseeker_profile';
	sql_connection.query(sql_query, function(err,result) {
		if(err) {
			console.log("Error Query 1!");
			console.log(err);
		} else {
			console.log(result);
			res.send(result);
		}
	});
}

exports.ViewSpecJobPost = (req,res,next) => {
	const data = {
		jobid: req.body.jobid
	}
	const sql_query = 'select * from job where jobid=?';
	sql_connection.query(sql_query, [data.jobid],function(err,result) {
		if(err) {
			console.log("Error Query 1!");
			console.log(err);
		} else {
			console.log(result);
			res.send(result);
		}
	});
}

exports.ViewJobPost = (req,res,next) => {
	const sql_query = 'select * from job where username=?';
	sql_connection.query(sql_query, [username], function(err,result) {
		if(err) {
			console.log("Error Query 1!");
			console.log(err);
		} else {
			console.log(result);
			res.send(result);
		}
	});
}

exports.JobSeekerProfile= (req,res,next) => {
	const sql_query = 'select * from jobseeker_profile where username=?';
	sql_connection.query(sql_query, [username], function(err,result) {
		if(err) {
			console.log("Error Query 1!");
			console.log(err);
		} else {
			console.log(result);
			res.send(result);
		}
	});
}

exports.Apply= (req,res,next) => {
	const data = {
		jobid: req.body.jobid,
		profileid: req.body.profileid
	}
	const sql_query = 'insert into job_jobseeker_profile(jobid,profileid) values (?,?)';
	sql_connection.query(sql_query, [data.jobid,data.profileid], function(err,result) {
		if(err) {
			console.log("Error Query 1!");
			console.log(err);
		} else {
			console.log(result);
			res.send(result);
		}
	});
}

exports.ViewAllJobPost = (req,res,next) => {
	const sql_query = 'select * from job';
	sql_connection.query(sql_query, function(err,result) {
		if(err) {
			console.log("Error Query 1!");
			console.log(err);
		} else {
			console.log(result);
			res.send(result);
		}
	});
}

exports.ListJobIDs = (req,res,next) => {
	const sql_query = 'select jobid from job where username=?';
	sql_connection.query(sql_query, [username], function(err,result) {
		if(err) {
			console.log("Error Query 1!");
			console.log(err);
		} else {
			console.log(result);
			res.send(result);
		}
	});
}

exports.ListAllJobIDs = (req,res,next) => {
	const sql_query = 'select jobid from job';
	sql_connection.query(sql_query, function(err,result) {
		if(err) {
			console.log("Error Query 1!");
			console.log(err);
		} else {
			console.log(result);
			res.send(result);
		}
	});
}

exports.AddJob = (req, res, next) => {
	console.log(username);
	const data = {
		jobid: req.body.jobid,
   		jobname: req.body.jobname,
   		jobdesc: req.body.jobdesc,
   		salary: req.body.salary,
   		companyid: req.body.companyid
	}
	console.log(data);
	const sql_query = 'insert into job(jobid,jobname,jobdesc,salary,companyid,username) values (?,?,?,?,?,?)';
	const sql_query2 = 'insert into company_user_job(jobid,username) values (?,?)';
	sql_connection.query(sql_query, [data.jobid,data.jobname,data.jobdesc,data.salary,data.companyid,username], function(err,result) {
		if(err) {
			console.log("Error Query 1!");
			console.log(err);
		} else {
			console.log("Added to Job!");
		}
	});
	sql_connection.query(sql_query2, [data.jobid,username], function(err,result) {
		if(err) {
			console.log("Error Query 2!");
			console.log(err);
			res.send(false);
		} else {
			console.log("Added to Company User Job!");
			res.send(true);
		}
	});
}

exports.EditJob = (req, res, next) => {
	const data = {
		jobid: req.body.jobid,
   		jobname: req.body.jobname,
   		jobdesc: req.body.jobdesc,
   		salary: req.body.salary
	}
	console.log(data);
	const sql_query = 'update job set jobname=?,jobdesc=?,salary=? where jobid=?';
	sql_connection.query(sql_query, [data.jobname,data.jobdesc,data.salary,data.jobid], function(err,result) {
		if(err) {
			console.log("Error Query 1!");
			console.log(err);
		} else {
			console.log("Job has been Edited!");
		}
	});
}

exports.ApproveCP = (req, res, next) => {
	console.log(username);
	const data = {
		companyid: req.body.companyid,
		username: req.body.username
	}
	console.log(data);
	const sql_query = 'update company_profile set is_approved="YES",date_approved=curdate() where companyid=?';
	const sql_query2 = 'insert into company_user_maintains_company_profile(companyid,username) values (?,?)';
	sql_connection.query(sql_query, [data.companyid], function(err,result) {
		if(err) {
			console.log("Error Query 1!");
			console.log(err);
		} else {
			console.log("Company Approved!");
		}
	});
	sql_connection.query(sql_query2, [data.companyid,data.username], function(err,result) {
		if(err) {
			console.log("Error Query 1!");
			console.log(err);
		} else {
			console.log("Added to company_user_maintains_company_profile!");
		}
	});
}

exports.AddJobSeekerProfile = (req, res, next) => {
	console.log(username);
	const data = {
		profileid: req.body.profileid,
   		name: req.body.name,
   		age: req.body.age,
   		gender: req.body.gender,
   		highesteducattainment: req.body.highesteducattainment
	}
	console.log(data);
	const sql_query = 'insert into jobseeker_profile(profileid,name,age,gender,highesteducattainment,username) values (?,?,?,?,?,?)';
	sql_connection.query(sql_query, [data.profileid,data.name,data.age,data.gender,data.highesteducattainment,username], function(err,result) {
		if(err) {
			console.log("Error Query 1!");
			console.log(err);
		} else {
			console.log("Added to JobSeeker Profile!");
		}
	});
}