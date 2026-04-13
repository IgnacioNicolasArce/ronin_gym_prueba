import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

export default function Header() {
  const { currentUser, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const publicLinks = [
    { to: '/', label: 'Inicio' },
    { to: '/maquinas', label: 'Máquinas' },
    { to: '/rutinas', label: 'Rutinas' },
  ];

  const socioLinks = [
    { to: '/mis-rutinas', label: 'Mis Rutinas' },
  ];

  const profesorLinks = [
    { to: '/armar-rutina', label: 'Armar Rutina' },
  ];

  const adminLinks = [
    { to: '/dashboard', label: 'Dashboard' },
  ];

  const getExtraLinks = () => {
    if (!currentUser) return [];
    const links = [...socioLinks];
    if (currentUser.role === 'profesor' || currentUser.role === 'admin') {
      links.push(...profesorLinks);
    }
    if (currentUser.role === 'admin') {
      links.push(...adminLinks);
    }
    return links;
  };

  const allLinks = [...publicLinks, ...getExtraLinks()];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="header">
      <div className="header-inner">
        {/* Logo */}
        <Link to="/" className="header-logo">
          <span className="logo-kanji">浪人</span>
          <span className="logo-text">RONIN</span>
        </Link>

        {/* Nav desktop */}
        <nav className="header-nav">
          {allLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-link ${isActive(link.to) ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="header-right">
          {currentUser ? (
            <div className="user-area">
              <span className="user-role-badge">{currentUser.role.toUpperCase()}</span>
              <Link to="/perfil" className="user-name user-name-link">
                {currentUser.name.split(' ')[0]}
              </Link>
              <button className="btn-logout" onClick={logout}>Salir</button>
            </div>
          ) : (
            <Link to="/login" className="btn-login">
              INGRESAR
            </Link>
          )}

          {/* Hamburger */}
          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="mobile-nav" onClick={() => setMenuOpen(false)}>
          {allLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`mobile-nav-link ${isActive(link.to) ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
          {currentUser && (
            <Link to="/perfil" className={`mobile-nav-link ${isActive('/perfil') ? 'active' : ''}`}>
              Mi Perfil
            </Link>
          )}
          {!currentUser && (
            <Link to="/login" className="mobile-nav-link red">INGRESAR</Link>
          )}
          {currentUser && (
            <button className="mobile-nav-link red" onClick={logout}>SALIR</button>
          )}
        </nav>
      )}
    </header>
  );
}
