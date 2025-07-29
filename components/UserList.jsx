import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Box, CircularProgress, Avatar } from '@mui/material';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
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

  return (
    <Box>
      <Typography variant="h4" gutterBottom align="center">
        Users
      </Typography>
      
      <Grid container spacing={3}>
        {users.map(user => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <Card elevation={3}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                    {user.name.charAt(0)}
                  </Avatar>
                  <Typography variant="h6" component="h2">
                    {user.name}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Username: {user.username}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Email: {user.email}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Phone: {user.phone}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Website: {user.website}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Company: {user.company.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default UserList;