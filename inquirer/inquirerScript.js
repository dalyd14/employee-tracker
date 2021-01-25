const inquirer = require("inquirer");
const requests = require('../requests/index')


const viewDepartments = () => {
    requests.department.viewAllDepartments()
    .then(results => {
        showResults(results)
    })
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

const viewRoles = () => {
    requests.role.viewAllRoles()
    .then(results => {
        showResults(results)
    });
}

const viewEmployees = () => {
    requests.employee.viewAllEmployees()
    .then(results => {
        showResults(results)
    });
}

const exitProgram = () => {
    requests.exitProgram();
}

const showResults = (results => {
    console.log('\n')
    console.log(results)
    inquire()
})

const decideWhatToDo = (answer) => {
    switch (answer) {
        case 'View all Departments':
            viewDepartments();
            break;
        case 'View all Roles':
            viewRoles();
            break;
        case 'View all Employees':
            viewEmployees();
            break;
        case 'Add a Department':
            addDepartment();
            break;
        case 'Add a Role':
        
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