import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.route.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
import path from 'path'

dotenv.config()
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((err) => {
    console.log(err)
  })

const __dirname = path.resolve()
const app = express()

app.use(express.json())
app.use(cookieParser())

app.listen(3000, () => {
  console.log('Server is Listening to Port 3000')
})

app.use('/api/auth', authRouter)

app.use(express.static(path.join(__dirname, '/client/dist')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})

app.use(notFound)
app.use(errorHandler)
