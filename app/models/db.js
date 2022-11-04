const mysql = require("mysql");
const dbconfig = require("../config/dbconfig.js");

const connection = mysql.createConnection({
    host: dbconfig.HOST,
    user: dbconfig.USER,
    password: dbconfig.PASSWORD,
    database: dbconfig.DB
});

connection.connect(err => {
    if (err) {
        throw err;
    } else {
        console.log("Connected to the database!");
    }
});
module.exports = connection;