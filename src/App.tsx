import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreatorProfile from './pages/CreatorProfile';
import SponsorProfile from './pages/SponsorProfile';
import Discover from './pages/Discover';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

const App: React.FC = () => {
  const isLoggedIn = !!localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('username');
    window.location.href = '/login';
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                NetworkX
              </Typography>
              {isLoggedIn ? (
                <>
                  <Button color="inherit" component={Link} to="/profile">
                    Profile
                  </Button>
                  <Button color="inherit" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button color="inherit" component={Link} to="/login">
                    Login
                  </Button>
                  <Button color="inherit" component={Link} to="/register">
                    Register
                  </Button>
                </>
              )}
            </Toolbar>
          </AppBar>
          <Container>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Container>
        </Box>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/creator-profile" element={<CreatorProfile />} />
          <Route path="/sponsor-profile" element={<SponsorProfile />} />
          <Route path="/discover" element={<Discover />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
