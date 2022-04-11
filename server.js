const mysql = require('mysql2');
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

//USER PROMPTS
const options = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'choices',
                message: 'What would you like to select?',
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
                viewDepartments();
            } 
            else if (answers.choices === 'view all roles') {
                viewRoles();
            }
            else if (answers.choices === 'view all employees') {
                viewEmployees();
            }
            else if (answers.choices === 'add a department') {
                
                promptDepartment = () => {
                    inquirer.prompt ([
                        { 
                            type: 'input',
                            name: 'departmentName',
                            message: 'What is the name of the new department?'
                        }
                    ])
                    .then ((answers) => {
                        if(answers.departmentName) {
                            addDepartment(answers.departmentName);
                        } else {
                            console.log ('Please enter a new department name.');
                            promptDepartment();
                        }

                    })
                }
            
            }
            else if (answers.choices === 'add a role') {
                addRole();
            }
            else if (answers.choices === 'add an employee') {
                addEmployee();
            }
            else if (answers.choices === 'update an employee role') {
                updateEmployeeRole();
            }
            else {
                console.log('Please make an appropriate choice from the menu.')
            }
        });
};

//VIEW ALL DEPARTMENTS
const viewDepartments = () => {
    db.query(`SELECT * FROM department`,(err, data) => {
        if(err) {
            throw err
        } else {
            console.table(data) 
        }
        options();
    })};

//VIEW ALL ROLES
const viewRoles = () => {
    db.query(`SELECT * FROM role`, (err, data) => {
        if(err) {
            throw err
        } else {
            console.table(data)
        }
        options();
    })
}; 

//VIEW ALL EMPLOYEES
const viewEmployees = () => {
    db.query(`SELECT * FROM employee`, (err, data) => {
        if(err) {
            throw err
        } else {
            console.table(data)
        }
        options();
    })
};

//ADD A DEPARTMENT
const addDepartment = (answers.departmentName) => {
    db.query(`INSERT INTO department (department.name) VALUES(answers.departmentName)`, (err, data) => {
        if(err) {
            throw err
        } else {
            console.table(data)
        }
        options();
    })
};