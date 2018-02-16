import React, {Component} from 'react';
import './CSS/Sign-Up.css';

class SignUpPage extends Component {
	render() {
		return(
			<div>
				<div className="header">
					<ul className="list">
						<li className="elem"><h2>Harmony</h2></li>
						<li className="right-sign"><a href="http://localhost:3000" className="a"><h4>Sign-In</h4></a></li>
						<li className="right-sign"><a href="https://twitter.com" className="a"><h4>About</h4></a></li>
					</ul>
				</div>
				<ChooseButtons />
			</div>
		);
	}
}

export default SignUpPage;

class ChooseButtons extends Component {
	render() {
		return(
			  <div className="middle-sign">
			  	<div>
			  		<h2>Which one are you?</h2>
			  	</div>
			  	<ul className="list">
			  		<li><a href="http://localhost:3000/sign-up-form-job-seeker" className="userbutton-sign">Job Seeker User</a></li>
			  		<li><a href="http://localhost:3000/sign-up-form-company" className="userbutton-sign">Company User</a></li>
			  		<li><a href="http://localhost:3000/sign-up-form-admin" className="userbutton-sign">ADMIN</a></li>
			  	</ul>
			  </div>
		); 
	}
}