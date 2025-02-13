const express = require('express');
const router = express.Router();
const Todo = require('../models/todoModel');

// GET all to-dos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching to-dos' });
  }
});

// POST a new to-do
router.post('/', async (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  const newTodo = new Todo({ title });
  try {
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({ error: 'Error creating to-do' });
  }
});

// PUT to update a to-do (toggle done or update title)
router.put('/:id', async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ error: 'To-do not found' });
    }
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: 'Error updating to-do' });
  }
});

// DELETE a to-do
router.delete('/:id', async (req, res) => {
  try {
    const removedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!removedTodo) {
      return res.status(404).json({ error: 'To-do not found' });
    }
    res.json({ message: 'To-do deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting to-do' });
  }
});

module.exports = router;
