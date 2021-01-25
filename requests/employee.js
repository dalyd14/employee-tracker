const db = require('../db/database')

const viewAllEmployees = () => {
    return new Promise ((resolve) => {
        db.query(
            `SELECT a.id,
                    a.first_name as emp_first, 
                    a.last_name AS emp_last, 
                    title AS role, 
                    department.name AS department,
                    salary, 
                    b.first_name AS man_first, 
                    b.last_name AS man_last 
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

module.exports = {
    viewAllEmployees,
    addEmployee
}