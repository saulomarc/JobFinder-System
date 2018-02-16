import React, {Component} from 'react';
const request = require('request');
import './CSS/Employees.css'

class Employees extends Component {
	constructor(props) {
		super(props);

		this.state = {
			employees: []
		}
	}

	componentDidMount() {
		fetch('http://localhost:3001/scott/emp')
		.then((reponse) => { return reponse.json() })
		.then((result) => {
			this.setState({employees:result});
		})
		.catch((e) => {console.log(e);});
	}

	render(){
		return(
			<div className = "content">
				<h2>Employees</h2>
				<table className="employee">
				<tbody>
				<tr>
					<th>Employee Name</th>
					<th>Job</th>
					<th>Employee Number</th>
					<th>Department Number</th>
					<th>Salary</th>
				</tr>
					{ 
						this.state.employees.map((employee) => { 
							return( 
								<tr key={employee.empno}><td>{employee.ename}</td>
								<td>{employee.job}</td>
								<td>{employee.empno}</td>
								<td>{employee.deptno}</td>
								<td>{employee.sal}</td></tr>
						)})
					}
				</tbody>
				</table>
			</div>
		);
	}
}

export default Employees;