import { Container, Typography, Box, Button, Grid, Paper, useTheme, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      <Box sx={{ 
        mt: { xs: 4, md: 8 }, 
        mb: { xs: 3, md: 4 }, 
        textAlign: 'center' 
      }}>
        <Typography 
          variant={isMobile ? "h3" : "h2"} 
          component="h1" 
          gutterBottom
          sx={{ 
            fontSize: { 
              xs: '2rem', 
              sm: '3rem', 
              md: '3.75rem' 
            } 
          }}
        >
          Welcome to NetworkX
        </Typography>
        <Typography 
          variant="h5" 
          color="text.secondary" 
          paragraph
          sx={{ 
            fontSize: { 
              xs: '1.2rem', 
              sm: '1.5rem' 
            } 
          }}
        >
          Connect content creators with their perfect sponsors
        </Typography>
      </Box>

      <Grid container spacing={{ xs: 2, md: 4 }} sx={{ mt: { xs: 2, md: 4 } }}>
        <Grid item xs={12} md={6}>
          <Paper 
            sx={{ 
              p: { xs: 2, md: 4 }, 
              textAlign: 'center', 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <Box>
              <Typography 
                variant={isMobile ? "h5" : "h4"} 
                gutterBottom
                sx={{ mb: 2 }}
              >
                For Content Creators
              </Typography>
              <Typography 
                paragraph
                sx={{ mb: { xs: 2, md: 3 } }}
              >
                Build your profile, showcase your content, and connect with sponsors who align with your brand.
              </Typography>
            </Box>
            <Button 
              variant="contained" 
              size={isMobile ? "medium" : "large"}
              onClick={() => navigate('/creator-profile')}
              sx={{ mt: 2 }}
            >
              Create Creator Profile
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper 
            sx={{ 
              p: { xs: 2, md: 4 }, 
              textAlign: 'center', 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <Box>
              <Typography 
                variant={isMobile ? "h5" : "h4"} 
                gutterBottom
                sx={{ mb: 2 }}
              >
                For Sponsors
              </Typography>
              <Typography 
                paragraph
                sx={{ mb: { xs: 2, md: 3 } }}
              >
                Find the perfect content creators to represent your brand and reach your target audience.
              </Typography>
            </Box>
            <Button 
              variant="contained" 
              color="secondary" 
              size={isMobile ? "medium" : "large"}
              onClick={() => navigate('/sponsor-profile')}
              sx={{ mt: 2 }}
            >
              Create Sponsor Profile
            </Button>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ 
        mt: { xs: 4, md: 8 }, 
        textAlign: 'center' 
      }}>
        <Button 
          variant="outlined" 
          size={isMobile ? "medium" : "large"}
          onClick={() => navigate('/discover')}
        >
          Explore Matches
        </Button>
      </Box>
    </Container>
  );
};

export default Home; 