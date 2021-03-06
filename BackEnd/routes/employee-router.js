const router = require('express').Router();
const EmployeeController = require('../controller/employee-controller');

router.post('/AddUser-Admin', EmployeeController.AddUser_Admin);
router.post('/AddUser-JobSeeker', EmployeeController.AddUser_JobSeeker);
router.post('/AddUser-Company', EmployeeController.AddUser_Company);
router.post('/Login-ADMIN', EmployeeController.LogIn);
router.post('/Login-Company', EmployeeController.LogIn_Company);
router.post('/Login-JobSeeker', EmployeeController.LogIn_JobSeeker);
router.post('/AddCompany-Profile', EmployeeController.AddCompany_Profile);
router.post('/EditCompany-Profile', EmployeeController.EditCompany_Profile);
router.post('/AddJob', EmployeeController.AddJob);
router.post('/EditJob', EmployeeController.EditJob);
router.post('/ApproveCompanyProfile', EmployeeController.ApproveCP);
router.post('/AddJobSeekerProfile', EmployeeController.AddJobSeekerProfile);
router.get('/ListJobIDs', EmployeeController.ListJobIDs);
router.get('/ListAllJobIDs', EmployeeController.ListAllJobIDs);
router.get('/ViewAllCompany-Profile', EmployeeController.ViewAllCompany_Profile);
router.post('/ViewSpecCompany-Profile', EmployeeController.ViewSpecCompany_Profile);
router.get('/ViewCompany-Profile', EmployeeController.ViewCompany_Profile);
router.get('/ViewCompanyProfile-Approved', EmployeeController.ViewCompanyProfile_Approved)
router.get('/ViewJobPost', EmployeeController.ViewJobPost);
router.get('/ViewJobSeekerProfiles', EmployeeController.ViewJobSeekerProfiles);
router.get('/JobSeekerProfile', EmployeeController.JobSeekerProfile);
router.post('/ViewSpecJobPost', EmployeeController.ViewSpecJobPost);
router.get('/ViewAllJobPost', EmployeeController.ViewAllJobPost);
router.get('/Get-Company-User', EmployeeController.Get_Company_User);
router.get('/Get-Jobseeker-User', EmployeeController.Get_Jobseeker_User);
router.post('/Apply', EmployeeController.Apply);
module.exports = router;