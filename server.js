const express = require('express');
const mysql = require('mysql2');
var inquirer = require('inquirer');
const PORT = process.env.PORT || 8080;
const app = express()

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: DB_USER,
    password: DB_PW,
    database: DB_NAME
})

const start = () => {
    inquirer.prompt([{
        type: 'list',
        message: "please choose an option below?",
        name: 'answer',
        choices: [
            'view employees',
            'add new employees',
            'update employee role',
            'view roles',
            'add new role',
            'view departments',
            'add new departments',
            'quit'
        ]
    }])
        .then((response) => {
            console.log(response)
            switch (response.answer) {
                case "view employees":
                    db.query(`SELECT * FROM employees;`, (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        console.table(result);
                        start();
                    });
                    break;
                case "view roles":
                    db.query(`SELECT * FROM roles;`, (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        console.table(result);
                        start();
                    });
            }
        })
}
