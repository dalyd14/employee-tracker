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
const deleteDepartment = () => {
    requests.department.viewAllDepartments()
    .then(departments => {
        inquirer
        .prompt([
            {
                type: 'list',
                name: 'selectDepartment',
                message: 'Select a department to delete.',
                choices: departments.map(department => {
                    return {
                        name: department.name,
                        value: department.id
                    }
                })
            }
        ])
        .then( answer => {
            const departmentID = answer.selectDepartment
            requests.department.deleteDepartment(departmentID)
            .then(results => {
                showResults(results)
            });
        })
    })
}
const viewDepartmentBudgets = () => {
    requests.department.viewAllDepartments()
    .then(departments => {
        inquirer
        .prompt([
            {
                type: 'list',
                name: 'selectDepartment',
                message: 'Select a department to see budget.',
                choices: departments.map(department => {
                    return {
                        name: department.name,
                        value: department.id
                    }
                })
            }
        ])
        .then( answer => {
            const departmentID = answer.selectDepartment
            requests.department.showDepartmentBudget(departmentID)
            .then(results => {
                showResults(results)
            });
        })
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
const deleteRole = () => {
    requests.role.viewAllRoles()
    .then(roles => {
        inquirer
        .prompt([
            {
                type: 'list',
                name: 'selectRole',
                message: 'Select a role to delete.',
                choices: roles.map(role => {
                    return {
                        name: role.title,
                        value: role.id
                    }
                })
            }
        ])
        .then( answer => {
            const roleID = answer.selectRole
            requests.role.deleteRole(roleID)
            .then(results => {
                showResults(results)
            });
        })
    })
}


// THE EMPLOYEE QUERIES
const viewEmployees = () => {
    requests.employee.viewAllEmployees()
    .then(results => {
        showResults(results)
    });
}
const viewEmployeesByManager = () => {
    requests.employee.viewManagers()
    .then(managers => {
        inquirer
        .prompt([
            {
                type: 'list',
                name: 'selectManager',
                message: 'Select a manager to see their reports.',
                choices: managers.map(manager => {
                    return {
                        name: `${manager.first_name} ${manager.last_name}`,
                        value: manager.manager_id
                    }
                })
            }
        ])
        .then( answer => {
            const employeeID = answer.selectManager
            requests.employee.viewEmployeesByManager(employeeID)
            .then(results => {
                showResults(results)
            });
        })        
    });
}
const viewEmployeesByDepartment = () => {
    requests.department.viewAllDepartments()
    .then(departments => {
        inquirer
        .prompt([
            {
                type: 'list',
                name: 'selectDepartment',
                message: 'Select a department to see their employees.',
                choices: departments.map(department => {
                    return {
                        name: department.name,
                        value: department.id
                    }
                })
            }
        ])
        .then( answer => {
            const departmentID = answer.selectDepartment
            requests.employee.viewEmployeesByDepartment(departmentID)
            .then(results => {
                showResults(results)
            });
        })        
    });
}
const addEmployee = () => {
    requests.role.viewAllRoles()
    .then(roles => {
        requests.employee.viewAllEmployees()
        .then(employees => {
            const possibleManagers = employees.map(employee => `${employee.first_name} ${employee.last_name}`)
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
                const managerID = ((answer.newEmployeeManager) === 'None' ? null : possibleManagers.indexOf(answer.newEmployeeManager)+1)
                requests.employee.addEmployee(answer.newEmployeeFirstName, answer.newEmployeeLastName, roleID, managerID)
                .then(results => {
                    showResults(results)
                });
            })        
        });    
    })
}
const updateEmployeeRole = () => {
    requests.role.viewAllRoles()
    .then(roles => {
        requests.employee.viewAllEmployees()
        .then(employees => {
            const employeeOptions = employees.map(employee => `${employee.first_name} ${employee.last_name}`)
            inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'updateEmployee',
                    message: 'Select an employee to change their role.',
                    choices: employeeOptions
                }, 
                {
                    type: 'list',
                    name: 'newEmployeeRole',
                    message: 'Select the role that this employee has.',
                    choices: roles.map(role => role.title)
                }
            ])
            .then( answer => {
                const employeeID = employeeOptions.indexOf(answer.updateEmployee)+1
                const roleID = roles.find(role => role.title === answer.newEmployeeRole).id
                requests.employee.updateEmployeeRole(employeeID, roleID)
                .then(results => {
                    showResults(results)
                });
            })        
        });    
    })
}
const updateEmployeeManager = () => {
    requests.employee.viewAllEmployees()
    .then(employees => {
        const allEmployees = employees.map(employee => `${employee.first_name} ${employee.last_name}`)
        const employeeOptions = employees.map(employee => `${employee.first_name} ${employee.last_name}`)
        inquirer
        .prompt([
            {
                type: 'list',
                name: 'updateEmployee',
                message: 'Select an employee to change their manager.',
                choices: employeeOptions
            }, 
            {
                type: 'list',
                name: 'newEmployeeManager',
                message: 'Select the manager that this employee has.',
                choices: function(answers) {
                    const selectedEmployee = answers.updateEmployee
                    employeeOptions.push('None')
                    employeeOptions.splice(employeeOptions.indexOf(selectedEmployee), 1)
                    return employeeOptions
                }
            }
        ])
        .then( answer => {
            const employeeID = allEmployees.indexOf(answer.updateEmployee)+1
            const managerID = allEmployees.indexOf(answer.newEmployeeManager)+1
            requests.employee.updateEmployeeManager(employeeID, managerID)
            .then(results => {
                showResults(results)
            });
        })
    });
}
const deleteEmployee = () => {
    requests.employee.viewAllEmployees()
    .then(employees => {
        inquirer
        .prompt([
            {
                type: 'list',
                name: 'selectEmployee',
                message: 'Select an employee to delete.',
                choices: employees.map(employee => {
                    return {
                        name: `${employee.first_name} ${employee.last_name}`,
                        value: employee.id
                    }
                })
            }
        ])
        .then( answer => {
            const employeeID = answer.selectEmployee
            requests.employee.deleteEmployee(employeeID)
            .then(results => {
                showResults(results)
            });
        })
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
        case 'View Employees by Manager':
            viewEmployeesByManager()
            break;
        case 'View Employees by Department':
            viewEmployeesByDepartment()
            break;
        case 'View all Employees':
            viewEmployees()
            break;
        case 'Show Department Budgets':
            viewDepartmentBudgets()
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
            updateEmployeeRole()
            break;
        case 'Update an Employee Manager':
            updateEmployeeManager()
            break;
        case 'Delete an Employee':
            deleteEmployee()
            break;
        case 'Delete a Role':
            deleteRole()
            break;
        case 'Delete a Department':
            deleteDepartment()
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
                        'View Employees by Manager',
                        'View Employees by Department',
                        'Show Department Budgets',
                        'Add a Department', 
                        'Add a Role', 
                        'Add an Employee', 
                        'Update an Employee Role',
                        'Update an Employee Manager',
                        'Delete a Department', 
                        'Delete a Role', 
                        'Delete an Employee', 
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