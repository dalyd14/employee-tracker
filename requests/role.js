const db = require('../db/database')

const viewAllRoles = () => {
    return new Promise ((resolve) => {
        db.query(
            `SELECT role.id, role.title, department.name AS department, role.salary 
            FROM role
            LEFT JOIN department ON role.department_id = department.id
            ORDER BY role.salary DESC;`,
            function(err, res) {
                if (err) throw err;
                resolve(res)
            }
        )
    })
}

const addRole = (title, salary, department_id) => {
    return new Promise ((resolve) => {
        db.query(
            `INSERT INTO role
                (title, salary, department_id)
            VALUES
                (?,?,?);`,
            [title, salary, department_id],
            (err, res) => {
                if (err) throw err;
                resolve(`You have successfully added the ${title} role.`)
            }
        )           
    })
}

module.exports = {
    viewAllRoles,
    addRole
}