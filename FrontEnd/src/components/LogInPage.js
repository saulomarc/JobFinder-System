import React, {Component} from 'react';
import './CSS/LogInPage.css';
const request = require('request');

const checkError = (username,password,classification) => {
	var errorCheck = ['','', ''];
	var counter = 0;
	console.log(classification);
	if(username === ""){
		errorCheck[0] = "  Username Required!";
		counter+=1;
	}if(password === ""){
		errorCheck[1] = "  Password Required!";
		counter+=1;
	}if(classification === "") {
		errorCheck[2] = "  A Classification is needed.";
		counter+=1;
	}console.log(counter);
	if(counter===0) {
		if(classification == 1) {
			console.log("Harmony");
			request.post('http://localhost:3001/employees/Login-ADMIN', {form: {"username":username,"password":password}},(error, response, body) => {
				console.log(body);
				if(body=="true"){
					window.location.href = "http://localhost:3000/admin"
				} else {
					console.log("Invalid Username");
				}
			});
		} else if(classification == 2) {
			request.post('http://localhost:3001/employees/Login-Company', {form: {"username":username,"password":password}},(error, response, body) => {
				console.log(body);
				if(body=="true") {
					window.location.href = "http://localhost:3000/company-user";
				} else {
					console.log("WRONG!");
				}
			});
		} else if(classification == 3) {
			request.post('http://localhost:3001/employees/Login-JobSeeker', {form: {"username":username,"password":password}},(error, response, body) => {
				console.log(body);
				if(body=="true") {
					window.location.href = "http://localhost:3000/jobseeker-user";
				} else {
					console.log("WRONG!");
				}
			});
		}
	}

	return errorCheck;
}

class LogInpage extends Component {
	constructor(props) {
		super(props);

		this.state={
			username: "",
			password: "",
			classification: "",
			errorCheck: ['','','']
		}

		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleLogInChange = this.handleLogInChange.bind(this);
		this.handleAdminChange = this.handleAdminChange.bind(this);
		this.handleCompanyChange = this.handleCompanyChange.bind(this);
		this.handleJobSeekerChange = this.handleJobSeekerChange.bind(this);
	}

	handleUsernameChange(e) {
		this.setState({username: e.target.value});
	}
	handlePasswordChange(e) {
		this.setState({password: e.target.value});
	}
	handleLogInChange(e) {
		this.setState({errorCheck: checkError(this.state.username,this.state.password, this.state.classification)});
	}
	handleAdminChange(e) {
		this.setState({classification: 1});
	}
	handleCompanyChange(e) {
		this.setState({classification: 2});
	}
	handleJobSeekerChange(e) {
		this.setState({classification: 3});
	}
	
	render(){
		return(
			<div className="signuppage"> 
				<div className="header-LP">
					<ul className="list">
						<li className="elem"><h2>Harmony</h2></li>
						<li className="right"><a href="http://localhost:3000/sign-up" className="a"><h4>Sign-Up</h4></a></li>
						<li className="right"><a href="https://twitter.com" className="a"><h4>About</h4></a></li>
					</ul>
				</div>
				<div className="credentials-LP">
					<h2 className="enter">Enter Credentials:</h2>
					<UsernameInput 
					changeHandler={this.handleUsernameChange}
					placeholder = "Username"
					message={this.state.errorCheck[0]}/>
					<PasswordInput 
					changeHandler={this.handlePasswordChange}
					placeholder = "Password"
					message={this.state.errorCheck[1]}/>
					<Admin
					changeHandler={this.handleAdminChange}
					message={this.state.errorCheck[2]}/>
					<CompanyUser
					changeHandler={this.handleCompanyChange}
					message={this.state.errorCheck[2]}/>
					<JobSeekerUser
					changeHandler={this.handleJobSeekerChange}
					message={this.state.errorCheck[2]}/>
					<LoginButton 
					changeHandler={this.handleLogInChange}/>
				</div>
			</div>
		);
	}
}

export default LogInpage;

class UsernameInput extends Component{
	render(){
		return(
			<div className = "input-LP">
				<input type="text"  
				 className ="input"
				 onChange={this.props.changeHandler}
				 placeholder = {this.props.placeholder}/>
				 <label className="label">{this.props.message}</label>
			</div>
		)
	}
}

class PasswordInput extends Component{
	render(){
		return(
			<div className = "input-LP">
				<input type = "password"
				className = "input"
				onChange={this.props.changeHandler}
				placeholder = {this.props.placeholder}/>
				<label className="label">{this.props.message}</label>
			</div>
		)
	}
}

class LoginButton extends Component {
	render() {
		return(
			<div className="class">
				<button className="button loginbutton button2" onClick={this.props.changeHandler}> LOG IN </button>
			</div>
		);
	}
}

class Admin extends Component {
	render() {
		return(
			<div className="class">
				<button className="button loginbutton button2" onClick={this.props.changeHandler}> ADMIN </button>
				<label className="label">{this.props.message}</label>
			</div>
		);
	}
}

class CompanyUser extends Component {
	render() {
		return(
			<div className="class">
				<button className="button loginbutton button2" onClick={this.props.changeHandler}> Company User </button>
				<label className="label">{this.props.message}</label>
			</div>
		);
	}
}

class JobSeekerUser extends Component {
	render() {
		return(
			<div className="class">
				<button className="button loginbutton button2" onClick={this.props.changeHandler}> Job-Seeker User </button>
				<label className="label">{this.props.message}</label>
			</div>
		);
	}
}

class Header extends Component {
	render() {
		return(
			<div>
				<h2>DATABASE</h2>
			</div>
		);
	}
}
