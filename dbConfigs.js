const mysql = require('mysql2')
require('dotenv').config()

const ApiControlsDB = () => {
    var ApiControlDB = mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        port: process.env.PORT || 3306,
        waitForConnections:true,
        multipleStatements: true,
        database: process.env.DATABASE'
    })
    return ApiControlDB
}

const ClientDB = (HOST,USER,PASSWORD,PORT,DATABASE) => {
    var ClientControlDB = mysql.createConnection({
        host: HOST,
        user: USER,
        password: PASSWORD,
        port: PORT,
        waitForConnections:true,
        multipleStatements: true,
        database: DATABASE
    })
    return ClientControlDB
}

module.exports = {ApiControlsDB,ClientDB}
