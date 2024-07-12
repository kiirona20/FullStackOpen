const express = require('express')
const app = express()
const cors = require('cors')
const notesRouter = require('./controllers/blogs')
const config = require('./utils/config')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

mongoose.connect(config.MONGO_URI)
.then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use('/api/blogs', notesRouter)

module.exports = app