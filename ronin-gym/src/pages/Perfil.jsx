import React, { useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useGym } from '../context/GymContext';
import { useNavigate } from 'react-router-dom';
import './Perfil.css';

const HONOR_LEVELS = [
  { min: 0, max: 100, name: 'Ronin', kanji: '浪' },
  { min: 100, max: 300, name: 'Samurai', kanji: '侍' },
  { min: 300, max: 600, name: 'Hatamoto', kanji: '旗' },
  { min: 600, max: 1000, name: 'Daimyo', kanji: '大' },
  { min: 1000, max: Infinity, name: 'Shogun', kanji: '将' },
];

function getLevel(points) {
  return HONOR_LEVELS.find(l => points >= l.min && points < l.max) || HONOR_LEVELS[0];
}

function getNextLevel(points) {
  const idx = HONOR_LEVELS.findIndex(l => points >= l.min && points < l.max);
  return idx < HONOR_LEVELS.length - 1 ? HONOR_LEVELS[idx + 1] : null;
}

export default function Perfil() {
  const { currentUser } = useAuth();
  const {
    primaryExercises,
    getActiveRoutineForUser,
    getExerciseLogs,
    getUserActivity,
    addExerciseLog,
  } = useGym();
  const navigate = useNavigate();
  const [logForm, setLogForm] = useState({
    exercise: primaryExercises[0],
    weight: '',
    reps: '',
    date: new Date().toISOString().slice(0, 10),
  });

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  const activeRoutine = getActiveRoutineForUser(currentUser);
  const logs = getExerciseLogs(currentUser);
  const activity = getUserActivity(currentUser);

  const level = getLevel(currentUser.honorPoints);
  const nextLevel = getNextLevel(currentUser.honorPoints);
  const progress = nextLevel
    ? ((currentUser.honorPoints - level.min) / (nextLevel.min - level.min)) * 100
    : 100;

  const bestMarks = useMemo(() => {
    const marks = {};
    logs.forEach((entry) => {
      const current = marks[entry.exercise];
      if (!current || entry.weight > current.weight) {
        marks[entry.exercise] = entry;
      }
    });
    return marks;
  }, [logs]);

  const handleAddLog = (e) => {
    e.preventDefault();
    addExerciseLog(logForm, currentUser);
    setLogForm((prev) => ({ ...prev, weight: '', reps: '' }));
  };

  return (
    <main className="page-perfil">
      <div className="page-header-banner">
        <div className="page-bg-kanji">{level.kanji}</div>
        <div className="page-header-inner">
          <span className="section-tag">— PERFIL</span>
          <h1 className="page-title">{currentUser.name.split(' ')[0].toUpperCase()}</h1>
          <span className="perfil-role-badge">{currentUser.role.toUpperCase()}</span>
        </div>
      </div>

      <div className="perfil-content">
        {/* Honor Points */}
        <div className="honor-section">
          <div className="honor-card">
            <div className="honor-kanji-big">{level.kanji}</div>
            <div className="honor-info">
              <span className="honor-label">Puntos de Honor</span>
              <div className="honor-points">{currentUser.honorPoints.toLocaleString()}</div>
              <div className="honor-level-name">{level.name}</div>
              {nextLevel && (
                <>
                  <div className="honor-progress-bar">
                    <div className="honor-progress-fill" style={{ width: `${progress}%` }} />
                  </div>
                  <span className="honor-next">
                    {nextLevel.min - currentUser.honorPoints} pts para {nextLevel.name}
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="honor-levels-grid">
            {HONOR_LEVELS.map(l => (
              <div key={l.name} className={`level-item ${level.name === l.name ? 'current' : ''}`}>
                <span className="level-k">{l.kanji}</span>
                <span className="level-n">{l.name}</span>
                <span className="level-pts">{l.min}+ pts</span>
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="perfil-info-grid">
          <div className="info-card">
            <span className="info-label">Email</span>
            <span className="info-value">{currentUser.email}</span>
          </div>
          <div className="info-card">
            <span className="info-label">Miembro desde</span>
            <span className="info-value">{currentUser.memberSince}</span>
          </div>
          <div className="info-card">
            <span className="info-label">Plan activo</span>
            <span className="info-value red">Pase Libre</span>
          </div>
        </div>

        <div className="my-routine-section">
          <h2 className="subsection-title">RUTINA Y ACTIVIDAD</h2>
          {activeRoutine ? (
            <>
              <div className="my-routine-name">
                Rutina activa: {activeRoutine.routine.name} ({activeRoutine.source === 'public' ? 'Publica' : 'Personal'})
              </div>
              <div className="my-routine-grid">
                {activeRoutine.routine.split.map((d) => (
                  <div key={`${activeRoutine.routine.id}-${d.day}`} className="my-routine-day">
                    <span className="routine-day-label">{d.day}</span>
                    <ul className="routine-ex-list">
                      <li>Musculos: {d.muscles.join(', ') || 'Sin definir'}</li>
                      <li>Ejercicios: {d.exercises}</li>
                    </ul>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="my-routine-name">No hay una rutina activa seleccionada.</div>
          )}

          {currentUser.role !== 'socio' && (
            <div className="activity-list">
              <h3 className="activity-title">Rutinas y maquinas que creaste/editaste</h3>
              {activity.map((entry) => (
                <div key={entry.id} className="activity-row">
                  <span>{entry.message}</span>
                  <span>{entry.date}</span>
                </div>
              ))}
              {!activity.length && <p className="activity-empty">Todavia no registraste acciones.</p>}
            </div>
          )}
        </div>

        <div className="my-routine-section">
          <h2 className="subsection-title">MARCAS DE FUERZA</h2>
          <form className="marks-form" onSubmit={handleAddLog}>
            <select
              className="config-input"
              value={logForm.exercise}
              onChange={(e) => setLogForm((prev) => ({ ...prev, exercise: e.target.value }))}
            >
              {primaryExercises.map((exercise) => (
                <option key={exercise} value={exercise}>{exercise}</option>
              ))}
            </select>
            <input
              className="config-input"
              type="number"
              min="0"
              step="0.5"
              placeholder="Peso (kg)"
              value={logForm.weight}
              onChange={(e) => setLogForm((prev) => ({ ...prev, weight: e.target.value }))}
              required
            />
            <input
              className="config-input"
              type="number"
              min="1"
              placeholder="Repeticiones"
              value={logForm.reps}
              onChange={(e) => setLogForm((prev) => ({ ...prev, reps: e.target.value }))}
              required
            />
            <input
              className="config-input"
              type="date"
              value={logForm.date}
              onChange={(e) => setLogForm((prev) => ({ ...prev, date: e.target.value }))}
            />
            <button className="btn-primary" type="submit">Guardar marca</button>
          </form>

          <div className="marks-grid">
            {primaryExercises.map((exercise) => (
              <div key={exercise} className="mark-card">
                <span className="mark-exercise">{exercise}</span>
                {bestMarks[exercise] ? (
                  <>
                    <strong>{bestMarks[exercise].weight} kg</strong>
                    <span>{bestMarks[exercise].reps} reps</span>
                  </>
                ) : (
                  <span>Sin marca registrada</span>
                )}
              </div>
            ))}
          </div>

          <div className="activity-list">
            <h3 className="activity-title">Historial de cargas</h3>
            {logs.map((entry) => (
              <div key={entry.id} className="activity-row">
                <span>{entry.exercise}: {entry.weight} kg x {entry.reps} reps</span>
                <span>{entry.date}</span>
              </div>
            ))}
            {!logs.length && <p className="activity-empty">Aun no hay cargas registradas.</p>}
          </div>
        </div>
      </div>
    </main>
  );
}
