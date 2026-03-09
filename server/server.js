import express from 'express'
import cors from 'cors'
import taskRoutes from './routes/tasks.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/tasks', taskRoutes)

const PORT = 5000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})