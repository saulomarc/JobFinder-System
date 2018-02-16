const mysql = require('mysql');
const Schema = mysql.Schema;

const EmployeeSchema =  new Schema({
	empno: { type: Number, default: ''},
	ename: { type: String, default: ''},
	job: { type: String, default: ''},
	mgr: { type: Number, default: ''},
	hiredate: { type: Date, default: ''},
	sal: { type: Number, default: ''},
	com: { type: Number, default: ''},
	dept: { type: Number, default: ''}
});

mysql.model('Employee', EmployeeSchema);