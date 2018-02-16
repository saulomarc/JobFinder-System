import React, { Component } from 'react';
import Employees from './components/Employees';
import LogIn from './components/LogInPage'
import SignUp from './components/Sign-Up'
import SignUpForm_CU from './components/SignUpForm-Company'
import SignUpForm_JS from './components/SignUpForm-JobSeeker'
import SignUpForm_A from './components/SignUpForm-Admin'
import CompanyUser from './components/CompanyUser'
import JobSeekerUser from './components/JobseekerUser'
import AdminUser from './components/Admin'
import { BrowserRouter as Router, Route } from 'react-router-dom'; 

class App extends Component {
  render() {
    return (
      <div id = "main">
        <Router>
          <div id = "content-container">
            <Route exact={true} path = "/employees" component={Employees}/>
            <Route exact={true} path = "/sign-up" component={SignUp}/>
            <Route exact={true} path = "/sign-up-form-company" component={SignUpForm_CU}/>
            <Route exact={true} path = "/sign-up-form-job-seeker" component={SignUpForm_JS}/>
            <Route exact={true} path = "/sign-up-form-admin" component={SignUpForm_A}/>
            <Route exact={true} path = "/" component={LogIn}/>
            <Route exact={true} path = "/company-user" component={CompanyUser}/>
            <Route exact={true} path = "/admin" component={AdminUser}/>
            <Route exact={true} path = "/jobseeker-user" component={JobSeekerUser}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;