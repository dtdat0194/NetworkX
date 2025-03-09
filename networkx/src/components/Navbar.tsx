import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
          NetworkX
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" onClick={() => navigate('/creator-profile')}>
            Creator Profile
          </Button>
          <Button color="inherit" onClick={() => navigate('/sponsor-profile')}>
            Sponsor Profile
          </Button>
          <Button color="inherit" onClick={() => navigate('/discover')}>
            Discover
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 