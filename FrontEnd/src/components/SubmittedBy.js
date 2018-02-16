fetch('http://localhost:3001/submittedBy')
.then((reponse) => { return reponse.json() })
.then((result) => {
	console.log(result);
	exports.submitted_by = result;

})
.catch((e) => {console.log(e);});
