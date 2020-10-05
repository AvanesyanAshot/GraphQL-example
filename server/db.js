const Pool = require('pg').pool

const pool = new Pool({
    user: 'postgres',
    password: 'katalka1999',
    host: 'localhost',
    port: 5432,
    database: 'users'
})

module.exports = pool