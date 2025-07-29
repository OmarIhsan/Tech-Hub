import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, CardActions, Typography, Grid, Box } from '@mui/material';
import { Link } from 'react-router';

const Home = () => {
  const [color, setColor] = useState('red');
  const [name] = useState('Omar');
  const [stats, setStats] = useState({
    posts: 0,
    users: 0,
    todos: 0,
    loading: true,
    error: null
  });
  
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setStats(prev => ({ ...prev, loading: true }));
        
        const [postsRes, usersRes, todosRes] = await Promise.all([
          fetch('https://jsonplaceholder.typicode.com/posts'),
          fetch('https://jsonplaceholder.typicode.com/users'),
          fetch('https://jsonplaceholder.typicode.com/todos')
        ]);

        if (!postsRes.ok || !usersRes.ok || !todosRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const [posts, users, todos] = await Promise.all([
          postsRes.json(),
          usersRes.json(),
          todosRes.json()
        ]);

        setStats({
          posts: posts.length,
          users: users.length,
          todos: todos.length,
          loading: false,
          error: null
        });
      } catch (err) {
        setStats(prev => ({
          ...prev,
          loading: false,
          error: err.message
        }));
        console.error('Error fetching data:', err);
      }
    };

    fetchStats();
  }, []);

  const handleClick = () => {
    const colors = ['red', 'blue', 'green', 'purple', 'orange'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setColor(randomColor);
  };

  const dashboardItems = [
    {
      title: 'Posts',
      count: stats.posts,
      description: 'View and manage all blog posts',
      path: '/posts',
      color: '#1976d2'
    },
    {
      title: 'Users',
      count: stats.users,
      description: 'Manage user accounts and profiles',
      path: '/users',
      color: '#9c27b0'
    },
    {
      title: 'Todos',
      count: stats.todos,
      description: 'Track and manage tasks',
      path: '/todos',
      color: '#2e7d32'
    }
  ];

  return (
    <div>
      <div style={{ paddingTop: 50, paddingBottom: 50 }}>
        <p style={{ textAlign: 'center', fontFamily: 'Times New Roman', fontSize: 'xx-large' }}>
          My Name is <span style={{ color }}>{name}'s</span> 
        </p>
        <p style={{ paddingRight: 100, paddingLeft: 100, textAlign: 'center', fontFamily: 'Times New Roman', fontSize: 'large' }}>
          Dental student learning react
        </p>
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <Button variant="contained" onClick={handleClick} style={{ marginBottom: 30 }}>
            Change Color of my name 
          </Button>
        </div>
      </div>

      <Box sx={{ maxWidth: 1200, margin: 'auto', padding: 3 }}>
          <Grid container spacing={4} justifyContent="center">
            {dashboardItems.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.title}>
                <Card 
                  component={Link}
                  to={item.path}
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    boxShadow: 3,
                    textDecoration: 'none',
                    
                  }}
                >
                  <CardContent className="card-content" sx={{ flexGrow: 1, textAlign: 'center', transition: 'background-color 0.3s ease-in-out' }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {item.title}
                    </Typography>
                    <Typography variant="h3" component="p" sx={{ my: 2, color: 'primary.main' }}>
                      {item.count}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
      </Box>
    </div>
  );
};

export default Home;
