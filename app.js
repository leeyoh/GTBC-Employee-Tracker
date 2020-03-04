const orm = require("./config/orm.js");


let cb = function(result){
	console.log(result)
}


/*
orm.addDepartment("0","Engineering", cb);
orm.addDepartment("1","HR", cb);
orm.addDepartment("2","Management", cb);

orm.addRole("0","Systems Engineer","85000","0",cb);
orm.addRole("1","FullStack Engineer","75000","0",cb);
orm.addRole("2","DevOp","55000","0",cb);
orm.addRole("3","Quality Engineer","35000","0",cb);


orm.addEmployee("George","Burdell","0",null,cb);
orm.addEmployee("John","Burdell","1",null,cb);
orm.addEmployee("Tim","Burdell","0",null,cb);
orm.addEmployee("Josh","Burdell","3",null,cb);
orm.addEmployee("Chris","Burdell","3",null,cb);

orm.viewDepartment(function(result){
	result.forEach((res)=> {
		console.log(res.name)
	})
});


*/

var inquirer = require("inquirer");
var ui = new inquirer.ui.BottomBar();

var employeeArr = []; 


function prompt() {
	inquirer.prompt([
		{
			type: "list",
			message: "What would you like to do?",
			name: "main",
			choices: [
				"Add", 
				"View", 
				"Update", 
				"Delete"
			]
		},
	]).then(res => {
		accessDB(res);
	})
}

function accessDB(answers){
	switch(answers.main ) {
		case "Add":
			inquirer.prompt([
			{
				type: "list",
				message: "What to add?",
				name: "main",
				choices: [
					"Department", 
					"Roles", 
					"Employees"
				]
			}
			]).then(res => {
				addToDb(res)
			})
			break;
		case "View": 
			inquirer.prompt([
			{
				type: "list",
				message: "What to view?",
				name: "main",
				choices: [
					"Department", 
					"Roles", 
					"Employees"
				]
			}
			]).then(res => {
				viewDb(res)
			})
			break;	
		case "Update": 
			updateRole();
			break;
		default: 	
			break; 
	} 
}
function updateRole(){
	orm.viewEmployees((res)=>{
		var employees = []
		var viewEmp = []

		res.forEach((ele)=>{
			viewEmp.push(ele.id + ' | ' + ele.first_name + ' ' + ele.last_name)
			employees.push(ele.id)
		})
		
		inquirer.prompt([
		{
			type: "list",
			message: "Select Employee",
			name: "main",
			choices: viewEmp	
		}
		]).then((c) => {

			orm.viewRoles((res)=>{
				var roles = []
				res.forEach((ele)=>{
					roles.push(ele.id + ' | ' + ele.title)				
				})
				inquirer.prompt([
				{
					type: "list",
					name: "main",
					message: "Select New Role",
					choices: roles
				},
				]).then(res => {
					orm.updateRole(res.main.split("|")[0], (ans)=>{
						prompt();
					})
				})
			})
		})	
	})
}
function viewDb(answers){
	switch(answers.main){
		case "Department": 
			var departments = []
			orm.viewDepartment((res)=>{
				res.forEach((ele)=>{
					orm.viewBudget(ele.id, (bud)=>{
						departments.push([ele.name, bud[0]['sum(salary)']])
						if(departments.length === res.length){
							departments.forEach((ele)=>{
								console.log(ele[0] + ' | $' + ele[1]); 
							})
							prompt()
						}
					})
				})
			})
			break; 
		case "Roles":
			var departments = []
			orm.viewRoles((res)=>{
				res.forEach((ele)=>{
					console.log(ele.id + ' | '+ ele.title)
				})
				prompt()
			})
			break; 
		case "Employees": 
			orm.viewEmployees((res)=>{
				res.forEach((ele)=>{
					console.log(ele.id + ' | ' + ele.first_name + ' ' + ele.last_name)
				})
				prompt()
			})
			break; 

		default: 
			break; 
	}
}
function addToDb(answers){
	switch(answers.main ) {
		case "Department":
			inquirer.prompt([
			{
				type: "input",
				name: "id",
				message: "Department ID?"
			},
			{
				type: "input",
				name: "name",
				message: "Department Name?"
			},
			]).then(res => {
				orm.addDepartment(res.id, res.name, cb);
				prompt();
			})
			break;

		case "Roles":

			var departments = []
			orm.viewDepartment((res)=>{
				res.forEach((ele)=>{
					departments.push(ele.id + ' | '+ ele.name)
				})
				inquirer.prompt([
				{
					type: "input",
					name: "id",
					message: "Role ID?"
				},
				{
					type: "input",
					name: "title",
					message: "Role Title?"
				},
				{
					type: "input",
					name: "salary",
					message: "Role Salary?"
				},
				{
					type: "list",
					name: "dep",
					message: "Department?",
					choices: departments
				},

				]).then(r => {
					orm.addRole(r.id, r.title, r.salary, r.dep.split("|")[0],(res)=>{
						console.log(res)
						prompt();
					})
				})
			})
			break; 
		case "Employees":
			var roles = []
			orm.viewRoles((res)=>{
				res.forEach((ele)=>{
					roles.push(ele.id + ' | '+ ele.title)
				})
				inquirer.prompt([
		
				{
					type: "input",
					name: "first",
					message: "Employee First Name?"
				},
				{
					type: "input",
					name: "last",
					message: "Employee Last Name?"
				},
				{
					type: "list",
					name: "role",
					message: "Role?",
					choices: roles
				},

				]).then(r => {
					console.log(r)
					orm.addEmployee(r.first, r.last, r.role.split("|")[0],null,(res)=>{
						console.log(res)
						prompt();
					})
				})
			})
			break; 
			break; 
		default: 	
			break; 
	} 
}

orm.connect((res)=>{if(res == true){
	prompt();
}}); 

