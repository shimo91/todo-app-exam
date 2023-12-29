const express = require('express');
const router=express.Router();

router.use(express.json());
router.use(express.urlencoded({extended:true}))

const Todo=require('../Models/Tododata');

router.get('/get', async (req, res) => {
    try {
      let filter = {};
      if (req.query.taskstatus !== undefined) {
        filter.taskstatus = req.query.taskstatus;
      }
      const todos = await Todo.find(filter);
      res.json(todos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  
  router.post('/add', async (req, res) => {
    try {
      const { description, taskstatus } = req.body;
      const newTodo = new Todo({
        description,
        taskstatus,
      });
      const savedTodo = await newTodo.save();
      res.json(savedTodo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  
  router.put('/update/:id', async (req, res) => {
    try {
      const { taskstatus } = req.body;
      const updatedTodo = await Todo.findByIdAndUpdate(
        req.params.id,
        { taskstatus },
        { new: true } // Return the updated document
      );
      res.json(updatedTodo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  router.delete('/delete/:id', async (req, res) => {
    try {
      const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
      res.json(deletedTodo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  module.exports=router;