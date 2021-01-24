const db = require('../db/database')

const viewAllDepartments = () => {
    const query = db.query(
        'SELECT * FROM departments;',
        function(err, res) {
            if (err) throw err;
            console.log(res)
            db.end()
        }
    )   
}

module.exports = {
    viewAllDepartments,
}