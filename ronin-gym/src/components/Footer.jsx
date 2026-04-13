import React from 'react';
import { Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GYM_INFO } from '../data/gymData';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-kanji-bg">浪人</div>
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-logo-kanji">浪人</span>
          <span className="footer-logo-text">RONIN GYM</span>
          <p className="footer-tagline">四十七人の心で鍛える</p>
          <p className="footer-tagline-es">Forjado con el espíritu de los 47 Ronin</p>
        </div>

        <div className="footer-links">
          <h4 className="footer-section-title">Contacto</h4>
          <a href={`mailto:${GYM_INFO.email}`} className="footer-link">
            <span className="footer-icon"><Mail size={14} /></span>
            {GYM_INFO.email}
          </a>
          <a
            href={GYM_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            <span className="footer-icon"><Instagram size={14} /></span>
            {GYM_INFO.instagram}
          </a>
          <a href={`tel:${GYM_INFO.phone.replace(/\s+/g, '')}`} className="footer-link">
            <span className="footer-icon"><Phone size={14} /></span>
            {GYM_INFO.phone}
          </a>
          <a
            href={GYM_INFO.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            <span className="footer-icon"><MapPin size={14} /></span>
            {GYM_INFO.address}
          </a>
        </div>

        <div className="footer-nav">
          <h4 className="footer-section-title">Navegación</h4>
          <Link to="/maquinas" className="footer-link">Máquinas</Link>
          <Link to="/rutinas" className="footer-link">Rutinas</Link>
          <Link to="/login" className="footer-link">Acceder</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="jp-divider" />
        <div className="footer-bottom-row">
          <span className="footer-copy">© 2025 RONIN GYM — La Tablada, Buenos Aires</span>
          <span className="footer-copy">Todos los derechos reservados</span>
        </div>
      </div>
    </footer>
  );
}
