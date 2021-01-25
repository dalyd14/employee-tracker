const db = require('../db/database')
const cTable = require('console.table')

const viewAllRoles = () => {
    db.query(
        `SELECT role.id, role.title AS role, department.name AS department, role.salary 
         FROM role
         LEFT JOIN department ON role.department_id = department.id
         ORDER BY role.salary DESC;`,
        function(err, res) {
            if (err) throw err;
            res = cTable.getTable(res)
            console.log(res)
            db.end()
        }
    )   
}

module.exports = {
    viewAllRoles,
}