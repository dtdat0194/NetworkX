import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
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
}

export default App;
