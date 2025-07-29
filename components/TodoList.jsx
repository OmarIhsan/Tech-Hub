import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box, CircularProgress, Checkbox, List, ListItem, ListItemText, ListItemIcon, Pagination, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'incomplete'
  const todosPerPage = 20;

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" p={3}>
        <Typography variant="h5" color="error">
          Error: {error}
        </Typography>
      </Box>
    );
  }

  // Filter todos based on completion status
  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true;
    if (filter === 'completed') return todo.completed;
    if (filter === 'incomplete') return !todo.completed;
    return true;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredTodos.length / todosPerPage);
  const startIndex = (page - 1) * todosPerPage;
  const currentTodos = filteredTodos.slice(startIndex, startIndex + todosPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo(0, 0);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setPage(1); // Reset to first page when filter changes
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom align="center">
        Todos
      </Typography>
      
      <Box mb={3} display="flex" justifyContent="flex-end">
        <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
          <InputLabel id="filter-label">Filter</InputLabel>
          <Select
            labelId="filter-label"
            value={filter}
            onChange={handleFilterChange}
            label="Filter"
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="incomplete">Incomplete</MenuItem>
          </Select>
        </FormControl>
      </Box>
      
      <Card elevation={3}>
        <List>
          {currentTodos.map(todo => (
            <ListItem key={todo.id} divider>
              <ListItemIcon>
                <Checkbox checked={todo.completed} disabled />
              </ListItemIcon>
              <ListItemText 
                primary={todo.title} 
                secondary={`User ID: ${todo.userId} | Todo ID: ${todo.id}`}
                primaryTypographyProps={{
                  style: todo.completed ? { textDecoration: 'line-through' } : {}
                }}
              />
            </ListItem>
          ))}
        </List>
      </Card>
      
      <Box display="flex" justifyContent="center" mt={4} mb={2}>
        <Pagination 
          count={totalPages} 
          page={page} 
          onChange={handlePageChange} 
          color="primary" 
          size="large"
        />
      </Box>
    </Box>
  );
}

export default TodoList;