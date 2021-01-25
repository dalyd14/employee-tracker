const db = require('../db/database')

const viewAllDepartments = () => {
    return new Promise ((resolve) => {
        db.query(
            'SELECT * FROM department;',
            (err, res) => {
                if (err) throw err;
                resolve(res)
            }
        )           
    })
}

const addDepartment = (name) => {
    return new Promise ((resolve) => {
        db.query(
            `INSERT INTO department
                (name)
            VALUES
                (?);`,
            [name],
            (err, res) => {
                if (err) throw err;
                resolve(`You have successfully added the ${name} department.`)
            }
        )           
    })
}

const deleteDepartment = (departmentID) => {
    return new Promise ((resolve) => {
        db.query(
            `DELETE FROM department
             WHERE id = ?`,
            [departmentID],
            (err, res) => {
                if (err) throw err;
                resolve(`You have successfully deleted a department.`)  
            }
        )
    })
}

const showDepartmentBudget = (departmentID) => {
    return new Promise ((resolve) => {
        db.query(
            `SELECT department.name AS department, SUM(salary) AS budget FROM employee
             LEFT JOIN role ON role.id = role_id
             LEFT JOIN department ON department_id = department.id
             WHERE department.id = ?
             GROUP BY department.id`,
            [departmentID],
            (err, res) => {
                if (err) throw err;
                resolve(res)  
            }
        )
    })
}

module.exports = {
    viewAllDepartments,
    addDepartment,
    deleteDepartment,
    showDepartmentBudget
}