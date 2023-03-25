//env configs
require('dotenv').config()

const PORT = process.env.PORT
const user = process.env.PGUSER
const host = process.env.PGHOST
const database = process.env.PGDATABASE
const password = process.env.PGPASSWORD
const port = process.env.PGPORT

module.exports = {
  PORT, user, host, database, password, port
}