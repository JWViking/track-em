const mysql = require('msql2');
const inquirer = require('inquirer');
require('console.table');

const db = mysql.createConnection (
    {
        host: 'localhost',
        user: 'root',
        password: 'IHatePasswords@123',
        database: 'track_em'
    }
);

const options = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'choices',
                message: 'What would you like to access?',
                choices: [
                    'view all departments',
                    'view all roles',
                    'view all employees',
                    'add a department',
                    'add a role',
                    'add an employee',
                    'update an employee role'
                ]
            }
        ])
        .then ((answers) => {
            if (answers.choices === 'view all departments') {

            }
        })
}

const viewDepartments = () => {
    db.query(`SELECT * FROM DEPARTMENT`,(err, data) => {
        if(err) {
            throw err
        } else {
            console.table(data) 
        }
        options();
    })};