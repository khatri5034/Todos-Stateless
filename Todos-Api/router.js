const express = require('express');
const path = require('path');
const router = express.Router();
//const app = express();
const PORT = 3000;
const { getTodos, addTodo, updateTodo, deleteTodo } = require('./todo');



// Serve the index.html at root
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// GET /todos - Get all todos
router.get('/todos', (req, res) => {
  getTodos((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// GET /todos/:id - Get a specific todo
router.get('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  // Since there's no getTodoById function, we'll get all and filter
  getTodos((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const todo = rows.find(item => item.id === id);
    if (todo) {
      res.json(todo);
    } else {
      res.status(404).json({ message: 'Todo item not found' });
    }
  });
});

// POST /todos - Add a new todo
router.post('/todos', (req, res) => {
  const { task,priority,fun} = req.body;
  if (!task) return res.status(400).json({ error: 'Task is required.' });
  
  addTodo(task,priority,fun, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    // Return the new todo with its ID
    res.status(201).json({ 
      id: this.lastID,
      task: task,
      completed: 0 
    });
  });
});

// PUT /todos/:id - Update a todo
router.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  updateTodo(id, completed, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Todo updated.' });
  });
});

// DELETE /todos/:id - Delete a todo
router.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  deleteTodo(id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Todo deleted.' });
  });
});

// Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
module.exports=router;