const pool = require('./utility/pool')

const getCategories = (request, response) => {
  pool.query('SELECT * FROM category ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getExpenses= (request, response) => {
  pool.query('SELECT * FROM expensesList ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getCategoryContentById = (request, response) => {
  const id = parseInt(request.params.id)
  pool.query('SELECT * FROM expensesList JOIN category ON expensesList.category_Id = category.Id WHERE category.Id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getExpenseContentById = (request, response) => {
  const id = parseInt(request.params.id)
  pool.query('SELECT * FROM expensesList WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}


const createCategory = (request, response) => {
  const { Name } = request.body

  pool.query('INSERT INTO category (name) VALUES ($1) RETURNING *', [Name], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`category added with ID: ${results.rows[0].id}`)
  })
}

const createExpense = (request, response) => {
  const { expName, expdate, Cost, category_id } = request.body

  pool.query('INSERT INTO expensesList (expName, expdate, Cost, category_id) VALUES ($1, $2, $3, $4) RETURNING *', [expName, expdate, Cost, category_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Expense added with ID: ${results.rows[0].id}`)
  })
}

const updateCategory = (request, response) => {
  const id = parseInt(request.params.id)
  const { Name } = request.body

  pool.query(
    'UPDATE category SET Name = $1 WHERE id = $2', [Name, id], (error) => {
      if (error) {
        throw error
      }
      response.status(200).send(`category modified with ID: ${id}`)
    })
}

const updateExpense = (request, response) => {
  const id = parseInt(request.params.id)
  const { expName, expdate, Cost, category_id } = request.body

  pool.query(
    'UPDATE expensesList SET expName = $1, expdate = $2, Cost = $3, category_id = $4  WHERE id = $5', [expName, expdate, Cost, category_id, id], (error) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Expense modified with ID: ${id}`)
    })
}

const deleteCategory = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM category WHERE id = $1', [id], (error) => {
    if (error) {
      throw error
    }
    response.status(200).send(`category deleted with ID: ${id}`)
  })
}

const deleteExpense = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM expensesList WHERE id = $1', [id], (error) => {
    if (error) {
      throw error
    }
    response.status(200).send(`expense deleted with ID: ${id}`)
  })
}

module.exports = {
  getCategories,
  getExpenses,
  getCategoryContentById,
  getExpenseContentById,
  createCategory,
  createExpense,
  updateCategory,
  updateExpense,
  deleteCategory,
  deleteExpense,
}