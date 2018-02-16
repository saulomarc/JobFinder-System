fetch('http://localhost:3001/harmony/companyID')
.then((reponse) => { return reponse.json() })
.then((result) => {
	console.log(result);
	exports.company_id = result;

})
.catch((e) => {console.log(e);});
