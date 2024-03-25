const mysql = require("mysql2");

const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "",
        datbase: "employees_db"
    },
    console.log("Connected to employess_db database.")
);