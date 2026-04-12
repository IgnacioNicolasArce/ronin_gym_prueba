import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GymProvider } from './context/GymContext';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Routines from './pages/Routines';
import Machines from './pages/Machines';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <GymProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-ronin-black text-white font-body selection:bg-ronin-red/30">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/rutinas" element={<Routines />} />
              <Route path="/maquinaria" element={<Machines />} />
              <Route path="/perfil" element={<Profile />} />
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/horarios" element={<LandingPage />} />
              <Route path="/contacto" element={<LandingPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </GymProvider>
  );
}

export default App;
