require('dotenv').config(); // carga las variables de entorno desde el archivo .env
const postgres = require('postgres')

const sql = postgres({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
})

module.exports = sql
