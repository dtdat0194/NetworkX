import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  Grid,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';

interface CreatorProfile {
  name: string;
  bio: string;
  niche: string;
  socialLinks: string;
  audienceSize: string;
  preferredBrands: string[];
}

const CreatorProfile = () => {
  const [profile, setProfile] = useState<CreatorProfile>({
    name: '',
    bio: '',
    niche: '',
    socialLinks: '',
    audienceSize: '',
    preferredBrands: [],
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNicheChange = (event: SelectChangeEvent<string>) => {
    setProfile((prev) => ({
      ...prev,
      niche: event.target.value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Here you would typically send the profile data to your backend
    console.log('Profile submitted:', profile);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create Your Creator Profile
        </Typography>
        <Paper sx={{ p: 4, mt: 4 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Bio"
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Content Niche</InputLabel>
                  <Select
                    value={profile.niche}
                    label="Content Niche"
                    onChange={handleNicheChange}
                    required
                  >
                    <MenuItem value="gaming">Gaming</MenuItem>
                    <MenuItem value="lifestyle">Lifestyle</MenuItem>
                    <MenuItem value="tech">Technology</MenuItem>
                    <MenuItem value="fashion">Fashion</MenuItem>
                    <MenuItem value="food">Food</MenuItem>
                    <MenuItem value="travel">Travel</MenuItem>
                    <MenuItem value="fitness">Fitness</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Social Media Links"
                  name="socialLinks"
                  value={profile.socialLinks}
                  onChange={handleChange}
                  placeholder="Add your social media links (comma-separated)"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Audience Size"
                  name="audienceSize"
                  value={profile.audienceSize}
                  onChange={handleChange}
                  placeholder="e.g., 100K followers"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                >
                  Create Profile
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default CreatorProfile; 