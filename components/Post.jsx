import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Box, 
  CircularProgress,
  Container
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Post = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

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
        <Typography variant="h5" color="error" gutterBottom>
          Error loading post
        </Typography>
        <Typography color="textSecondary" paragraph>{error}</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </Box>
    );
  }

  if (!post) {
    return (
      <Box textAlign="center" p={3}>
        <Typography variant="h5" gutterBottom>
          Post not found
        </Typography>
        <Button 
          variant="outlined" 
          onClick={() => navigate('/posts')}
          startIcon={<ArrowBackIcon />}
        >
          Back to Posts
        </Button>
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button 
        variant="outlined" 
        onClick={() => navigate(-1)}
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3 }}
      >
        Back
      </Button>
      
      <Card elevation={3}>
        <CardContent sx={{ p: 4 }}>
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold',
              color: 'primary.main',
              mb: 3
            }}
          >
            {post.title}
          </Typography>
          
          <Typography 
            variant="body1" 
            color="text.primary"
            sx={{ 
              fontSize: '1.1rem',
              lineHeight: 1.8,
              whiteSpace: 'pre-line'
            }}
          >
            {post.body}
          </Typography>
          
          <Box mt={4} pt={2} borderTop={1} borderColor="divider">
            <Typography variant="caption" color="text.secondary">
              Post ID: {post.id}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Post;
