const db = require('../db/database')
const cTable = require('console.table')

const viewAllEmployees = () => {
    db.query(
        `SELECT a.first_name as emp_first, 
                a.last_name AS emp_last, 
                title AS role, salary, 
                b.first_name AS man_first, 
                b.last_name AS man_last 
         FROM employee a
         LEFT JOIN role ON role.id = role_id
         LEFT JOIN employee b ON b.id = a.manager_id;`,
        function(err, res) {
            if (err) throw err;
            res = cTable.getTable(res)
            console.log(res)
            db.end()
        }
    )   
}

module.exports = {
    viewAllEmployees,
}