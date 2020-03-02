INSERT INTO department (name) 
VALUES ("Sales"),("Engineering"),("Management");

INSERT INTO role (title, salary, department_id) 
VALUES("Engineer", 99999, 1);
VALUES("DevOp", 99999, 1);
VALUES("Programmer", 99999, 1);

insert into employee (first_name, last_name, role_id, manager_id)
VALUES("George", "Burdel", 1,null);
