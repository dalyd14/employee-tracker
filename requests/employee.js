const db = require('../db/database')

const viewAllEmployees = () => {
    return new Promise ((resolve) => {
        db.query(
            `SELECT a.id,
                    a.first_name, 
                    a.last_name, 
                    title, 
                    department.name AS department,
                    salary, 
                    CONCAT(b.first_name, ' ',b.last_name) AS manager
            FROM employee a
            LEFT JOIN role ON role.id = role_id
            LEFT JOIN department ON department.id = department_id
            LEFT JOIN employee b ON b.id = a.manager_id;`,
            function(err, res) {
                if (err) throw err;
                resolve(res)
            }
        )           
    })
}

const viewManagers = () => {
    return new Promise ((resolve) => {
        db.query(
            `SELECT a.manager_id, b.first_name, b.last_name
             FROM employee a
             LEFT JOIN employee b
             ON a.manager_id = b.id
             WHERE a.manager_id IS NOT NULL
             GROUP BY a.manager_id;`,
            function(err, res) {
                if (err) throw err;
                resolve(res)
            }
        )
    })
}

const viewEmployeesByManager = (manager) => {
    return new Promise ((resolve) => {
        db.query(
            `SELECT a.id,
                    a.first_name, 
                    a.last_name, 
                    title, 
                    department.name AS department,
                    salary, 
                    CONCAT(b.first_name, ' ',b.last_name) AS manager
            FROM employee a
            LEFT JOIN role ON role.id = role_id
            LEFT JOIN department ON department.id = department_id
            LEFT JOIN employee b ON b.id = a.manager_id
            WHERE a.manager_id = ?;`,
            [manager],
            function(err, res) {
                if (err) throw err;
                resolve(res)
            }
        )           
    })
}

const viewEmployeesByDepartment = (department) => {
    return new Promise ((resolve) => {
        db.query(
            `SELECT a.id,
                    a.first_name, 
                    a.last_name, 
                    title AS role, 
                    department.name AS department,
                    salary, 
                    CONCAT(b.first_name, ' ',b.last_name) AS manager
            FROM employee a
            LEFT JOIN role ON role.id = role_id
            LEFT JOIN department ON department.id = department_id
            LEFT JOIN employee b ON b.id = a.manager_id
            WHERE department.id = ?;`,
            [department],
            function(err, res) {
                if (err) throw err;
                resolve(res)
            }
        )           
    })
}

const addEmployee = (first_name, last_name, role_id, manager_id) => {
    return new Promise ((resolve) => {
        db.query(
            `INSERT INTO employee
                (first_name, last_name, role_id, manager_id)
             VALUES
                (?,?,?,?);`,
            [first_name, last_name, role_id, manager_id],
            (err, res) => {
                if (err) throw err;
                resolve(`You have successfully added ${first_name} ${last_name} as an employee.`)
            }
        )           
    })
}

const updateEmployeeRole = (employeeID, roleID) => {
    return new Promise ((resolve) => {
        db.query(
            `UPDATE employee
             SET role_id = ?
             WHERE id = ?`,
            [roleID, employeeID],
            (err, res) => {
                if (err) throw err;
                resolve(`You have successfully updated the new role.`)
            }
        )           
    })
}

const updateEmployeeManager = (employeeID, managerID) => {
    return new Promise ((resolve) => {
        db.query(
            `UPDATE employee
             SET manager_id = ?
             WHERE id = ?`,
            [managerID, employeeID],
            (err, res) => {
                if (err) throw err;
                resolve(`You have successfully updated the new manager.`)
            }
        )           
    })
}

const deleteEmployee = (employeeID) => {
    return new Promise ((resolve) => {
        db.query(
            `DELETE FROM employee
             WHERE id = ?`,
            [employeeID],
            (err, res) => {
                if (err) throw err;
                resolve(`You have successfully deleted an employee.`)  
            }
        )
    })
}

module.exports = {
    viewAllEmployees,
    addEmployee,
    updateEmployeeRole,
    updateEmployeeManager,
    viewEmployeesByManager,
    viewEmployeesByDepartment,
    viewManagers,
    deleteEmployee
}