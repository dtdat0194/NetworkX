import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Tabs,
  Tab,
  Avatar,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>{children}</Box>}
    </div>
  );
};

const Discover = () => {
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Mock data - replace with actual API calls
  const creators = [
    {
      id: 1,
      name: 'Alex Johnson',
      niche: 'Gaming',
      followers: '500K',
      bio: 'Gaming content creator specializing in strategy games and RPGs.',
    },
    {
      id: 2,
      name: 'Sarah Smith',
      niche: 'Lifestyle',
      followers: '250K',
      bio: 'Lifestyle vlogger focusing on sustainable living and mindfulness.',
    },
  ];

  const sponsors = [
    {
      id: 1,
      name: 'TechGear Pro',
      industry: 'Technology',
      budget: '$1000-$5000',
      description: 'Leading gaming peripherals manufacturer looking for gaming creators.',
    },
    {
      id: 2,
      name: 'EcoLife',
      industry: 'Lifestyle',
      budget: '$2000-$8000',
      description: 'Sustainable product company seeking eco-conscious influencers.',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
      <Box sx={{ mt: { xs: 2, md: 4 }, mb: { xs: 2, md: 4 } }}>
        <Typography 
          variant={isMobile ? "h4" : "h3"} 
          component="h1" 
          gutterBottom
          sx={{ 
            fontSize: { 
              xs: '1.75rem', 
              sm: '2.5rem', 
              md: '3rem' 
            } 
          }}
        >
          Discover
        </Typography>
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: { xs: 2, md: 3 } }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="discover tabs"
            variant={isMobile ? "fullWidth" : "standard"}
          >
            <Tab label="Browse Creators" />
            <Tab label="Browse Sponsors" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {creators.map((creator) => (
              <Grid item xs={12} sm={6} key={creator.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1, p: { xs: 2, md: 3 } }}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      mb: 2,
                      flexDirection: isMobile ? 'column' : 'row',
                      gap: isMobile ? 1 : 2,
                      textAlign: isMobile ? 'center' : 'left'
                    }}>
                      <Avatar sx={{ 
                        width: { xs: 48, md: 56 }, 
                        height: { xs: 48, md: 56 }
                      }}>
                        {creator.name[0]}
                      </Avatar>
                      <Box sx={{ 
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: isMobile ? 'center' : 'flex-start'
                      }}>
                        <Typography variant="h6">{creator.name}</Typography>
                        <Chip 
                          label={creator.niche} 
                          size={isMobile ? "small" : "medium"} 
                          color="primary" 
                        />
                      </Box>
                    </Box>
                    <Typography color="text.secondary" gutterBottom>
                      {creator.followers} followers
                    </Typography>
                    <Typography variant="body2">{creator.bio}</Typography>
                  </CardContent>
                  <CardActions sx={{ 
                    p: { xs: 2, md: 2 },
                    justifyContent: isMobile ? 'center' : 'flex-start'
                  }}>
                    <Button size={isMobile ? "small" : "medium"} color="primary">
                      View Profile
                    </Button>
                    <Button size={isMobile ? "small" : "medium"} color="secondary">
                      Contact
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {sponsors.map((sponsor) => (
              <Grid item xs={12} sm={6} key={sponsor.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1, p: { xs: 2, md: 3 } }}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      mb: 2,
                      flexDirection: isMobile ? 'column' : 'row',
                      gap: isMobile ? 1 : 2,
                      textAlign: isMobile ? 'center' : 'left'
                    }}>
                      <Avatar sx={{ 
                        width: { xs: 48, md: 56 }, 
                        height: { xs: 48, md: 56 }
                      }}>
                        {sponsor.name[0]}
                      </Avatar>
                      <Box sx={{ 
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: isMobile ? 'center' : 'flex-start'
                      }}>
                        <Typography variant="h6">{sponsor.name}</Typography>
                        <Chip 
                          label={sponsor.industry} 
                          size={isMobile ? "small" : "medium"} 
                          color="secondary" 
                        />
                      </Box>
                    </Box>
                    <Typography color="text.secondary" gutterBottom>
                      Budget: {sponsor.budget}
                    </Typography>
                    <Typography variant="body2">{sponsor.description}</Typography>
                  </CardContent>
                  <CardActions sx={{ 
                    p: { xs: 2, md: 2 },
                    justifyContent: isMobile ? 'center' : 'flex-start'
                  }}>
                    <Button size={isMobile ? "small" : "medium"} color="primary">
                      View Profile
                    </Button>
                    <Button size={isMobile ? "small" : "medium"} color="secondary">
                      Contact
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      </Box>
    </Container>
  );
};

export default Discover; 