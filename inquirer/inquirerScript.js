const inquirer = require("inquirer");
const requests = require('../requests/index')


const viewDepartments = () => {
    requests.department.viewAllDepartments()
}


const startInquirer = () => {
    inquirer
        .prompt([
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
                    'Update an Employee Role'
                ]
            }
        ])
        .then( answer => {
            switch (answer.mainMenu) {
                case 'View all Departments':
                    viewDepartments()
                    break;
                case 'View all Roles':
                
                    break;
                case 'View all Employees':
            
                    break;
                case 'Add a Department':
                
                    break;
                case 'Add a Role':
                
                    break;
                case 'Add an Employee':
                
                    break;
                case 'Update an Employee Role':
                
                    break;         
                default:
                    console.log("Choose an option!")
                    startInquirer()
                    break;
            }


            console.log(answer)
        })
}


module.exports = startInquirer