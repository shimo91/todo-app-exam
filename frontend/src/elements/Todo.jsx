import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, FormControl, Grid, InputLabel, List, MenuItem, Select, Stack, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


const Todo = () => {
    const [todos, setTodos] = useState([]);
  const [description, setDescription] = useState('');
  const [filter, setFilter] = useState('all'); // Default filter is 'all'

  useEffect(() => {
    fetchTodos();
  }, [filter]);

  const fetchTodos = async () => {
    try {
        let response;
        if (filter === 'completed') {
          response = await axios.get('http://localhost:5000/todo/get?taskstatus=completed');
        } else if (filter === 'ongoing') {
          response = await axios.get('http://localhost:5000/todo/get?taskstatus=ongoing');
        } else {
          response = await axios.get('http://localhost:5000/todo/get');
        }
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
  };

  const addTodo = async () => {
    try {
      await axios.post('http://localhost:5000/todo/add', {
        description,
        taskstatus: 'ongoing',
      });
      setDescription('');
      fetchTodos();
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/todo/delete/${id}`);
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const toggleComplete = async (id, taskstatus) => {
    try {
        const newStatus = taskstatus === 'completed' ? 'ongoing' : 'completed';
        await axios.put(`http://localhost:5000/todo/update/${id}`, {
          taskstatus: newStatus,
        });
        fetchTodos();
      } catch (error) {
        console.error('Error updating todo:', error);
      }
  };


  return (

    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Grid item xs={12} sm={8} md={6} lg={4}>

    

    <Box sx={{ width: '100%' }}>
      <Stack spacing={2}>
        <Item>
            <Typography variant="h4" component="h4">ToDo App</Typography>
        </Item>
         {/* Add Todo Form */}
        <Item>
        
            <TextField id="outlined-basic" label="Enter todo description" variant="outlined" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            />          
            <br/>
            <br/>
            <Button variant="contained" onClick={addTodo}>Add Todo</Button>
        </Item>
        
      </Stack>
    
        {/* Filter Dropdown */}
        <br/>
            <br/>
        <FormControl>
            <InputLabel id="filter-label">Filter</InputLabel>
            <br/>
            <Select
              labelId="filter-label"
              id="filter-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <MenuItem value="all">All Tasks</MenuItem>
              <MenuItem value="completed">Completed Tasks</MenuItem>
              <MenuItem value="ongoing">Incomplete Tasks</MenuItem>
            </Select>
          </FormControl>


      {/* Todo List */}
      <List>
        {todos.map((todo) => (
          <ListItem key={todo._id}>
              <Checkbox
                  checked={todo.taskstatus === 'completed'} // Check if status is 'completed'
                  onChange={() => toggleComplete(todo._id, todo.taskstatus)}
                  disabled={todo.taskstatus === 'completed'}
                />
            <ListItemText
              primary={todo.description}
              style={{ textDecoration: todo.taskstatus === 'completed' ? 'line-through' : 'none' }}
            />
            <Button onClick={() => deleteTodo(todo._id)} variant="contained">
              Delete
            </Button>
          </ListItem>
        ))}
      </List>
      </Box>
    </Grid>
    </Grid>
  )
}

export default Todo
