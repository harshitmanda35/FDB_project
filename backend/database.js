const mysql2 = require("mysql2");
const connection = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "Harshit@1234#",
  database: "hotel_management_fdb",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }

  console.log("Connected to database");
});
module.exports = connection;