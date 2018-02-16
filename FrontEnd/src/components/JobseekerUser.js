import React, {Component} from 'react';
import './CSS/JobseekerUser.css';
import {job_id} from './JobID';
const request = require('request');
import axios from 'axios';

class JobseekerUser extends Component {
	constructor(props) {
		super(props);

		this.state={
			current_user: [],
			jobseeker_user: [],
			showPopup_ADDJSP: false,
			showPopup_EDITJSP: false,
			showPopup_VIEWJSP: false,
			showPopup_DELETEJSP: false,
			showPopup_SEARCHCP: false,
			showPopup_VIEWCP: false,
			showPopup_SEARCHJP: false,
			showPopup_VIEWJP: false,
			showPopup_APPLYJ: false,
			jobseeker_name: "",
			jobseeker_age: "",
			jobseeker_gender: "",
			jobseeker_highesteducattainment: "",
			jobseeker_profileID: 0,
		}
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleAgeChange = this.handleAgeChange.bind(this);
		this.handleGenderChange = this.handleGenderChange.bind(this);
		this.handleHighestEducChange = this.handleHighestEducChange.bind(this);
		this.handleCompanyNameChange = this.handleCompanyNameChange.bind(this);
	}

	componentDidMount() {
		fetch('http://localhost:3001/profileID')
		.then((reponse) => { return reponse.json() })
		.then((result) => {
			this.setState({jobseeker_profileID:result[0].profileID});
			console.log(this.state.jobseeker_profileID);
		})
		request.get('http://localhost:3001/employees/Get-Jobseeker-User', {},(error, response, body) => {
			console.log(body);
			this.setState({current_user:JSON.parse(body)});
			console.log(this.state.current_user[0].username);
		});
	}

	togglePopup_ADDJSP() {
	    this.setState({showPopup_ADDJSP: !this.state.showPopup_ADDJSP });
	    console.log(this.state.jobseeker_name,this.state.jobseeker_age,this.state.jobseeker_gender,this.state.jobseeker_highesteducattainment);
  		console.log(this.state.showPopup_ADDJSP);
  		if(this.state.showPopup_ADDJSP){
	  		request.post('http://localhost:3001/employees/AddJobSeekerProfile', {form: {"profileid":this.state.jobseeker_profileID+1,"name":this.state.jobseeker_name,"age":this.state.jobseeker_age,"gender":this.state.jobseeker_gender,"highesteducattainment":this.state.jobseeker_highesteducattainment}},(error, response, body) => {
				console.log(body);
				console.log("Here");
			});
			location.href = "http://localhost:3000/jobseeker-user";
		}
  	}
  	togglePopup_EDITJSP() {
	    this.setState({showPopup_EDITJSP: !this.state.showPopup_EDITJSP });
  	}
  	togglePopup_VIEWCP() {
  		this.setState({showPopup_VIEWCP: !this.state.showPopup_VIEWCP});
  	}
  	togglePopup_SEARCHCP() {
  		this.setState({showPopup_SEARCHCP: !this.state.showPopup_SEARCHCP});
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
  	togglePopup_APPLYJ() {
  		this.setState({showPopup_APPLYJ: !this.state.showPopup_APPLYJ});
  	}
  	handleNameChange(e) {
		this.setState({jobseeker_name: e.target.value});
	}
	handleAgeChange(e) {
		this.setState({jobseeker_age:e.target.value});
	}
	handleGenderChange(e) {
		this.setState({jobseeker_gender: e});
	}
	handleHighestEducChange(e) {
		this.setState({jobseeker_highesteducattainment: e});
	}
	handleCompanyNameChange(e) {
		this.setState({companyprofile_name: e.target.value});
	}
  
	render() {
		return (
			<div>
				<div className="header-JU">
					<ul className="list">
						<li className="elem"><h2>Harmony</h2></li>
						<li className="right-sign"><a href="http://localhost:3000" className="a"><h4>Logout</h4></a></li>
						<li className="right-sign"><a href="https://twitter.com" className="a"><h4>About</h4></a></li>
					</ul>
				</div>
				<div>
					{this.state.current_user.map((user) => {return(<h2 className="credentials-CU"> Welcome Jobseeker User {user.name}</h2>)})}
				</div>
				<div className = "sidenav">
					<a href="#" onClick={this.togglePopup_ADDJSP.bind(this)}>Add a Jobseeker Profile</a>
				    <a href="#">Edit Jobseeker Profile</a>
					<a href="#" onClick={this.togglePopup_VIEWJSP.bind(this)}>View Jobseeker Profile</a>
					<a href="#">Delete Jobseeker Profile</a>
					<a href="#" onClick={this.togglePopup_SEARCHCP.bind(this)}>Search Company Profile</a>
					<a href="#" onClick={this.togglePopup_VIEWCP.bind(this)}>View Company Profile</a>
					<a href="#" onClick={this.togglePopup_SEARCHJP.bind(this)}>Search Job Post</a>
					<a href="#" onClick={this.togglePopup_VIEWJP.bind(this)}>View Job Post</a>
					<a href="#" onClick={this.togglePopup_APPLYJ.bind(this)}>Apply Job</a>
				</div>
				<div className="footer">
					<h4>Created by Marc Saulo</h4>
				</div>
				{this.state.showPopup_ADDJSP ? <Popup_ADDJSP text='Close Me' closePopup={this.togglePopup_ADDJSP.bind(this)} handleNameChange={this.handleNameChange} handleAgeChange={this.handleAgeChange} handleGenderChange={this.handleGenderChange} handleHighestEducChange={this.handleHighestEducChange}/> : null}
				{this.state.showPopup_VIEWCP ? <ShowCompanyProfile closePopup={this.togglePopup_VIEWCP.bind(this)}/>:null}
				{this.state.showPopup_SEARCHCP ? <ShowSpecificCompanyProfile closePopup={this.togglePopup_SEARCHCP.bind(this)}/>:null}
				{this.state.showPopup_VIEWJP ? <ShowJobPostings closePopup={this.togglePopup_VIEWJP.bind(this)}/>:null}
				{this.state.showPopup_SEARCHJP ? <ShowSpecificJobPosting closePopup={this.togglePopup_SEARCHJP.bind(this)}/>:null}
				{this.state.showPopup_VIEWJSP ? <ShowJobSeekerProfile closePopup={this.togglePopup_VIEWJSP.bind(this)}/>:null}
				{this.state.showPopup_APPLYJ ? <ApplyJob closePopup={this.togglePopup_APPLYJ.bind(this)}/>:null}
			</div>
		);
	}
}

export default JobseekerUser;


class ApplyJob extends Component {
	constructor(props) {
		super(props);

		this.state={
			job_post:[],
			jobseeker_profile: [],
			jobid_toApply: "",
			profileid_toApply: ""
		}
		this.handleApplyToAJob = this.handleApplyToAJob.bind(this);
		this.handleProfileIDToApply = this.handleProfileIDToApply.bind(this);
		this.handleApply = this.handleApply.bind(this);
	}

	componentDidMount() {
		request.get('http://localhost:3001/employees/ViewAllJobPost', {},(error, response, body) => {
			this.setState({job_post:JSON.parse(body)});
			console.log(this.state.job_post);
		});
		request.get('http://localhost:3001/employees/JobSeekerProfile', {},(error, response, body) => {
			this.setState({jobseeker_profile:JSON.parse(body)});
			console.log(this.state.jobseeker_profile);
		});
	}
	handleApplyToAJob(e) {
		this.setState({jobid_toApply:e});
	}
	handleProfileIDToApply(e) {
		this.setState({profileid_toApply:e});
	}
	handleApply(e) {
		request.post('http://localhost:3001/employees/Apply', {form:{"jobid":this.state.jobid_toApply,"profileid":this.state.profileid_toApply}},(error, response, body) => {
			console.log(body);
		});
	}

	render() {
		return (
			<div className="tablebody">
				<div>
					<h5>Select Profile ID:</h5>
					<select>
						<option>0</option>
						{this.state.jobseeker_profile.map((profile) => {
							return(
								<option key={profile.profileid} onClick={() => this.handleProfileIDToApply(profile.profileid)}>{profile.profileid}</option>
							)
						})}
					</select>
				</div>
				<div>
				<table className="comp_prof-JU">
				<tbody>
				<tr>
					<th>Job ID</th>
					<th>Job Name</th>
					<th>Job Description</th>
					<th>Salary</th>
					<th>Company ID</th>
					<th>Apply?</th>
				</tr>
					{this.state.job_post.map((job) => { 
							return( 
								<tr key={job.jobid}><td>{job.jobid}</td>
								<td>{job.jobname}</td>
								<td>{job.jobdesc}</td>
								<td>{job.salary}</td>
								<td>{job.companyid}</td>
								<td><button onClick={() => this.handleApplyToAJob(job.jobid)}>Apply</button></td></tr>
						)})}
				</tbody>
				</table>
				</div>
				<button className="button loginbutton button2CU" onClick={this.handleApply}>Apply to Jobs</button>
			</div>
		);
	}
}

class ShowJobSeekerProfile extends Component {
	constructor(props) {
		super(props);

		this.state={
			jobseeker_profile:[]
		}
	}

	componentDidMount() {
		request.get('http://localhost:3001/employees/JobSeekerProfile', {},(error, response, body) => {
			this.setState({jobseeker_profile:JSON.parse(body)});
			console.log(this.state.jobseeker_profile);
		});
	}

	render() {
		return (
			<div className="tablebody">
				<table className="comp_prof-JU">
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
		);
	}
}

class ShowSpecificCompanyProfile extends Component {
	constructor(props) {
		super(props);

		this.state={
			company_profile:[],
			companyprofile_name: ""
		}
		this.handleCompanyNameChange = this.handleCompanyNameChange.bind(this);
		this.handleSearchCompany = this.handleSearchCompany.bind(this);
	}

	handleSearchCompany(e) {
		console.log(this.state.companyprofile_name);
		request.post('http://localhost:3001/employees/ViewSpecCompany-Profile', {form: {"name":this.state.companyprofile_name}},(error, response, body) => {
			this.setState({company_profile:JSON.parse(body)});
			console.log(this.state.company_profile);
		});
	}handleCompanyNameChange(e) {
		this.setState({companyprofile_name:e.target.value});
	}

	render() {
		return (
			<div className="tablebody">
				<div>
					<table className="comp_prof-JU">
					<tbody>
					<tr>
						<th>Company ID</th>
						<th>Company Name</th>
						<th>Email</th>
						<th>Address</th>
						<th>Total Employees</th>
						<th>Primary Line of Business</th>
					</tr>
						{this.state.company_profile.map((profile) => { 
								return( 
									<tr key={profile.companyid}><td>{profile.companyid}</td>
									<td>{profile.name}</td>
									<td>{profile.email}</td>
									<td>{profile.address}</td>
									<td>{profile.totalemployees}</td>
									<td>{profile.primlineofbusiness}</td></tr>
							)})}
					</tbody>
					</table>
				</div>
				<NameInput changeHandler={this.handleCompanyNameChange}/>
				<button className="button loginbutton button2CU" onClick={this.handleSearchCompany}>Submit</button>
			</div>
		);
	}
}

class ShowSpecificJobPosting extends Component {
	constructor(props) {
		super(props);

		this.state={
			job_post:[],
			job_id: ""
		}
		this.handleSearchJob = this.handleSearchJob.bind(this);
		this.handleJobIDChange = this.handleJobIDChange.bind(this);
	}

	handleSearchJob(e) {
		console.log(this.state.job_id);
		request.post('http://localhost:3001/employees/ViewSpecJobPost', {form: {"jobid":this.state.job_id}},(error, response, body) => {
			this.setState({job_post:JSON.parse(body)});
			console.log(this.state.job_id);
		});
	}handleJobIDChange(e) {
		this.setState({job_id:e});
		console.log(this.state.job_id);
	}

	render() {
		return (
			<div className="tablebody">
				<div>
					<table className="comp_prof-JU">
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
				<JobIDInput changeHandler={this.handleJobIDChange}/>
				<button className="button loginbutton button2CU" onClick={this.handleSearchJob}>Submit</button>
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
		request.get('http://localhost:3001/employees/ListAllJobIDs', {},(error, response, body) => {
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

class ShowCompanyProfile extends Component {
	constructor(props) {
		super(props);

		this.state={
			company_profile:[]
		}
	}

	componentDidMount() {
		request.get('http://localhost:3001/employees/ViewAllCompany-Profile', {},(error, response, body) => {
			this.setState({company_profile:JSON.parse(body)});
			console.log(this.state.company_profile);
		});
	}

	render() {
		return (
			<div className="tablebody">
				<table className="comp_prof-JU">
				<tbody>
				<tr>
					<th>Company ID</th>
					<th>Company Name</th>
					<th>Email</th>
					<th>Address</th>
					<th>Total Employees</th>
					<th>Primary Line of Business</th>
				</tr>
					{this.state.company_profile.map((profile) => { 
							return( 
								<tr key={profile.companyid}><td>{profile.companyid}</td>
								<td>{profile.name}</td>
								<td>{profile.email}</td>
								<td>{profile.address}</td>
								<td>{profile.totalemployees}</td>
								<td>{profile.primlineofbusiness}</td></tr>
						)})}
				</tbody>
				</table>
			</div>
		);
	}
}

class ShowJobPostings extends Component {
	constructor(props) {
		super(props);

		this.state={
			job_post:[]
		}
	}

	componentDidMount() {
		request.get('http://localhost:3001/employees/ViewAllJobPost', {},(error, response, body) => {
			this.setState({job_post:JSON.parse(body)});
			console.log(this.state.job_post);
		});
	}

	render() {
		return (
			<div className="tablebody">
				<table className="comp_prof-JU">
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

class Popup_ADDJSP extends React.Component {
  render() {
    return (
      <div className='popup'>
        <div className='popup_inner-JS'>
          <h1 className="inner_header-JS">Add Jobseeker Profile:</h1>
          <NameInput
          changeHandler={this.props.handleNameChange}/>
	      <AgeInput 
		  changeHandler={this.props.handleAgeChange}/>
	      <GenderInput 
		  changeHandler={this.props.handleGenderChange}/>
		  <HighestEducInput 
		  changeHandler={this.props.handleHighestEducChange}/>
        <button className="button loginbutton button2CU" onClick={this.props.closePopup}>Submit</button>
        </div>
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
				placeholder = "Name"/>
				<label className="label">{this.props.message}</label>
			</div>
		);
	}
}

class AgeInput extends Component{
	render(){
		return(
			<div>
				<input type="text"
				className="inputCU"
				onChange = {this.props.changeHandler}
				placeholder = "Age"/>
				<label className="label">{this.props.message}</label>
			</div>
		);
	}
}

class GenderInput extends Component{
	render(){
		return(
			<div>
				<select className="select">
			      <option onClick={() => this.props.changeHandler("")}> Gender</option>
			      <option onClick={() => this.props.changeHandler("Male")}>Male</option>
			      <option onClick={() => this.props.changeHandler("Female")}>Female</option>
			    </select>
			</div>
		);
	}
}

class HighestEducInput extends Component{
	render(){
		return(
			<div>
			    <select className="select">
			      <option onClick={() => this.props.changeHandler("")}> Highest Educational Attainment</option>
			      <option onClick={() => this.props.changeHandler("Grade School Graduate")}>Grade School Graduate</option>
			      <option onClick={() => this.props.changeHandler("High School Graduate")}>High School Graduate</option>
			      <option onClick={() => this.props.changeHandler("College Graduate")}>College Graduate</option>
			      <option onClick={() => this.props.changeHandler("Vocational")}>Vocational</option>
			      <option onClick={() => this.props.changeHandler("Masteral Degree")}>Masteral Degree</option>
			      <option onClick={() => this.props.changeHandler("Doctorate Degree")}>Doctorate Degree</option>
			    </select>
			</div>
		);
	}
}