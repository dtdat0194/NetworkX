import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from '@mui/material';
import { authService, UserRole, ContentType } from '../services/api';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.CREATOR);
  const [industry, setIndustry] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [error, setError] = useState('');

  // Creator specific fields
  const [contentType, setContentType] = useState<ContentType>(ContentType.VIDEO);
  const [audienceSize, setAudienceSize] = useState<number>(0);
  const [contentStyle, setContentStyle] = useState('');
  const [previousCollaborations, setPreviousCollaborations] = useState<string[]>([]);

  // Sponsor specific fields
  const [companyName, setCompanyName] = useState('');
  const [campaignBudget, setCampaignBudget] = useState<number>(0);
  const [targetAudience, setTargetAudience] = useState('');
  const [campaignGoals, setCampaignGoals] = useState<string[]>([]);

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleAddCollaboration = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
      e.preventDefault();
      const newCollaboration = e.currentTarget.value.trim();
      if (!previousCollaborations.includes(newCollaboration)) {
        setPreviousCollaborations([...previousCollaborations, newCollaboration]);
      }
      e.currentTarget.value = '';
    }
  };

  const handleRemoveCollaboration = (collabToRemove: string) => {
    setPreviousCollaborations(previousCollaborations.filter(collab => collab !== collabToRemove));
  };

  const handleAddCampaignGoal = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
      e.preventDefault();
      const newGoal = e.currentTarget.value.trim();
      if (!campaignGoals.includes(newGoal)) {
        setCampaignGoals([...campaignGoals, newGoal]);
      }
      e.currentTarget.value = '';
    }
  };

  const handleRemoveCampaignGoal = (goalToRemove: string) => {
    setCampaignGoals(campaignGoals.filter(goal => goal !== goalToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authService.register({
        username,
        password,
        role,
        email,
        industry,
        tags,
        // Creator specific fields
        content_type: role === UserRole.CREATOR ? contentType : undefined,
        audience_size: role === UserRole.CREATOR ? audienceSize : undefined,
        content_style: role === UserRole.CREATOR ? contentStyle : undefined,
        previous_collaborations: role === UserRole.CREATOR ? previousCollaborations : undefined,
        // Sponsor specific fields
        company_name: role === UserRole.SPONSOR ? companyName : undefined,
        campaign_budget: role === UserRole.SPONSOR ? campaignBudget : undefined,
        target_audience: role === UserRole.SPONSOR ? targetAudience : undefined,
        campaign_goals: role === UserRole.SPONSOR ? campaignGoals : undefined,
      });
      navigate('/login');
    } catch (err) {
      setError('Registration failed. Username might already exist.');
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Register
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Role</InputLabel>
                  <Select
                    value={role}
                    label="Role"
                    onChange={(e) => setRole(e.target.value as UserRole)}
                    required
                  >
                    <MenuItem value={UserRole.CREATOR}>Content Creator</MenuItem>
                    <MenuItem value={UserRole.SPONSOR}>Sponsor</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Industry"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Add Tags (Press Enter)"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={handleAddTag}
                />
                <Box sx={{ mt: 2 }}>
                  {tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      onDelete={() => handleRemoveTag(tag)}
                      sx={{ m: 0.5 }}
                    />
                  ))}
                </Box>
              </Grid>

              {role === UserRole.CREATOR && (
                <>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Content Type</InputLabel>
                      <Select
                        value={contentType}
                        label="Content Type"
                        onChange={(e) => setContentType(e.target.value as ContentType)}
                        required
                      >
                        <MenuItem value={ContentType.VIDEO}>Video</MenuItem>
                        <MenuItem value={ContentType.BLOG}>Blog</MenuItem>
                        <MenuItem value={ContentType.SOCIAL_MEDIA}>Social Media</MenuItem>
                        <MenuItem value={ContentType.PODCAST}>Podcast</MenuItem>
                        <MenuItem value={ContentType.OTHER}>Other</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Audience Size"
                      type="number"
                      value={audienceSize}
                      onChange={(e) => setAudienceSize(Number(e.target.value))}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Content Style"
                      value={contentStyle}
                      onChange={(e) => setContentStyle(e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Previous Collaborations (Press Enter)"
                      onKeyPress={handleAddCollaboration}
                    />
                    <Box sx={{ mt: 2 }}>
                      {previousCollaborations.map((collab) => (
                        <Chip
                          key={collab}
                          label={collab}
                          onDelete={() => handleRemoveCollaboration(collab)}
                          sx={{ m: 0.5 }}
                        />
                      ))}
                    </Box>
                  </Grid>
                </>
              )}

              {role === UserRole.SPONSOR && (
                <>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Company Name"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Campaign Budget"
                      type="number"
                      value={campaignBudget}
                      onChange={(e) => setCampaignBudget(Number(e.target.value))}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Target Audience"
                      value={targetAudience}
                      onChange={(e) => setTargetAudience(e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Campaign Goals (Press Enter)"
                      onKeyPress={handleAddCampaignGoal}
                    />
                    <Box sx={{ mt: 2 }}>
                      {campaignGoals.map((goal) => (
                        <Chip
                          key={goal}
                          label={goal}
                          onDelete={() => handleRemoveCampaignGoal(goal)}
                          sx={{ m: 0.5 }}
                        />
                      ))}
                    </Box>
                  </Grid>
                </>
              )}

              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register; 