import { useState, useEffect } from 'react'

function App() {
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    fetch('http://localhost:3001/todos')
      .then(res => res.json())
      .then(data => setTodos(data))
  }, [])

  function addTodo() {
    if (inputValue === '') return
    fetch('http://localhost:3001/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: inputValue })
    })
      .then(res => res.json())
      .then(data => {
        setTodos(data.todos)
        setInputValue('')
      })
  }

  function deleteTodo(id) {
    fetch(`http://localhost:3001/todos/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(data => setTodos(data.todos))
  }

  return (
    <div>
      <h1>My To-Do List</h1>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add a task..."
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App