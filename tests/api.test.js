const supertest = require('supertest')
const app = require('../app') // the main Express app
const api = supertest(app)

//GET test categories
test('get /api/categories test', async () => {
  const response = await api.get('/api/categories')

  expect(200)
})

//GET test expenses
test('get /api/expenses test', async () => {
  const response = await api.get('/api/expenses')

  expect(200)
})

//wrong address test
test('get /api/wrongaddress test', async () => {
  const response = await api.get('/api/wrongaddress')
  
  expect(404)
  expect(response.body).toEqual({error: 'unknown endpoint' })
})

//POST test categories
test('test post function of category', async () => {
  const newCategory = {
    Name: 'testCategory'
  }

  await api
    .post('/api/categories')
    .send(newCategory)
    .expect(201)
  
  const response = await api.get('/api/categories')
  const lastCategory = response.body.slice(-1)[0] //we get the last item of response 
  expect(lastCategory.name).toBe('testCategory')
})

//PUT test categories
test('test put function of categories', async () => {
  const response = await api.get('/api/categories')
  const lastCategory = response.body.slice(-1)[0]

  expect(lastCategory.name).toBe('testCategory')

  const newCategory = {
    Name: 'updatedCategory'
  }
  await api
    .put(`/api/categories/${lastCategory.id}`)
    .send(newCategory)
    .expect(200)

  const response2 = await api.get('/api/categories')
  const lastCategory2 = response2.body.slice(-1)[0]
  expect(lastCategory2.name).toBe('updatedCategory')
})

//DELETE test categories
test('testing that deleting category works', async () => {
  const response = await api.get('/api/categories')
  const lastCategory = response.body.slice(-1)[0]
  
  expect(lastCategory.name).toBe('updatedCategory')

  await api
    .delete(`/api/categories/${lastCategory.id}`)
    .expect(200)

  const response2 = await api.get(`/api/categories/${lastCategory.id}`)
  expect(404)
})

//POST test expenses
test('Testing post expenses', async () => {
  const newExpense = {
    expName: 'Expense X',
    expdate: 'Today',
    Cost: 15.5,
    category_id: 1
  }

  await api
    .post('/api/expenses')
    .send(newExpense)
    .expect(201)
})

//PUT test expenses
test('Testing put expenses', async () => {
  const response = await api.get('/api/expenses')
  const lastExpense = response.body.slice(-1)[0]

  expect(lastExpense.expname).toBe('Expense X')

  const newExpense = {
    expName: 'Expense Y',
    expDate: 'Today',
    Cost: 15.5,
    category_id: 1
  }

  console.log(newExpense)
  await api
    .put(`/api/expenses/${lastExpense.id}`)
    .send(newExpense)
    .expect(200)

  const response2 = await api.get('/api/expenses')
  const lastCategory2 = response2.body.slice(-1)[0]
  console.log(lastCategory2.expname)
  expect(lastCategory2.expname).toBe('Expense Y')
})

//DELETE test expenses
test('Test delete expenses', async () => {
  const response = await api.get('/api/expenses')
  const lastExpense = response.body.slice(-1)[0]
  expect(lastExpense.expname).toBe('Expense Y')
 
  await api
    .delete(`/api/expenses/${lastExpense.id}`)
    .expect(200)

  const response2 = await api.get(`/api/expenses/${lastExpense.id}`)
  expect(404)
})