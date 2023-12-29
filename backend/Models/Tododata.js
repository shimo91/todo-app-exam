const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    description: String,
    taskstatus: String,
  });

const Todo=mongoose.model('Todo',todoSchema);
module.exports=Todo;