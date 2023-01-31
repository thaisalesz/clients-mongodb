import express from 'express'
import 'express-async-errors'
import 'dotenv/config'
import bodyParser from 'body-parser'
import { routes } from './routes'
import { errorMiddleware } from './middlewares/errorMiddleware'
import cors from 'cors'

const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use(routes)


app.use(errorMiddleware)

export { app }