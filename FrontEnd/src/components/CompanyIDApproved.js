fetch('http://localhost:3001/harmony/companyIDApproved')
.then((reponse) => { return reponse.json() })
.then((result) => {
	console.log(result);
	exports.company_id_approved = result;

})
.catch((e) => {console.log(e);});
