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

module.exports = {
    viewAllDepartments,
    addDepartment,
    deleteDepartment
}