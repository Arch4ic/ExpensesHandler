const expensesRouter = require('express').Router()
const pool = require('../utility/pool')

expensesRouter.get('/', async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM expensesList ORDER BY id ASC')
    res.status(200).json(results.rows)
  } catch (error) {
    console.error(error)
    res.status(500).send('Error retrieving expenses')
  }
})

expensesRouter.get('/', async (request, response) => {
  const id = parseInt(request.params.id)
  try {
    const result = await pool.query('SELECT * FROM expensesList WHERE id = $1', [id])
    response.status(200).json(result.rows)
  } catch (error) {
    console.error(error)
    response.status(500).send('Error fetching expense content.')
  }
})

expensesRouter.post('/', async (request, response) => {
  const { expName, expdate, Cost, category_id } = request.body
  try {
    const result = await pool.query('INSERT INTO expensesList (expName, expdate, Cost, category_id) VALUES ($1, $2, $3, $4) RETURNING *', [expName, expdate, Cost, category_id])
    response.status(201).send(`Expense added with ID: ${result.rows[0].id}`)
  } catch (error) {
    console.error(error)
    response.status(500).send('Error creating expense.')
  }
})

expensesRouter.put('/:id', async (request, response) => {
  const id = parseInt(request.params.id)
  const { expName, expdate, Cost, category_id } = request.body
  try {
    await pool.query('UPDATE expensesList SET expName = $1, expdate = $2, Cost = $3, category_id = $4  WHERE id = $5', [expName, expdate, Cost, category_id, id])
    response.status(200).send(`Expense modified with ID: ${id}`)
  } catch (error) {
    console.error(error)
    response.status(500).send('Error updating expense.')
  }
})

expensesRouter.delete('/:id', async (request, response) => {
  const id = parseInt(request.params.id)
  try {
    await pool.query('DELETE FROM expensesList WHERE id = $1', [id])
    response.status(200).send(`expense deleted with ID: ${id}`)
  } catch (error) {
    console.error(error)
    response.status(500).send('Error deleting expense')
  }
})



module.exports = expensesRouter