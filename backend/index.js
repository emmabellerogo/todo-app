const express = require('express')
const Database = require('better-sqlite3')
const cors = require('cors')

const app = express()
const db = new Database('todos.db')

db.exec(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL
  )
`)

app.use(cors())
app.use(express.json())

app.get('/todos', (req, res) => {
  const todos = db.prepare('SELECT * FROM todos').all()
  res.json(todos)
})

app.post('/todos', (req, res) => {
  const text = req.body.text
  db.prepare('INSERT INTO todos (text) VALUES (?)').run(text)
  const todos = db.prepare('SELECT * FROM todos').all()
  res.json({ message: 'Todo added', todos })
})

app.delete('/todos/:id', (req, res) => {
  const id = req.params.id
  db.prepare('DELETE FROM todos WHERE id = ?').run(id)
  const todos = db.prepare('SELECT * FROM todos').all()
  res.json({ message: 'Todo deleted', todos })
})

app.listen(3001, () => {
  console.log('Backend running on http://localhost:3001')
})