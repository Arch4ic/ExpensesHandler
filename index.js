//main starting point for app
const app = require('./app')
const config = require('./utility/config')

app.listen(config.PORT, () => {
  console.log(`App running on port ${config.PORT}`)
})

