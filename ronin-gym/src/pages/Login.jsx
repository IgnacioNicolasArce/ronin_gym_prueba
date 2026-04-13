import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const ROLES = [
  { key: 'socio', label: 'SOCIO', kanji: '生', desc: 'Accedé a tus rutinas y puntos de honor' },
  { key: 'profesor', label: 'PROFESOR', kanji: '師', desc: 'Armá rutinas y gestioná tu entrenamiento' },
  { key: 'admin', label: 'ADMIN', kanji: '主', desc: 'Dashboard completo del gimnasio' },
];

export default function Login() {
  const [selectedRole, setSelectedRole] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!selectedRole) return;
    login(selectedRole);
    if (selectedRole === 'admin') navigate('/dashboard');
    else navigate('/perfil');
  };

  return (
    <main className="page-login">
      <div className="login-bg-kanji">入</div>
      <div className="login-box">
        <div className="login-header">
          <span className="logo-kanji-login">浪人</span>
          <span className="logo-text-login">RONIN</span>
        </div>
        <div className="jp-divider" />
        <h2 className="login-title">INGRESAR</h2>
        <p className="login-sub">Seleccioná tu rol para continuar</p>

        <div className="role-grid">
          {ROLES.map(role => (
            <button
              key={role.key}
              className={`role-card ${selectedRole === role.key ? 'active' : ''}`}
              onClick={() => setSelectedRole(role.key)}
            >
              <span className="role-kanji">{role.kanji}</span>
              <span className="role-label">{role.label}</span>
              <span className="role-desc">{role.desc}</span>
            </button>
          ))}
        </div>

        <button
          className={`btn-login-full ${!selectedRole ? 'disabled' : ''}`}
          onClick={handleLogin}
          disabled={!selectedRole}
        >
          ENTRAR
        </button>

        <p className="login-note">
          Demo sin autenticación real — solo para demostración del UI
        </p>
      </div>
    </main>
  );
}
