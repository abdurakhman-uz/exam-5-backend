import express from 'express'
import dotenv from "dotenv"
import cors from "cors"
import connectDB from './utils/db.js'

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())

import modelsRouter from "./routes/models.js"
import usersRouter from "./routes/users.js"
import carsRouter from "./routes/cars.js"

app.use('/api', modelsRouter)
app.use('/api/user', usersRouter)
app.use('/api/cars', carsRouter)


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(process.env.PORT, () => {
    connectDB()
    console.log(`Server running on port ${process.env.PORT}`)
})