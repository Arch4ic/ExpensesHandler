//api endpoint to manage category table
const categoryRouter = require('express').Router()
const pool = require('../utility/pool')


//get all categories
categoryRouter.get('/', async (request, response, next) => {
  try {
    const results = await pool.query('SELECT * FROM category ORDER BY id ASC')
    response.status(200).json(results.rows)
  } catch (error) {
    response.status(500).send('Error retrieving categories')
    next(error)
  }
})


//get all expenses that belongs to this category
categoryRouter.get('/:id', async (request, response, next) => {
  const id = parseInt(request.params.id)
  try {
    const result = await pool.query('SELECT * FROM expensesList JOIN category ON expensesList.category_Id = category.Id WHERE category.Id = $1', [id])
    response.status(200).json(result.rows)
  } catch (error) {
    response.status(500).send('Error fetching category content.')
    next(error)
  }
})

//creating new category
categoryRouter.post('/', async (request, response, next) => {
  const { Name } = request.body
  try {
    const result = await pool.query('INSERT INTO category (name) VALUES ($1) RETURNING *', [Name])
    response.status(201).send(`Category added with ID: ${result.rows[0].id}`)
  } catch (error) {
    response.status(500).send('Error creating category.')
    next(error)
  }
})

//updating category
categoryRouter.put('/:id', async (request, response, next) => {
  const id = parseInt(request.params.id)
  const { Name } = request.body
  try {
    await pool.query('UPDATE category SET Name = $1 WHERE id = $2', [Name, id])
    response.status(200).send(`Category modified with ID: ${id}`)
  } catch (error) {
    response.status(500).send('Error updating category.')
    next(error)
  }
})


//deleting category by id
categoryRouter.delete('/:id', async (request, response, next) => {
  const id = parseInt(request.params.id)
  try {
    await pool.query('DELETE FROM category WHERE id = $1', [id])
    response.status(200).send(`category deleted with ID: ${id}`)
  } catch (error) {
    response.status(500).send('Error deleting category')
    next(error)
  }
})



module.exports = categoryRouter