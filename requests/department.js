const db = require('../db/database')
const cTable = require('console.table')

const viewAllDepartments = () => {
    db.query(
        'SELECT * FROM department;',
        function(err, res) {
            if (err) throw err;
            res = cTable.getTable(res)
            console.log(res)
            db.end()
        }
    )   
}

module.exports = {
    viewAllDepartments,
}