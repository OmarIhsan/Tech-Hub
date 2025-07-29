import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Card, CardContent, Typography, Grid, Box, CircularProgress, Pagination } from '@mui/material';

function PostList() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const postsPerPage = 12; // Increased per page for better grid layout

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
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

  // Calculate pagination
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const startIndex = (page - 1) * postsPerPage;
  const currentPosts = posts.slice(startIndex, startIndex + postsPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo(0, 0);
  };

  const handlePostClick = (postId) => {
    navigate(`/posts/${postId}`);
  };

  return (
    <Box sx={{ 
      p: { xs: 2, sm: 3 },
      maxWidth: '100%',
      overflow: 'hidden'
    }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
        Latest Posts
      </Typography>
      
      {currentPosts.length > 0 ? (
        <Grid 
          container 
          spacing={3}
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)'
            },
            gap: 3,
            '& > .MuiGrid-item': {
              padding: 0,
              maxWidth: '100%',
              width: '100%'
            }
          }}
        >
          {currentPosts.map((post) => (
            <Grid item key={post.id} sx={{ display: 'flex' }}>
              <Card 
                elevation={2}
                onClick={() => handlePostClick(post.id)}
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6,
                  },
                  backgroundColor: 'background.paper',
                }}
              >
                <CardContent sx={{ 
                  flexGrow: 1, 
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  boxSizing: 'border-box'
                }}>
                  <Typography 
                    variant="subtitle1" 
                    component="h3" 
                    gutterBottom 
                    noWrap
                    sx={{ 
                      fontWeight: 'bold',
                      color: 'primary.main',
                      mb: 1,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {post.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{
                      flexGrow: 1,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: 'vertical',
                      lineHeight: 1.5,
                    }}
                  >
                    {post.body}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box textAlign="center" py={4}>
          <Typography variant="body1" color="text.secondary">
            No posts found.
          </Typography>
        </Box>
      )}
      
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

export default PostList;