fetch('http://localhost:3001/jobID')
.then((reponse) => { return reponse.json() })
.then((result) => {
	console.log(result);
	exports.job_id = result;
})
.catch((e) => {console.log(e);});
