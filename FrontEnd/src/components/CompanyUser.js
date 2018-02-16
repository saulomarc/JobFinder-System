import React, {Component} from 'react';
import './CSS/CompanyUser.css';
import axios from 'axios';
import {job_id} from './JobID';
import {company_id} from './CompanyID';
import {company_id_approved} from './CompanyIDApproved'
import {company_profile} from './CompanyProfile';
const request = require('request');

class CompanyUser extends Component {
	constructor(props) {
		super(props);

		this.state={
			current_user:[],
			current_user_info:[],
			company_profile:[],
			company_id: [],
			company_user: [],
			job_post: [],
			showPopup_ADDCP: false,
			showPopup_EDITCP: false,
			showPopup_VIEWCP: false,
			showPopup_ADDJP: false,
			showPopup_EDITJP: false,
			showPopup_SEARCHJP: false,
			showPopup_VIEWJP: false,
			showPopup_VIEWJSP:false,
			name: "",
			email: "",
			address: "",
			totalemployees: 0,
			primlineofbusiness: "",
			telnumber: "",
			cID: 0,
			company_id_edit: 0,
			job_name: "",
			job_desc: "",
			job_salary: 0,
			job_cID: "",
			job_id: 0,
			jobID_toFind: 0
		}
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handleAddressChange = this.handleAddressChange.bind(this);
		this.handleTotalEmpChange = this.handleTotalEmpChange.bind(this);
		this.handlePrimLineChange= this.handlePrimLineChange.bind(this);
		this.handleTelNumChange = this.handleTelNumChange.bind(this);
		this.handleCompanyEditChange =  this.handleCompanyEditChange.bind(this);
		this.handleJobNameChange = this.handleJobNameChange.bind(this);
		this.handleSalaryChange = this.handleSalaryChange.bind(this);
		this.handleJobDescChange = this.handleJobDescChange.bind(this);
		this.handleAddJob_CompanyIDChange = this.handleAddJob_CompanyIDChange.bind(this);
		this.handleEditJobIDChange = this.handleEditJobIDChange.bind(this);
		this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
	}

	componentDidMount() {
		fetch('http://localhost:3001/harmony/companyID')
		.then((reponse) => { return reponse.json() })
		.then((result) => {
			this.setState({company_id:result});
		})
		.catch((e) => {console.log(e);});

		fetch('http://localhost:3001/harmony/tables')
		.then((reponse) => { return reponse.json() })
		.then((result) => {
			console.log(result[0].id);
			this.setState({cID:result[0].id});
		})
		.catch((e) => {console.log(e);});

		fetch('http://localhost:3001/harmony/jobID')
		.then((reponse) => { return reponse.json() })
		.then((result) => {
			this.setState({job_id:result[0].id});
			console.log("fajslkdjflak");
			console.log(this.state.job_id);
		})
		.catch((e) => {console.log(e);});
		request.get('http://localhost:3001/employees/Get-Company-User', {},(error, response, body) => {
			console.log(body);
			this.setState({current_user:JSON.parse(body)});
			console.log(this.state.current_user[0].username);
		});
		request.get('http://localhost:3001/employees/ViewCompanyProfile-Approved', {},(error, response, body) => {
			this.setState({current_user_info:JSON.parse(body)});
			console.log(this.state.current_user_info);
			console.log(this.state.current_user_info[0].companyid);
		});
	}

	forceUpdateHandler(){
	    this.forceUpdate();
	};

	togglePopup_ADDCP() {
	    this.setState({showPopup_ADDCP: !this.state.showPopup_ADDCP });
	  	if(this.state.showPopup_ADDCP){
	  		request.post('http://localhost:3001/employees/AddCompany-Profile', {form: {"companyid":this.state.cID+1,"name":this.state.name,"email":this.state.email,"address":this.state.address,"totalemployees":this.state.totalemployees,"primlineofbusiness":this.state.primlineofbusiness,"telnumber":this.state.telnumber}},(error, response, body) => {
				console.log(body);
				if(body==true) {
					console.log("Account added!");
				} else {
					console.log("nope");
				}
				console.log("Here");
			});
			this.forceUpdateHandler();
			location.href = "http://localhost:3000/company-user";
		}
		fetch('http://localhost:3001/harmony/companyID')
		.then((reponse) => { return reponse.json() })
		.then((result) => {
			this.setState({company_id:result});
		})
		fetch('http://localhost:3001/harmony/tables')
		.then((reponse) => { return reponse.json() })
		.then((result) => {
			console.log(result[0].id);
			this.setState({cID:result[0].id});
		})
		.catch((e) => {console.log(e);});
  	}
  	togglePopup_EDITCP() {
	    this.setState({showPopup_EDITCP: !this.state.showPopup_EDITCP });
	    if(this.state.showPopup_EDITCP && (this.state.name != "") && (this.state.email != "") && (this.state.address != "") && (this.state.totalemployees != "") && (this.state.primlineofbusiness != "") && (this.state.telnumber != "")){
	    	request.post('http://localhost:3001/employees/EditCompany-Profile', {form: {"companyid":this.state.current_user_info[0].companyid,"name":this.state.name,"email":this.state.email,"address":this.state.address,"totalemployees":this.state.totalemployees,"primlineofbusiness":this.state.primlineofbusiness,"telnumber":this.state.telnumber}},(error, response, body) => {
				console.log(body);
				console.log("Here");
			});
			location.href = "http://localhost:3000/company-user";
	    }
	    fetch('http://localhost:3001/harmony/companyID')
		.then((reponse) => { return reponse.json() })
		.then((result) => {
			this.setState({company_id:result});
		})
  	}
  	togglePopup_VIEWCP() {
	    this.setState({showPopup_VIEWCP: !this.state.showPopup_VIEWCP});
  	}
  	togglePopup_ADDJP() {
  		console.log(this.state.showPopup_ADDJP);
  		this.setState({showPopup_ADDJP: !this.state.showPopup_ADDJP });
  		this.setState({showPopup_ADDJP: !this.state.showPopup_ADDJP });
	  	if(this.state.showPopup_ADDJP && (this.state.jobname != "") && (this.state.job_desc != "") && (this.state.job_salary != "")){
	  		request.post('http://localhost:3001/employees/AddJob', {form: {"jobid":this.state.job_id+1,"jobname":this.state.job_name,"jobdesc":this.state.job_desc,"salary":this.state.job_salary,"companyid":this.state.current_user_info[0].companyid}},(error, response, body) => {
				console.log(body);
				console.log("Here");
			});
			location.href = "http://localhost:3000/company-user";
		}
		fetch('http://localhost:3001/harmony/jobID')
		.then((reponse) => { return reponse.json() })
		.then((result) => {
			this.setState({job_id:result[0].id});
		})
		.catch((e) => {console.log(e);});
		fetch('http://localhost:3001/harmony/companyID')
		.then((reponse) => { return reponse.json() })
		.then((result) => {
			this.setState({company_id:result});
		})
		console.log(this.state.showPopup_ADDJP);
  	}
  	togglePopup_EDITJP() {
	    this.setState({showPopup_EDITJP: !this.state.showPopup_EDITJP });
	    console.log("EDIT JOB POST");
	    console.log(this.state.showPopup_EDITJP);
	    console.log(this.state.job_id,this.state.job_name,this.state.job_desc,this.state.job_salary)
	    if(this.state.showPopup_EDITJP){
	    	request.post('http://localhost:3001/employees/EditJob', {form: {"jobid":this.state.job_id,"jobname":this.state.job_name,"jobdesc":this.state.job_desc,"salary":this.state.job_salary}},(error, response, body) => {
				console.log(body);
				console.log("Here");
			});
			location.href = "http://localhost:3000/company-user";
	    }
  	}
  	togglePopup_VIEWJP() {
	    this.setState({showPopup_VIEWJP: !this.state.showPopup_VIEWJP});
  	}
  	togglePopup_SEARCHJP() {
  		this.setState({showPopup_SEARCHJP: !this.state.showPopup_SEARCHJP});
  	}
  	togglePopup_VIEWJSP() {
  		this.setState({showPopup_VIEWJSP: !this.state.showPopup_VIEWJSP});
  	}
  	handleNameChange(e) {
		this.setState({name: e.target.value});
	}
	handleEmailChange(e) {
		this.setState({email: e.target.value});
	}
	handleAddressChange(e) {
		this.setState({address: e.target.value});
	}
	handleTotalEmpChange(e) {
		this.setState({totalemployees: e.target.value});
	}
	handlePrimLineChange(e) {
		this.setState({primlineofbusiness: e.target.value});
	}
	handleTelNumChange(e) {
		this.setState({telnumber: e.target.value});
	}
	handleCompanyEditChange(e) {
		this.setState({company_id_edit: e});
		console.log(this.state.company_id_edit);
	}
	handleJobNameChange(e) {
		this.setState({job_name: e.target.value});
		console.log(e.target.value);
	}
	handleJobDescChange(e) {
		this.setState({job_desc: e.target.value});
		console.log(e.target.value);	
	}
	handleSalaryChange(e) {
		this.setState({job_salary: e.target.value});
		console.log(e.target.value);
	}
	handleAddJob_CompanyIDChange(e) {
		this.setState({job_cID: e});
		console.log(this.state.job_cID);
	}
	handleEditJobIDChange(e) {
		this.setState({job_id:e});
	}

	render() {
		return (
			<div>
				<div className="header-CU">
					<ul className="list">
						<li className="elem"><h2>Harmony</h2></li>
						<li className="right-sign"><a href="http://localhost:3000" className="a"><h4>Logout</h4></a></li>
						<li className="right-sign"><a href="https://twitter.com" className="a"><h4>About</h4></a></li>
					</ul>
				</div>
				<div>
					{this.state.current_user.map((user) => {return(<h2 className="credentials-CU" key={user.cuserid}> Welcome Company User - {user.name}</h2>)})}
				</div>	
				<div className = "sidenav-CU">
					<a href="#" onClick={this.togglePopup_ADDCP.bind(this)}>Add a Company Profile</a>
				    <a href="#" onClick={this.togglePopup_EDITCP.bind(this)}>Edit Company Profile</a>
					<a href="#" onClick={this.togglePopup_VIEWCP.bind(this)}>View Company Profile</a>
					<a href="#">Delete Company Profile</a>
					<a href="#" onClick={this.togglePopup_ADDJP.bind(this)}>Add Job Post</a>
					<a href="#" onClick={this.togglePopup_EDITJP.bind(this)}>Edit Job Post</a>
					<a href="#" onClick={this.togglePopup_SEARCHJP.bind(this)}>Search Job Post</a>
					<a href="#" onClick={this.togglePopup_VIEWJP.bind(this)}>View Job Post</a>
					<a href="#">Delete Job Post</a>
					<a href="#" onClick={this.togglePopup_VIEWJSP.bind(this)}>View JobSeeker Profile</a>
				</div>

				{this.state.showPopup_ADDCP ? <Popup_ADDCP closePopup={this.togglePopup_ADDCP.bind(this)} handleNameChange={this.handleNameChange}
				handleEmailChange={this.handleEmailChange} handleAddressChange={this.handleAddressChange} handleTotalEmpChange={this.handleTotalEmpChange} 
				handlePrimLineChange={this.handlePrimLineChange} handleTelNumChange={this.handleTelNumChange}/> : null}
				
				{this.state.showPopup_EDITCP ? <Popup_EDITCP closePopup={this.togglePopup_EDITCP.bind(this)} CompanyIDs={this.handleCompanyEditChange} handleNameChange={this.handleNameChange}
				handleEmailChange={this.handleEmailChange} handleAddressChange={this.handleAddressChange} handleTotalEmpChange={this.handleTotalEmpChange} 
				handlePrimLineChange={this.handlePrimLineChange} handleTelNumChange={this.handleTelNumChange}/> : null}
				
				{this.state.showPopup_VIEWCP ? <ShowCP closePopup={this.togglePopup_VIEWCP.bind(this)}/> : null}
				
				{this.state.showPopup_ADDJP ? <Popup_ADDJP closePopup={this.togglePopup_ADDJP.bind(this)} CompanyIDs={this.handleAddJob_CompanyIDChange} handleJobNameChange={this.handleJobNameChange}
				handleJobDescChange={this.handleJobDescChange} handleSalaryChange={this.handleSalaryChange}/> : null}

				{this.state.showPopup_EDITJP ? <Popup_EditJP closePopup={this.togglePopup_EDITJP.bind(this)} jobIDs={this.handleEditJobIDChange} handleJobNameChange={this.handleJobNameChange}
				handleJobDescChange={this.handleJobDescChange} handleSalaryChange={this.handleSalaryChange}/> : null}

				{this.state.showPopup_VIEWJP ? <ShowJobPost closePopup={this.togglePopup_VIEWJP.bind(this)}/> : null}
				{this.state.showPopup_SEARCHJP ? <ShowSpecificJobPost closePopup={this.togglePopup_SEARCHJP.bind(this)}/>:null}
				{this.state.showPopup_VIEWJSP ? <ShowJobSeekerProfiles closePopup={this.togglePopup_VIEWJSP.bind(this)}/>:null}

			</div>
		);
	}
}

export default CompanyUser;

class ShowJobSeekerProfiles extends Component {
	constructor(props) {
		super(props);

		this.state={
			jobseeker_profile:[]
		}
	}
	componentDidMount() {
		request.get('http://localhost:3001/employees/ViewJobSeekerProfiles', {},(error, response, body) => {
			this.setState({jobseeker_profile:JSON.parse(body)});
			console.log(this.state.jobseeker_profile);
		});
	}

	render() {
		return (
			<div className="tablebody">
				<div>
					<table className="comp_prof-CU">
					<tbody>
					<tr>
					<th>Profile ID</th>
					<th>JobSeeker Name</th>
					<th>Age</th>
					<th>Gender</th>
					<th>Highest Educational Attainment</th>
					</tr>
					{this.state.jobseeker_profile.map((jobseeker) => { 
							return( 
								<tr key={jobseeker.profileid}><td>{jobseeker.profileid}</td>
								<td>{jobseeker.name}</td>
								<td>{jobseeker.age}</td>
								<td>{jobseeker.gender}</td>
								<td>{jobseeker.highesteducattainment}</td></tr>
						)})}
					</tbody>
					</table>
				</div>
			</div>
		);
	}
}

class ShowSpecificJobPost extends Component {
	constructor(props) {
		super(props);

		this.state={
			job_post:[],
			jobID_toFind: ""
		}
		this.handleSearchJobChange = this.handleSearchJobChange.bind(this);
		this.handleJobIDChange = this.handleJobIDChange.bind(this);
	}

	handleSearchJobChange(e) {
		request.post('http://localhost:3001/employees//ViewSpecJobPost', {form:{"jobid":this.state.jobID_toFind}},(error, response, body) => {
			this.setState({job_post:JSON.parse(body)});
			console.log(this.state.job_post);
		});
	}
	handleJobIDChange(e) {
		this.setState({jobID_toFind:e});
	}

	render() {
		return (
			<div className="tablebody">
				<div>
					<table className="comp_prof-CU">
					<tbody>
					<tr>
						<th>Job ID</th>
						<th>Job Name</th>
						<th>Job Description</th>
						<th>Salary</th>
						<th>Company ID</th>
					</tr>
						{this.state.job_post.map((job) => { 
								return( 
									<tr key={job.jobid}><td>{job.jobid}</td>
									<td>{job.jobname}</td>
									<td>{job.jobdesc}</td>
									<td>{job.salary}</td>
									<td>{job.companyid}</td></tr>
							)})}
					</tbody>
					</table>
				</div>
				<SelectJobPostInput changeHandler={this.handleJobIDChange}/>
				<button className="button loginbutton button2CU" onClick={this.handleSearchJobChange}>Submit</button>
			</div>
		);
	}
}

class SelectJobPostInput extends Component {
	constructor(props) {
		super(props);

		this.state={
			job_post:[]
		}
	}

	componentDidMount() {
		request.get('http://localhost:3001/employees/ViewJobPost', {},(error, response, body) => {
			this.setState({job_post:JSON.parse(body)});
			console.log(this.state.job_post);
		});
	}
	render(){
		return(
			<div>
				<h5>Select Job ID:</h5>
				<select>
					<option>0</option>
					{this.state.job_post.map((ID) => {
						return(
							<option key={ID.jobid} onClick={() => this.props.changeHandler(ID.jobid)}>{ID.jobid}</option>
						)
					})}
				</select>
			</div>
		);
	}
}

class Popup_EditJP extends React.Component {
  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <h1 className="inner_header">Edit Job Post:</h1>
          <JobIDInput
          changeHandler={this.props.jobIDs}/>
          <JobInput
          changeHandler={this.props.handleJobNameChange}/>
          <JobDescInput
          changeHandler={this.props.handleJobDescChange}/>
          <JobSalaryInput
          changeHandler={this.props.handleSalaryChange}/>
        <button className="button loginbutton button2CU" onClick={this.props.closePopup}>Submit</button>
        </div>
      </div>
    );
  }
}

class JobIDInput extends Component {
	constructor(props) {
		super(props);

		this.state={
			job_id:[]
		}
	}

	componentDidMount() {
		request.get('http://localhost:3001/employees/ListJobIDs', {},(error, response, body) => {
			this.setState({job_id:JSON.parse(body)});
			console.log(this.state.job_id);
		});
	}
	render(){
		return(
			<div>
				<h5>Select Job ID:</h5>
				<select>
					<option>0</option>
					{this.state.job_id.map((ID) => {
						return(
							<option key={ID.jobid} onClick={() => this.props.changeHandler(ID.jobid)}>{ID.jobid}</option>
						)
					})}
				</select>
			</div>
		);
	}
}

class Popup_ADDJP extends React.Component {
    render() {
      return (
        <div className='popup'>
          <div className='popup_inner-CU'>
            <h1 className="inner_header-CU">Add Job Post:</h1>
            <JobInput
            changeHandler={this.props.handleJobNameChange}/>
            <JobDescInput
            changeHandler={this.props.handleJobDescChange}/>
            <JobSalaryInput
            changeHandler={this.props.handleSalaryChange}/>
          <button className="button loginbutton button2CU" onClick={this.props.closePopup}>Submit</button>
          </div>
        </div>
      );
    }
}

class ShowJobPost extends Component {
	constructor(props) {
		super(props);

		this.state={
			job_post:[]
		}
	}

	componentDidMount() {
		request.get('http://localhost:3001/employees/ViewJobPost', {},(error, response, body) => {
			this.setState({job_post:JSON.parse(body)});
			console.log(this.state.job_post);
		});
	}

	render() {
		return (
			<div className="tablebody">
				<table className="comp_prof-CU">
				<tbody>
				<tr>
					<th>Job ID</th>
					<th>Job Name</th>
					<th>Job Description</th>
					<th>Salary</th>
					<th>Company ID</th>
				</tr>
					{this.state.job_post.map((job) => { 
							return( 
								<tr key={job.jobid}><td>{job.jobid}</td>
								<td>{job.jobname}</td>
								<td>{job.jobdesc}</td>
								<td>{job.salary}</td>
								<td>{job.companyid}</td></tr>
						)})}
				</tbody>
				</table>
			</div>
		);
	}
}

class ShowCP extends Component {
	constructor(props) {
		super(props);

		this.state={
			company_profile:[]
		}
	}

	componentDidMount() {
		request.get('http://localhost:3001/employees/ViewCompany-Profile', {},(error, response, body) => {
				this.setState({company_profile:JSON.parse(body)});
		});
	}

	componentDidUpdate() {
		request.get('http://localhost:3001/employees/ViewCompany-Profile', {},(error, response, body) => {
				this.setState({company_profile:JSON.parse(body)});
		});
	}

	render() {
		return (
			<div className="tablebody">
				<table className="comp_prof-CU">
				<tbody>
				<tr>
					<th>Title</th>
					<th>Description</th>
				</tr>
					{this.state.company_profile.map((company) => { return( <tr><td>Company ID</td><td>{company.companyid}</td></tr>)})}
					{this.state.company_profile.map((company) => { return( <tr><td>Company Name</td><td>{company.name}</td></tr>)})}
					{this.state.company_profile.map((company) => { return( <tr><td>Company Email</td><td>{company.email}</td></tr>)})}
					{this.state.company_profile.map((company) => { return( <tr><td>Company Address</td><td>{company.address}</td></tr>)})}
					{this.state.company_profile.map((company) => { return( <tr><td>Total No. of Employees</td><td>{company.totalemployees}</td></tr>)})}
					{this.state.company_profile.map((company) => { return( <tr><td>Primary Line of Business</td><td>{company.primlineofbusiness}</td></tr>)})}
					{this.state.company_profile.map((company) => { return( <tr><td>Date Submitted</td><td>{company.date_submitted}</td></tr>)})}
				</tbody>
				</table>
			</div>
		);
	}
}

class Popup_EDITCP extends React.Component {
  render() {
    return (
      <div className='popup'>
        <div className='popup_inner-CU-CP'>
          <h1 className="inner_header-CU">Edit Company Profile:</h1>
          <NameInput
          changeHandler={this.props.handleNameChange}/>
          <EmailInput
          changeHandler={this.props.handleEmailChange}/>
          <AddressInput
          changeHandler={this.props.handleAddressChange}/>
          <TotalEmpInput
          changeHandler={this.props.handleTotalEmpChange}/>
          <PrimLineInput
          changeHandler={this.props.handlePrimLineChange}/>
          <TelNumInput
          changeHandler={this.props.handleTelNumChange}/>
        <button className="button loginbutton button2CU" onClick={this.props.closePopup}>Submit</button>
        </div>
      </div>
    );
  }
}

class Popup_ADDCP extends React.Component {
  render() {
    return (
      <div className='popup'>
        <div className='popup_inner-CU-CP'>
          <h1 className="inner_header-CU">Add Company Profile:</h1>
          <NameInput
          changeHandler={this.props.handleNameChange}/>
          <EmailInput
          changeHandler={this.props.handleEmailChange}/>
          <AddressInput
          changeHandler={this.props.handleAddressChange}/>
          <TotalEmpInput
          changeHandler={this.props.handleTotalEmpChange}/>
          <PrimLineInput
          changeHandler={this.props.handlePrimLineChange}/>
          <TelNumInput
          changeHandler={this.props.handleTelNumChange}/>
        <button className="button loginbutton button2CU" onClick={this.props.closePopup}>Submit</button>
        </div>
      </div>
    );
  }
}

class JobInput extends Component {
	render() {
		return(
			<div>
				<input type="text"
				className="inputCU"
				onChange = {this.props.changeHandler}
				placeholder = "Job Name"/>
				<label className="label">{this.props.message}</label>
			</div>
		)
	}
}

class JobDescInput extends Component {
	render() {
		return(
			<div>
				<input type="text"
				className="inputCU"
				onChange = {this.props.changeHandler}
				placeholder = "Job Description"/>
				<label className="label">{this.props.message}</label>
			</div>
		)
	}
}

class JobSalaryInput extends Component {
	render() {
		return(
			<div>
				<input type="text"
				className="inputCU"
				onChange = {this.props.changeHandler}
				placeholder = "Salary"/>
				<label className="label">{this.props.message}</label>
			</div>
		)
	}
}

class CompanyIDInput extends Component {
	render(){
		return(
			<div>
				<h5>Select Company ID:</h5>
				<select>
					{company_id.map((ID) => {
						return(
							<option key={ID.companyid} onClick={() => this.props.changeHandler(ID.companyid)}>{ID.companyid}</option>
						)
					})}
				</select>
			</div>
		);
	}
}

class NameInput extends Component{
	render(){
		return(
			<div>
				<input type="text"
				className="inputCU"
				onChange = {this.props.changeHandler}
				placeholder = "Company Name"/>
				<label className="label">{this.props.message}</label>
			</div>
		);
	}
}

class EmailInput extends Component{
	render(){
		return(
			<div>
				<input type="text"
				className="inputCU"
				onChange = {this.props.changeHandler}
				placeholder = "Email"/>
				<label className="label">{this.props.message}</label>
			</div>
		);
	}
}

class AddressInput extends Component{
	render(){
		return(
			<div>
				<input type="text"
				className="inputCU"
				onChange = {this.props.changeHandler}
				placeholder = "Address"/>
				<label className="label">{this.props.message}</label>
			</div>
		);
	}
}

class TotalEmpInput extends Component{
	render(){
		return(
			<div>
				<input type="text"
				className="inputCU"
				onChange = {this.props.changeHandler}
				placeholder = "Total Employees"/>
				<label className="label">{this.props.message}</label>
			</div>
		);
	}
}

class PrimLineInput extends Component{
	render(){
		return(
			<div>
				<input type="text"
				className="inputCU"
				onChange = {this.props.changeHandler}
				placeholder = "Primary Line"/>
				<label className="label">{this.props.message}</label>
			</div>
		);
	}
}

class TelNumInput extends Component{
	render(){
		return(
			<div>
				<input type="text"
				className="inputCU"
				onChange = {this.props.changeHandler}
				placeholder = "Telephone Number"/>
				<label className="label">{this.props.message}</label>
			</div>
		);
	}
}