fetch('http://localhost:3001/harmony/company_profile')
.then((reponse) => { return reponse.json() })
.then((result) => {
	console.log(result);
	exports.company_profile = result;

})
.catch((e) => {console.log(e);});
