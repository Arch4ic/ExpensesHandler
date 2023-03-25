//file that bring app together
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const middleware = require('./utility/middleware')

const categoryRouter = require('./controllers/category')
const expensesRouter = require('./controllers/expenses')

const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./swagger.yaml')

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

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(middleware.unkownEndpoint)
app.use(middleware.errorHandler)
module.exports = app