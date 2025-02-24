const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "samalva1926",
    host: "localhost",
    port: 3001,
    database: "library_mgmt",
});

module.exports = pool;