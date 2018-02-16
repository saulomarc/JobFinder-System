import React, {Component} from 'react';
import {company_profile} from './NotApproved';
import {submitted_by} from './SubmittedBy';
import './CSS/Admin.css';
const request = require('request');

class Admin extends Component {
	constructor(props) {
		super(props);

		this.state={
			showToApprove: false,
			id_to_approve: 0,
			username_approve: ""
		}
		this.handleShowApprovedChange = this.handleShowApprovedChange.bind(this);
		this.handleIDToApproveChange = this.handleIDToApproveChange.bind(this);
	}

	handleShowApprovedChange(e) {
		this.setState({showToApprove: !this.state.showToApprove });
		if(this.state.showToApprove){
	  		request.post('http://localhost:3001/employees/ApproveCompanyProfile', {form: {"companyid":this.state.id_to_approve,"username":this.state.username_approve}},(error, response, body) => {
				console.log(body);
				console.log("Here");
			});
			location.href = "http://localhost:3000/admin"
		}
	}
	handleIDToApproveChange(e) {
		this.setState({id_to_approve: e.target.value});
		submitted_by.map((submit) => {
			console.log(submit.companyid);
			console.log(e.target.value);
			if(e.target.value == submit.companyid) {
				this.setState({username_approve: submit.username});
				console.log(this.state.username_approve);
			}
		})
		console.log(this.state.id_to_approve);
	}

	render() {
		return (
			<div>
				<div className="header-A">
					<ul className="list">
						<li className="elem"><h2>Harmony</h2></li>
						<li className="right-sign"><a href="http://localhost:3000" className="a"><h4>Logout</h4></a></li>
						<li className="right-sign"><a href="https://twitter.com" className="a"><h4>About</h4></a></li>
					</ul>
				</div>
				<div>
					<h2 className="credentials-AU">Welcome Admin!</h2>
				</div>
				<div className = "sidenav-AU">
					<a href="#">Delete Company Profile</a>
				    <a href="#" onClick={this.handleShowApprovedChange}>Approve Company Profile</a>
				</div>
				{this.state.showToApprove ? <ApproveCompProf closePopup={this.handleShowApprovedChange} changeHandler={this.handleIDToApproveChange}/> : null}
			</div>
		);
	}
}

export default Admin;

class ApproveCompProf extends Component {
	constructor(props) {
		super(props);

		this.state={
			company_profile:[]
		}
	}

	render() {
		return (
			<div className="tablebody">
				<div>
					<table className="comp_prof">
					<tbody>
					<tr>
						<th>Company ID</th>
						<th>Company Name</th>
						<th>Email</th>
						<th>Address</th>
						<th>Total Employees</th>
						<th>Primary Line of Business</th>
						<th>Date Submitted</th>
					</tr>
						{company_profile.map((company) => { 
								return( 
									<tr key={company.companyid}><td>{company.companyid}</td>
									<td>{company.name}</td>
									<td>{company.email}</td>
									<td>{company.address}</td>
									<td>{company.totalemployees}</td>
									<td>{company.primlineofbusiness}</td>
									<td>{company.date_submitted}</td></tr>
							)})}
					</tbody>
					</table>
				</div>
				<div>
					<IDToApprove 
					onChange={this.props.changeHandler}
					closePopup={this.props.closePopup}/>
				</div>
			</div>
		);
	}
}

class IDToApprove extends Component{
	render(){
		return(
			<div>
				<input type="text"
				className="inputCU"
				onChange = {this.props.onChange}
				placeholder = "Company ID to Approve"/>
				<button className="button loginbutton button2CU" onClick={this.props.closePopup}>Submit</button>
			</div>
		);
	}
}