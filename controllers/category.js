const categoryRouter = require('express').Router()
const pool = require('../utility/pool')

categoryRouter.get('/', async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM category ORDER BY id ASC')
    res.status(200).json(results.rows)
  } catch (error) {
    console.error(error)
    res.status(500).send('Error retrieving categories')
  }
})

categoryRouter.get('/:id', async (request, response) => {
  const id = parseInt(request.params.id)
  try {
    const result = await pool.query('SELECT * FROM expensesList JOIN category ON expensesList.category_Id = category.Id WHERE category.Id = $1', [id])
    response.status(200).json(result.rows)
  } catch (error) {
    console.error(error)
    response.status(500).send('Error fetching category content.')
  }
})

categoryRouter.post('/', async (request, response) => {
  const { Name } = request.body
  try {
    const result = await pool.query('INSERT INTO category (name) VALUES ($1) RETURNING *', [Name])
    response.status(201).send(`Category added with ID: ${result.rows[0].id}`)
  } catch (error) {
    console.error(error)
    response.status(500).send('Error creating category.')
  }
})

categoryRouter.post('/:id', async (request, response) => {
  const id = parseInt(request.params.id)
  const { Name } = request.body
  try {
    await pool.query('UPDATE category SET Name = $1 WHERE id = $2', [Name, id])
    response.status(200).send(`Category modified with ID: ${id}`)
  } catch (error) {
    console.error(error)
    response.status(500).send('Error updating category.')
  }
})

categoryRouter.delete('/:id', async (request, response) => {
  const id = parseInt(request.params.id)
  try {
    await pool.query('DELETE FROM category WHERE id = $1', [id])
    response.status(200).send(`category deleted with ID: ${id}`)
  } catch (error) {
    console.error(error)
    response.status(500).send('Error deleting category')
  }
})



module.exports = categoryRouter