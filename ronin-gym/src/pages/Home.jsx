import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { GYM_INFO, INSTRUCTORS } from '../data/gymData';
import './Home.css';

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function Home() {
  useScrollReveal();

  return (
    <main className="home">
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg-text">浪人</div>
        <div className="hero-lines">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="hero-line" style={{ animationDelay: `${i * 0.2}s` }} />
          ))}
        </div>
        <div className="hero-content">
          <div className="hero-pretitle">
            <span className="hero-pretitle-bar" />
            <span>四七人の魂</span>
            <span className="hero-pretitle-bar" />
          </div>
          <h1 className="hero-title">
            <span className="hero-title-big">RONIN</span>
            <span className="hero-title-sub">GYM</span>
          </h1>
          <p className="hero-desc">
            El guerrero sin amo no descansa.<br />
            Forjate cada día. Sin excusas.
          </p>
          <div className="hero-cta">
            <a href="#precio" className="btn-primary">COMENZAR AHORA</a>
            <Link to="/rutinas" className="btn-secondary">VER RUTINAS</Link>
          </div>
          <div className="hero-badges">
            <div className="hero-badge">
              <span className="badge-num">47</span>
              <span className="badge-label">El Código</span>
            </div>
            <div className="hero-badge">
              <span className="badge-num">1</span>
              <span className="badge-label">Plan Simple</span>
            </div>
            <div className="hero-badge">
              <span className="badge-num">∞</span>
              <span className="badge-label">Disciplina</span>
            </div>
          </div>
        </div>
        <div className="hero-scroll-hint">
          <span>SCROLL</span>
          <div className="hero-scroll-line" />
        </div>
      </section>

      {/* SEPARADOR */}
      <div className="section-sep reveal">
        <div className="sep-line" />
        <span className="sep-kanji">道</span>
        <div className="sep-line" />
      </div>

      {/* UBICACIÓN */}
      <section className="section-location reveal" id="ubicacion">
        <div className="section-inner">
          <div className="section-header">
            <span className="section-tag">— UBICACIÓN</span>
            <h2 className="section-title">ENCONTRANOS</h2>
          </div>
          <a
            href={GYM_INFO.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="location-card"
          >
            <div className="location-kanji">地</div>
            <div className="location-info">
              <span className="location-label">Dirección</span>
              <h3 className="location-address">Gral. Nazar 849</h3>
              <p className="location-city">La Tablada, Buenos Aires</p>
              <span className="location-cta">
                Ver en Google Maps →
              </span>
            </div>
            <div className="location-arrow">↗</div>
          </a>
          <div className="hours-grid">
            <div className="hours-item">
              <span className="hours-day">Lun — Vie</span>
              <span className="hours-time">07:00 — 22:00</span>
            </div>
            <div className="hours-item">
              <span className="hours-day">Sábado</span>
              <span className="hours-time">08:00 — 18:00</span>
            </div>
            <div className="hours-item">
              <span className="hours-day">Domingo</span>
              <span className="hours-time">09:00 — 13:00</span>
            </div>
          </div>
        </div>
      </section>

      {/* SEPARADOR */}
      <div className="section-sep reveal">
        <div className="sep-line" />
        <span className="sep-kanji">師</span>
        <div className="sep-line" />
      </div>

      {/* PROFESORES */}
      <section className="section-instructors reveal" id="profesores">
        <div className="section-inner">
          <div className="section-header">
            <span className="section-tag">— EQUIPO</span>
            <h2 className="section-title">LOS SENSEI</h2>
          </div>
          <div className="instructors-grid">
            {INSTRUCTORS.map((inst, i) => (
              <div
                key={inst.id}
                className="instructor-card reveal"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="instructor-kanji">{inst.kanji}</div>
                <div className="instructor-kanji-label">{inst.kanjiMeaning}</div>
                <div className="instructor-body">
                  <span className="instructor-role">{inst.role}</span>
                  <h3 className="instructor-name">{inst.name}</h3>
                  <span className="instructor-specialty">{inst.specialty}</span>
                  <p className="instructor-bio">{inst.bio}</p>
                  <div className="instructor-certs">
                    {inst.certifications.map(cert => (
                      <span key={cert} className="cert-tag">{cert}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEPARADOR */}
      <div className="section-sep reveal">
        <div className="sep-line" />
        <span className="sep-kanji">円</span>
        <div className="sep-line" />
      </div>

      {/* PRECIO */}
      <section className="section-price reveal" id="precio">
        <div className="section-inner">
          <div className="section-header">
            <span className="section-tag">— MEMBRESÍA</span>
            <h2 className="section-title">UN SOLO PLAN</h2>
          </div>
          <div className="price-card">
            <div className="price-kanji-bg">円</div>
            <div className="price-content">
              <div className="price-badge">PASE LIBRE</div>
              <div className="price-amount">
                <span className="price-currency">$</span>
                <span className="price-number">35.000</span>
                <span className="price-period">/mes</span>
              </div>
              <div className="price-divider" />
              <ul className="price-features">
                <li><span className="feature-check">✓</span> Acceso ilimitado todo el mes</li>
                <li><span className="feature-check">✓</span> Todas las máquinas disponibles</li>
                <li><span className="feature-check">✓</span> Rutinas personalizadas</li>
                <li><span className="feature-check">✓</span> Seguimiento de asistencia</li>
                <li><span className="feature-check">✓</span> Puntos de Honor por concurrencia</li>
                <li><span className="feature-check">✓</span> App de gestión personal</li>
              </ul>
              <a href={GYM_INFO.instagramUrl} target="_blank" rel="noopener noreferrer" className="btn-primary full-width">
                CONTACTAR POR INSTAGRAM
              </a>
              <p className="price-note">Consultas por transferencia o efectivo</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
