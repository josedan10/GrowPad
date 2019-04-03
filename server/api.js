const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

require('./db')

app.use(cors())
app.use(bodyParser.json())

app.listen(4000, 'localhost', (error) => {
  if (error) {
    console.log('Error starting server', error)
    return
  }

  console.log('Server running on port 4000')
})
