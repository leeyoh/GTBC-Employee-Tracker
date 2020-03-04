const connection = require("./connection.js");

const orm = {
  connect: function(cb){
    connection.start(
      (res)=>{cb(res)}
    )
  },

  //Select a column (whatToSelect) from a table (tableInput)
   addDepartment: function(id, name,cb) {
    const queryString = 
    "INSERT INTO department (id, name) VALUES (?,?)";
    connection.query(queryString, [id, name], function (err, result) {
      if (err) {
        if(err.code == 'ER_DUP_ENTRY' || err.errno == 1062){
          cb('Duplicate')
        } 
      }
    });
  },
  addRole: function(id, title, salary, department_id,cb) {
    const queryString = "INSERT INTO role (id, title, salary, department_id) VALUES (?,?,?,?)";
    connection.query(queryString, [id, title, salary, department_id], function (err, result) {
      if (err) {
        if(err.code == 'ER_DUP_ENTRY' || err.errno == 1062){
          cb('Duplicate')
        } 
      } else {
         cb('done')
      }
    });
  },
  addEmployee: function(first_name, last_name, role_id, manager_id,cb) {
    const queryString = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)";
    connection.query(queryString, [first_name, last_name, role_id, manager_id], function (err, result) {
      console.log(result)
      if (err) {
        if(err.code == 'ER_DUP_ENTRY' || err.errno == 1062){
          cb('Duplicate')
        } else{
          cb(err)
        }
      }else{
        cb('Done')
      }
    });
  },
  viewDepartment: function(cb){
    const queryString =`SELECT id,name FROM department`;
    connection.query(queryString,[],function (err, result) {
      if (err) {
        if(err.code == 'ER_DUP_ENTRY' || err.errno == 1062){
          cb('Duplicate')
        } 
      }
      cb(result)
    });
  },
  viewEmployees: function(cb){
    const queryString =`SELECT id,first_name,last_name FROM employee`;
    connection.query(queryString,[],function (err, result) {
      if (err) {
        cb('error')
      }
      cb(result)
    });
  },
  viewBudget: function(index, cb){
    const queryString =
    `SELECT sum(salary) FROM department, employee, role 
    WHERE department.id = ? and 
          department.id = role.department_id and 
          employee.role_id = role.id`;
    connection.query(queryString,[index],function (err, result) {
      if (err) {
        if(err.code == 'ER_DUP_ENTRY' || err.errno == 1062){
          cb('Duplicate')
        } 
      }
      cb(result)
    });
  },
  viewRoles: function(cb){
    const queryString =`SELECT id,title FROM role`;
    connection.query(queryString,[],function (err, result) {
      if (err) {
        cb('error')
      }
      cb(result)
    });
  },
  updateRole: function(index, cb){
    const queryString =
    'UPDATE employee SET first_name = "test" WHERE id = ?';
    connection.query(queryString,[index],function (err, result) {
      if (err) {
        if(err.code == 'ER_DUP_ENTRY' || err.errno == 1062){
          cb('Duplicate')
        } 
      }
      cb(result)
    });
  },
//SELECT salary FROM department, employee, role WHERE department.id = 1 and department.id = role.department_id and employee.role_id = role.id; 
// /UPDATE employee SET first_name = 'test' WHERE id = 1;
};


module.exports = orm;
