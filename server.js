const db = require('./db/database')
const inquire = require('./inquirer/inquirerScript')

db.connect( err => {
    if (err) throw err;
    console.log(`Connected as id ${db.threadId}`)
    inquire()
})