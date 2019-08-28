const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

app.disable('x-powered-by')
app.use(cors())
app.use(bodyParser.json())
app.use(morgan('dev'))


if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load()
}

app.use('/users', require('./routes/users'))
app.use('/auth', require('./routes/auth'))
app.use('/requests', require('./routes/requests'))
app.use('/sessions', require('./routes/sessions'))
app.use('/queues', require('./routes/queues'))

app.use((err, req, res, next) => {
  console.log(err)
  const status = err.status || 500
  res.status(status).json({
    error: err,
    message: 'app.js'
  })
})

app.use((req, res, next) => {
  console.log(req)
  res.status(404).json({
    error: {
      message: 'Error not found in app.js'
    }
  })
})

const listener = () => console.log(`Listening on port ${port}!`)
app.listen(port, listener)