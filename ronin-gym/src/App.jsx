import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { GymProvider } from './context/GymContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Maquinas from './pages/Maquinas';
import Rutinas from './pages/Rutinas';
import Login from './pages/Login';
import Perfil from './pages/Perfil';
import MisRutinas from './pages/MisRutinas';
import ArmarRutina from './pages/ArmarRutina';
import Dashboard from './pages/Dashboard';
import './styles/global.css';

export default function App() {
  return (
    <AuthProvider>
      <GymProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/maquinas" element={<Maquinas />} />
            <Route path="/rutinas" element={<Rutinas />} />
            <Route path="/login" element={<Login />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/mis-rutinas" element={<MisRutinas />} />
            <Route path="/armar-rutina" element={<ArmarRutina />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </GymProvider>
    </AuthProvider>
  );
}
