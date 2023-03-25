//api end points to manage expense table
const expensesRouter = require('express').Router()
const pool = require('../utility/pool')

//get all expenses
expensesRouter.get('/', async (request, response , next) => {
  try {
    const results = await pool.query('SELECT * FROM expensesList ORDER BY id ASC')
    response.status(200).json(results.rows)
  } catch (error) {
    response.status(500).send('Error retrieving expenses')
    next(error)
  }
})

//get expenses by id
expensesRouter.get('/:id', async (request, response, next) => {
  const id = parseInt(request.params.id)
  try {
    const result = await pool.query('SELECT * FROM expensesList WHERE id = $1', [id])
    response.status(200).json(result.rows)
  } catch (error) {
    response.status(500).send('Error fetching expense content.')
    next(error)
  }
})

//create new expense
expensesRouter.post('/', async (request, response, next) => {
  const { expName, expdate, Cost, category_id } = request.body
  try {
    const result = await pool.query('INSERT INTO expensesList (expName, expdate, Cost, category_id) VALUES ($1, $2, $3, $4) RETURNING *', [expName, expdate, Cost, category_id])
    response.status(201).send(`Expense added with ID: ${result.rows[0].id}`)
  } catch (error) {
    response.status(500).send('Error creating expense.')
    next(error)
  }
})

//update expense
expensesRouter.put('/:id', async (request, response, next) => {
  const id = parseInt(request.params.id)
  const { expName, expdate, Cost, category_id } = request.body
  try {
    await pool.query('UPDATE expensesList SET expName = $1, expdate = $2, Cost = $3, category_id = $4  WHERE id = $5', [expName, expdate, Cost, category_id, id])
    response.status(200).send(`Expense modified with ID: ${id}`)
  } catch (error) {
    response.status(500).send('Error updating expense.')
    next(error)
  }
})

//delete expense
expensesRouter.delete('/:id', async (request, response, next) => {
  const id = parseInt(request.params.id)
  try {
    await pool.query('DELETE FROM expensesList WHERE id = $1', [id])
    response.status(200).send(`expense deleted with ID: ${id}`)
  } catch (error) {
    response.status(500).send('Error deleting expense')
    next(error)
  }
})



module.exports = expensesRouter