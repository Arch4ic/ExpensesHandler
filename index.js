const app = require('./app')
const config = require('./utility/config')

// const db = require('./queries')


/* app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/api/categories', db.getCategories)
app.get('/api/categories/:id', db.getCategoryContentById)
app.post('/api/categories', db.createCategory)
app.put('/api/categories/:id', db.updateCategory)
app.delete('/api/categories/:id', db.deleteCategory)

app.get('/api/expenses', db.getExpenses)
app.get('/api/expenses/:id', db.getExpenseContentById)
app.post('/api/expenses', db.createExpense)
app.put('/api/expenses/:id', db.updateExpense)
app.delete('/api/expenses/:id', db.deleteExpense)
*/
app.listen(config.PORT, () => {
  console.log(`App running on port ${config.PORT}`)
})

