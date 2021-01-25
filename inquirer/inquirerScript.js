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
    .then(results => {
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
                choices: results.map(result => result.name)
            }
        ])
        .then( answer => {
            const depID = results.find(result => result.name === answer.newRoleDepartment).id
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