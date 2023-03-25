const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const categoryRouter = require('./controllers/category')
const expensesRouter = require('./controllers/expenses')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(express.static('build'))
app.use(express.json())
app.use('/api/categories', categoryRouter)
app.use('/api/expenses', expensesRouter)

module.exports = app