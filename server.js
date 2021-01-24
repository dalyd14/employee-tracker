const db = require('./db/database')
const startInquirer = require('./inquirer/inquirerScript')

db.connect( err => {
    if (err) throw err;
    console.log(`Connected as id ${connection.threadId}`)

    startInquirer()
})