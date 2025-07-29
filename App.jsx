import './App.css'
import React from 'react';
import { Link, Outlet, Routes, Route } from 'react-router';
import Home from './components/Home';
import { Button } from '@mui/material';

function App() {
  return (
    <div style={{ backgroundColor: 'gray', minHeight: '100vh' }}>
      <header style={{ backgroundColor: 'green' }}>
        <div style={{ textAlign: 'center' }}>
          <img src={'/tech-hub-logo-01.png'} alt="Tech Hub Logo" width="360" height="300" />
        </div>
        <nav style={{ display: 'flex', justifyContent: 'center', padding: '10px 0' }}>
          <button
            style={{
              fontFamily: "'Times New Roman', Times, serif",
              fontSize: 'large',
              marginRight: '50px',
              padding: '5px 10px',
              border: '1px solid #ccc',
              background: 'white',
              cursor: 'pointer'
            }}
            onClick={() => window.location.href = '/'}
          >
            Home
          </button>
          <button
            style={{
              fontFamily: "'Times New Roman', Times, serif",
              fontSize: 'large',
              margin: '0 25px',
              padding: '5px 10px',
              border: '1px solid #ccc',
              background: 'white',
              cursor: 'pointer'
            }}
            onClick={() => window.location.href = '/about'}
          >
            About
          </button>
          <button
            style={{
              fontFamily: "'Times New Roman', Times, serif",
              fontSize: 'large',
              margin: '0 25px',
              padding: '5px 10px',
              border: '1px solid #ccc',
              background: 'white',
              cursor: 'pointer'
            }}
            onClick={() => window.location.href = '/services'}
          >
            Services
          </button>
          <button
            style={{
              fontFamily: "'Times New Roman', Times, serif",
              fontSize: 'large',
              margin: '0 25px 0 50px',
              padding: '5px 10px',
              border: '1px solid #ccc',
              background: 'white',
              cursor: 'pointer'
            }}
            onClick={() => window.location.href = '/contact'}
          >
            Contact
          </button>
          <button
            style={{
              fontFamily: "'Times New Roman', Times, serif",
              fontSize: 'large',
              marginLeft: '50px',
              padding: '5px 10px',
              border: '1px solid #ccc',
              background: 'white',
              cursor: 'pointer'
            }}
            onClick={() => window.location.href = '/what-i-learned'}
          >
            what-I-learned
          </button>
        </nav>
      </header>

      <main style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Outlet />
      </main>

      <footer style={{ backgroundColor: 'black', paddingTop: '50px', paddingBottom: '20px', textAlign: 'center' }}>
        <div>
          <p style={{ color: 'blanchedalmond' }}>2025 Tech Hub</p>
        </div>
      </footer>
    </div>
  )
}

export default App
