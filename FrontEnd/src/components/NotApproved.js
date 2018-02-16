fetch('http://localhost:3001/notapproved')
.then((reponse) => { return reponse.json() })
.then((result) => {
	console.log(result);
	exports.company_profile = result;

})
.catch((e) => {console.log(e);});
