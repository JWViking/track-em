const mysql = require('mysql2');

const db = mysql.createConnection (
    {
        host: 'localhost',
        user: 'root',
        password: 'IHatePasswords@123',
        database: 'track_em'
    }
);

module.exports = db;