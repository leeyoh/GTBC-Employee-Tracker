let mysql = require("mysql");

let connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "google0709",
  database: "employee_db"
});


connection.start = (cb)=>{
  connection.connect(err => {
  if (err) {
    console.error("error connecting: " + err.stack);
    cb(false)
    return;
  }
  console.log("connected as id " + connection.threadId);
  cb(true)
});
}



module.exports = connection;
