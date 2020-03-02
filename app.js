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
		addToDB(res);
	})
}

function addToDB(answers){
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
				addDepartment(res)
			})
			break;

		default: 	
			break; 
	} 
}

function addDepartment(answers){
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
		default: 	
			break; 
	} 
}

orm.connect((res)=>{if(res == true){
	prompt();
}}); 

