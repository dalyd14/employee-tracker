const inquirer = require("inquirer");
const cTable = require('console.table')
const requests = require('../requests/index')

// THE DEPARTMENT QUERIES
const viewDepartments = () => {
    requests.department.viewAllDepartments()
    .then(results => {
        showResults(results)
    });
}
const addDepartment = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'newDepartment',
                message: 'Enter the name of the department you would like to add.'
            }
        ])
        .then( answer => {
            requests.department.addDepartment(answer.newDepartment)
            .then(results => {
                showResults(results)
            });
        })
}

// THE ROLE QUERIES
const viewRoles = () => {
    requests.role.viewAllRoles()
    .then(results => {
        showResults(results)
    });
}
const addRole = () => {
    requests.department.viewAllDepartments()
    .then(departments => {
        inquirer
        .prompt([
            {
                type: 'input',
                name: 'newRoleName',
                message: 'Enter the name of the role you would like to add.'
            },
            {
                type: 'number',
                name: 'newRoleSalary',
                message: 'Enter the salary of the role.'
            },
            {
                type: 'list',
                name: 'newRoleDepartment',
                message: 'Select the department this role is in.',
                choices: departments.map(department => department.name)
            }
        ])
        .then( answer => {
            const depID = departments.find(department => department.name === answer.newRoleDepartment).id
            requests.role.addRole(answer.newRoleName, answer.newRoleSalary, depID)
            .then(results => {
                showResults(results)
            });
        })        
    });
}

// THE EMPLOYEE QUERIES
const viewEmployees = () => {
    requests.employee.viewAllEmployees()
    .then(results => {
        showResults(results)
    });
}
const addEmployee = () => {
    requests.role.viewAllRoles()
    .then(roles => {
        requests.employee.viewAllEmployees()
        .then(employees => {
            const possibleManagers = employees.map(employee => `${employee.emp_first} ${employee.emp_last}`)
            possibleManagers.push('None')
            inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'newEmployeeFirstName',
                    message: 'Enter the first name of the new employee.'
                },
                {
                    type: 'input',
                    name: 'newEmployeeLastName',
                    message: 'Enter the last name of the new employee.'
                },
                {
                    type: 'list',
                    name: 'newEmployeeRole',
                    message: 'Select the role that this employee has.',
                    choices: roles.map(role => role.title)
                },
                {
                    type: 'list',
                    name: 'newEmployeeManager',
                    message: 'Select a manager that this employee reports to. (Select None if they do not have a manager)',
                    choices: possibleManagers
                }
            ])
            .then( answer => {
                const roleID = roles.find(role => role.title === answer.newEmployeeRole).id
                console.log(answer.newEmployeeManager)
                const managerID = ((answer.newEmployeeManager) === 'None' ? 'NULL' : possibleManagers.indexOf(answer.newEmployeeManager)+1)
                requests.employee.addEmployee(answer.newEmployeeFirstName, answer.newEmployeeLastName, roleID, managerID)
                .then(results => {
                    showResults(results)
                });
            })        
        });    
    })
    
}

// EXITS THE PROGRAM
const exitProgram = () => {
    requests.exitProgram();
}

// CONSOLE LOGS THE RESULTS FROM THE QUERIES
const showResults = (results => {
    res = cTable.getTable(results)
    console.log('\n')
    console.log(res)
    inquire()
})

// MAIN MENU INQUIRY
const decideWhatToDo = (answer) => {
    switch (answer) {
        case 'View all Departments':
            viewDepartments()
            break;
        case 'View all Roles':
            viewRoles()
            break;
        case 'View all Employees':
            viewEmployees()
            break;
        case 'Add a Department':
            addDepartment();
            break;
        case 'Add a Role':
            addRole()
            break;
        case 'Add an Employee':
            addEmployee()
            break;
        case 'Update an Employee Role':
        
            break;
        case 'Exit':
            exitProgram()
            break;    
        default:
            console.log("Choose an option!");
            inquire()
            break;
    }
}

const mainMenu = () => {
    return new Promise ( (resolve) => {
        inquirer
            .prompt(
                {
                    type: 'list',
                    name: 'mainMenu',
                    message: 'What would you like to do?',
                    choices: [
                        'View all Departments', 
                        'View all Roles', 
                        'View all Employees', 
                        'Add a Department', 
                        'Add a Role', 
                        'Add an Employee', 
                        'Update an Employee Role',
                        'Exit'
                    ]
                }
            )
            .then( answer => {
                resolve(answer)
            })
    })
}

const inquire = () => {
    mainMenu().then(answer => {
        decideWhatToDo(answer.mainMenu)
    })
}

module.exports = inquire