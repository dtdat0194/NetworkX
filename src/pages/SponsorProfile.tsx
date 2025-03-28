import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';

interface SponsorProfile {
  companyName: string;
  description: string;
  industry: string;
  budget: string;
  targetAudience: string;
  requirements: string;
}

const SponsorProfile = () => {
  const [profile, setProfile] = useState<SponsorProfile>({
    companyName: '',
    description: '',
    industry: '',
    budget: '',
    targetAudience: '',
    requirements: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleIndustryChange = (event: SelectChangeEvent<string>) => {
    setProfile((prev) => ({
      ...prev,
      industry: event.target.value,
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
          Create Your Sponsor Profile
        </Typography>
        <Paper sx={{ p: 4, mt: 4 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Company Name"
                  name="companyName"
                  value={profile.companyName}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Company Description"
                  name="description"
                  value={profile.description}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Industry</InputLabel>
                  <Select
                    value={profile.industry}
                    label="Industry"
                    onChange={handleIndustryChange}
                    required
                  >
                    <MenuItem value="technology">Technology</MenuItem>
                    <MenuItem value="fashion">Fashion & Beauty</MenuItem>
                    <MenuItem value="gaming">Gaming</MenuItem>
                    <MenuItem value="food">Food & Beverage</MenuItem>
                    <MenuItem value="health">Health & Wellness</MenuItem>
                    <MenuItem value="travel">Travel</MenuItem>
                    <MenuItem value="education">Education</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Budget Range"
                  name="budget"
                  value={profile.budget}
                  onChange={handleChange}
                  placeholder="e.g., $1000-$5000 per campaign"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Target Audience"
                  name="targetAudience"
                  value={profile.targetAudience}
                  onChange={handleChange}
                  placeholder="Describe your ideal audience demographics"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Creator Requirements"
                  name="requirements"
                  value={profile.requirements}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  placeholder="List any specific requirements for creators"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  size="large"
                  fullWidth
                >
                  Create Sponsor Profile
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default SponsorProfile; 