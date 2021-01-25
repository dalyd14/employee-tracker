const db = require('../db/database')

const employee = require('./employee')
const role = require('./role')
const department = require('./department')

const exitProgram = () => {
    db.end()
}

module.exports = {
    employee,
    role,
    department,
    exitProgram
}