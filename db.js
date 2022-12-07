const { password } = require("pg/lib/defaults")

const Pool = require("pg").Pool

const pool = new Pool({
    user: "postgres",
    password: "eri2605859HJ",
    host: "localhost",
    port: 5432,
    database: "proyecto_assets"
});


module.exports = pool;