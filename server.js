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
    },
        console.log(`Connected to the database.`)
)

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
                case "see employees":
                    db.query(`SELECT * FROM employees;`, (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        console.table(result);
                        start();
                    });
                    break;
                case "see roles":
                    db.query(`SELECT * FROM roles;`, (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        console.table(result);
                        start();
                    });
                    break;
                case "see departments":
                    db.query(`SELECT * FROM department;`, (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        console.table(result);
                        start();
                    });
                    break;
                case "add new employees":
                    addNewEmp()
                    break;
            }
        })
}
const addNewEmp = () => {
    inquirer.prompt([{
        type: 'input',
        message: "employee first name?",
        name: 'first'
    }, {
        type: 'input',
        message: "employee last name?",
        name: 'last'

    }, {
        type: 'list',
        message: "employee role?",
        name: 'role',
        choices: [
            'sales lead',
            'salesperson',
            'lead engineer',
            'software engineer',
            'lawyer'
        ]
    }, {
        type: 'list',
        message: "employee manager?",
        name: 'manager',
        choices: [
            'john doe',
            'ash catchem',
            'max yi',
            'kimberly loud'
        ]
    },]).then(async (response) => {
        let first = response.first;
        let last = response.last;
        let role = response.role;
        let manager = response.manager;
        let roleId = await convertRoleToId(role)
        let mgrId = await convertMgrToId(manager)
        db.query(`INSERT INTO employees (first_name, last_name, roles_id, manager_id)
            VALUES
            (?,?,?,?);`, [first, last, roleId, mgrId], (err, results) => {
            if (err) throw err
            console.table(`success! you added ${first} ${last} with the role of ${role} and the manager is ${manager}`)
            start();
        })
    });
}
const convertMgrToId = (mgr) => {
    return new Promise(function (resolve, reject) {
        db.query(`SELECT * FROM employees WHERE CONCAT(first_name, ' ', last_name) LIKE '%${mgr}%';`, function (err, results) {
            if (err) throw err
            let id = results[0].id
            resolve(id);
        })
    })
}
const convertRoleToId = (role) => {
    return new Promise(function (resolve, reject) {
        db.query(`SELECT * FROM roles WHERE title LIKE '%${role}%';`, function (err, results) {
            if (err) throw err
            let id = results[0].id
            resolve(id);
        })
    })
}