"use strict"

const request = require('request');
import React, {Component} from 'react';
import './CSS/SignUpForm.css';

const checkError = (username,password,name,adminid) => {
	var errorCheck = ['','','','']
	var counter = 0;
	if(username === ""){
		errorCheck[0] = "  Username Required!";
		counter+=1;
	}if(password === ""){
		errorCheck[1] = "  Password Required!";
		counter+=1;
	}if(name === ""){
		errorCheck[2] = "  Name Required!";
		counter+=1;
	}if(counter==0) {
		errorCheck[3] = "  Account Successfully Created!";
		request.post('http://localhost:3001/employees/AddUser-Admin', {form: {"username":username,"password":password,"name":name,"adminid":adminid+1}},(error, response, body) => {
			console.log(body);
			if(body) {
				window.location.href = "http://localhost:3000/admin";
			} else {
				console.log("Invalid Username");
			}
		});
	}
	return errorCheck;
}

class SignUpForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: "",
			password: "",
			name: "",
			adminid: 0,
			errorCheck: ['','','','']	
		}
		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleButtonChange = this.handleButtonChange.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
	}

	handleUsernameChange(e) {
		this.setState({username: e.target.value});
	}
	handlePasswordChange(e) {
		this.setState({password: e.target.value});
	}
	handleNameChange(e) {
		this.setState({name: e.target.value});
	}
	handleButtonChange(e) {
		this.setState({errorCheck: checkError(this.state.username,this.state.password,this.state.name,this.state.adminid)});
	}

	componentDidMount() {
		fetch('http://localhost:3001/adminID')
		.then((reponse) => { return reponse.json() })
		.then((result) => {
			this.setState({adminid:result[0].adminID});
			console.log(this.state.adminid);
		})
	}

	render(){
		return(
			<div>
				<div className="header">
					<ul className="list">
						<li className="elem"><h2>Harmony</h2></li>
						<li className="right"><a href="http://localhost:3000" className="a"><h4>Sign-In</h4></a></li>
						<li className="right"><a href="https://twitter.com" className="a"><h4>About</h4></a></li>
					</ul>
				</div>
				<div className="middle-form">
					<h2>Fill-up this form to proceed:</h2>
					<UsernameInput 
					changeHandler={this.handleUsernameChange}
					placeholder = "Username"
					message={this.state.errorCheck[0]}/>
					<PasswordInput 
					changeHandler={this.handlePasswordChange}
					placeholder = "Password"
					message={this.state.errorCheck[1]}/>
					<NameInput 
					changeHandler={this.handleNameChange}
					message={this.state.errorCheck[2]}/>
					<CreateAccountButton 
					clickHandler={this.handleButtonChange}
					message={this.state.errorCheck[4]}/>
				</div>
			</div>
		);
	}
}

export default SignUpForm;

class NameInput extends Component{
	render(){
		return(
			<div>
				<input type="text"
				className="input-form"
				onChange = {this.props.changeHandler}
				placeholder = "Full Name"/>
				<label className="label">{this.props.message}</label>
			</div>
		);
	}
}

class UsernameInput extends Component{
	render(){
		return(
			<div>
				<input type="text"  
				 className ="input-form"
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
			<div>
				<input type = "password"
				className = "input-form"
				onChange={this.props.changeHandler}
				placeholder = {this.props.placeholder}/>
				<label className="label">{this.props.message}</label>
			</div>
		)
	}
}

class CreateAccountButton extends Component {
	render() {
		return(
			<div>
				<button className="userbutton-form" onClick={this.props.clickHandler}> Create Account </button>
				<label className="label">{this.props.message}</label>
			</div>
		)
	}
}