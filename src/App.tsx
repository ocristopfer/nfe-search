import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom'
import ResponsiveAppBar from './components/ResponsiveAppBar';
import NfeSearch from './pages/NfeSearch';
import About from './pages/About';
import Contact from './pages/Contact';
import { CssBaseline, Container } from '@mui/material';

function App() {
  return (
    <>
    <div className="App">
      <ResponsiveAppBar></ResponsiveAppBar>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ paddingTop: "2vh" }}>
        <Routes>
          <Route path="/" element={<NfeSearch />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Container>
  
    </div>
    </>
  );
}

export default App;
