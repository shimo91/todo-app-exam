const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config()
const app = express();

const PORT = process.env.PORT

app.use(cors());
app.use(express.json());

const morgan= require('morgan');
app.use(morgan('dev'));

require('./config/dbConnection')

const routerFile = require('./Routes/todo');
app.use('/todo',routerFile);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});