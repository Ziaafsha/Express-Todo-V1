const mysql = require ("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "college"
});

connection.connect((err) => {
    if (err) {
      console.error("MySQL DB not connected - " + err.stack);
      return;
    }
    console.log("MySQL DB Connected");
   });
   
   
module.exports = connection;