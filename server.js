const mysql = require('mysql2');
const inquirer = require('inquirer');
const db = require('./db/connections');
require('console.table');

//USER PROMPTS
const options = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'choices',
                message: 'Please select or enter your choice.',
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
                promptDepartment();
            }
            else if (answers.choices === 'add a role') {
                promptRole();
            }
            else if (answers.choices === 'add an employee') {
                promptEmployee();
            }
            else if (answers.choices === 'update an employee role') {
                promptEmRole();
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
promptDepartment = () => {
    inquirer.prompt ([
        { 
            type: 'input',
            name: 'departmentName',
            message: 'What is the name of the new department?'
        }
    ])
    .then ((answers) => {
        if(answers) {
            addDepartment(answers);
            // options();
        } else {
            console.log ('Please enter a new department name.');
            promptDepartment();
        }

    })
};

const addDepartment = (answers) => {
    const newDepartment = answers.departmentName;
    db.query(`INSERT INTO department (name) VALUES(?)`, newDepartment, (err, data) => {
        if(err) {
            throw err
        } else {
            // console.table(data)
            db.query(`SELECT * FROM department`,(err, data) => {
                if(err) {
                    throw err
                } else {
                    console.table(data) 
                }
        })}
        options();
    })
};

//ADD A ROLE
const promptRole = () => {
    inquirer.prompt ([
        {
            type: 'input',
            name: 'roleName',
            message: 'What is the title of the new role?',
        },
        {
            type: 'number',
            name: 'roleWage',
            message: 'What is the salary of the new role? (Please enter a number in decimal form only.)',
        },
        { 
            type: 'number',
            name: 'newDepId',
            message: 'What is the department_id of the new role? (Please enter a whole number value only)',
        },
    ])
    .then ((answers) => {
        if(answers) {
            addRole(answers);
            // console.table(data);
            // options();
        }else {
            console.log ('Please answer the prompt questions about your new role.')
            promptRole();
        }
    })
};
const addRole = (answers) => {
    const param = [answers.roleName, answers.roleWage, answers.newDepId];
    ///add code for if table exists to drop so it can reload with new values.
    db.query(`INSERT INTO role (title, salary, department_id) VALUES(?,?,?)`, param, (err,data) => {
        if(err) {
            throw err
        } else {
            viewRoles()
        }
        options();
    })
};

//ADD AN EMPLOYEE
const promptEmployee = () => {
    inquirer.prompt ([
        {
            type: 'input',
            name: 'employeeFirst',
            message: 'What is the first name of the new employee?'
        },
        {
            type: 'input',
            name: 'employeeLast',
            message: 'What is the last name of the new employee?'
        },
        {
            type: 'number',
            name: 'roleId',
            message: 'What is the role Id of the new employee? (Enter a number value only)'
        },
        {
            type: 'number',
            name: 'managerId',
            message: 'What is the manager Id of the new employee? (Enter a number value only)'
        }
    ])
    .then(answers => {
        let newEmployee = [answers.employeeFirst, answers.employeeLast, answers.roleId, answers.managerId];
        addEmployee(newEmployee);
    });
};

const addEmployee = (newEmployee) => {
    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)`, (err,data) => {
        if(err) {
            throw err
        } else {
            console.table(data)
        }
        options();
    })
};

//UPDATE AN EMPLOYEE ROLE *** Get help here!!!
const promptEmRole = () => {
    inquirer.prompt ([
        {
            type: 'list',
            name: 'employeeId',
            message: "Which employee's role do you want to update?",
            choices: () => { 
                return new Promise ((resolve,reject) => {
                    let choicesArr = [];
                    let sql = `SELECT * FROM employee`;
                    db.query(sql, (err, res) => {
                        if (err) {
                            return reject(err);
                        }
                            for (let i=0; i<res.length; i++) {
                                choicesArr.push({name: res[i].first_name+ res[i].last_name, value: res[i].id});
                            }
                            return resolve(choicesArr);
                    })
                })

            },
        },
        {
            type: 'list',
            name: 'roleId',
            message: "Please select the employee role.",
            choices: () => { 
                return new Promise ((resolve,reject) => {
                    let choicesArr = [];
                    let sql = `SELECT * FROM role`;
                    db.query(sql, (err, res) => {
                        if (err) {
                            return reject(err);
                        }
                            for (let i=0; i<res.length; i++) {
                                choicesArr.push({name: res[i].title, value: res[i].id});
                            }
                            return resolve(choicesArr);
                    })

                })
            }    
        }
        
    ])
    .then(updateEmployee);
};
const updateEmployee = (answers) => {
    console.log(answers);
    db.query("UPDATE EMPLOYEE SET role_id = ? WHERE id=? ", [answers.roleId, answers.employeeId], (err) => {
        options();
     })
}

options();