import express from 'express'
import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'

const router = express.Router()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dbPath = path.join(__dirname, '../data/db.json')

const readTasks = async () => {
  const data = await fs.readJson(dbPath)
  return data.tasks
}

const writeTasks = async (tasks) => {
  await fs.writeJson(dbPath, { tasks }, { spaces: 2 })
}

router.get('/', async (req, res) => {
  const tasks = await readTasks()
  res.json(tasks)
})

router.post('/', async (req, res) => {
  const tasks = await readTasks()
  const newTask = {
    id: Date.now().toString(),
    ...req.body
  }
  tasks.push(newTask)
  await writeTasks(tasks)
  res.status(201).json(newTask)
})

router.patch('/:id', async (req, res) => {
  const tasks = await readTasks()
  const updatedTasks = tasks.map(task =>
    task.id === req.params.id ? { ...task, ...req.body } : task
  )
  await writeTasks(updatedTasks)
  res.json({ message: 'Task updated' })
})

router.delete('/:id', async (req, res) => {
  const tasks = await readTasks()
  const filtered = tasks.filter(task => task.id !== req.params.id)
  await writeTasks(filtered)
  res.json({ message: 'Task deleted' })
})

export default router