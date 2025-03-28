import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Chip,
  Button,
  TextField,
  Alert,
} from '@mui/material';
import { authService, User } from '../services/api';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [matches, setMatches] = useState<Array<{ username: string; score: number }>>([]);

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (!username) {
      navigate('/login');
      return;
    }
    loadProfile(username);
  }, [navigate]);

  const loadProfile = async (username: string) => {
    try {
      const userData = await authService.getProfile(username);
      setUser(userData);
    } catch (err) {
      setError('Failed to load profile');
    }
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim() && user) {
      e.preventDefault();
      const newTags = [...user.tags, tagInput.trim()];
      setUser({ ...user, tags: newTags });
      setTagInput('');
      findMatches(newTags);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    if (user) {
      const newTags = user.tags.filter(tag => tag !== tagToRemove);
      setUser({ ...user, tags: newTags });
      findMatches(newTags);
    }
  };

  const findMatches = async (tags: string[]) => {
    if (user) {
      try {
        const result = await authService.findMatches({
          username: user.username,
          tags,
        });
        setMatches(result.matches);
      } catch (err) {
        setError('Failed to find matches');
      }
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Profile
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Typography variant="h6" gutterBottom>
            Username: {user.username}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Role: {user.role}
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Tags
            </Typography>
            <TextField
              fullWidth
              label="Add Tags (Press Enter)"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={handleAddTag}
              margin="normal"
            />
            <Box sx={{ mt: 2, mb: 4 }}>
              {user.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  onDelete={() => handleRemoveTag(tag)}
                  sx={{ m: 0.5 }}
                />
              ))}
            </Box>
          </Box>
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Matches
            </Typography>
            {matches.map((match) => (
              <Paper key={match.username} sx={{ p: 2, mb: 1 }}>
                <Typography>
                  {match.username} - Match Score: {(match.score * 100).toFixed(1)}%
                </Typography>
              </Paper>
            ))}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Profile; 