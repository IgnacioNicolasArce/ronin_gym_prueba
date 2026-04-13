import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useGym } from '../context/GymContext';
import { useNavigate } from 'react-router-dom';
import './ArmarRutina.css';

const MUSCLE_GROUPS = ['Pecho', 'Espalda', 'Hombros', 'Bíceps', 'Tríceps', 'Cuádriceps', 'Isquiotibiales', 'Glúteos', 'Pantorrillas', 'Core'];
const DAYS_OPTIONS = [3, 4, 5, 6];

export default function ArmarRutina() {
  const { currentUser } = useAuth();
  const { machines, createPublicRoutine } = useGym();
  const navigate = useNavigate();

  const [routineName, setRoutineName] = useState('');
  const [days, setDays] = useState(4);
  const [dayPlans, setDayPlans] = useState({});
  const [savedMsg, setSavedMsg] = useState(false);

  if (!currentUser || (currentUser.role !== 'profesor' && currentUser.role !== 'admin')) {
    navigate('/login');
    return null;
  }

  const dayNames = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const activeDays = dayNames.slice(0, days);

  const toggleMuscle = (day, muscle) => {
    setDayPlans(prev => {
      const muscles = prev[day]?.muscles || [];
      const updated = muscles.includes(muscle)
        ? muscles.filter(m => m !== muscle)
        : [...muscles, muscle];
      return { ...prev, [day]: { ...prev[day], muscles: updated } };
    });
  };

  const toggleExercise = (day, exName) => {
    setDayPlans(prev => {
      const exs = prev[day]?.exercises || [];
      const updated = exs.includes(exName)
        ? exs.filter(e => e !== exName)
        : [...exs, exName];
      return { ...prev, [day]: { ...prev[day], exercises: updated } };
    });
  };

  const handleSave = () => {
    const split = activeDays.map((day) => {
      const plan = dayPlans[day] || {};
      return {
        day,
        muscles: plan.muscles || [],
        exercises: (plan.exercises || []).length,
      };
    });

    createPublicRoutine({
      name: routineName,
      description: `Rutina creada por ${currentUser.name}`,
      days,
      level: 'Intermedio',
      split,
    }, currentUser);

    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 3000);
    setRoutineName('');
    setDayPlans({});
  };

  return (
    <main className="page-armar">
      <div className="page-header-banner">
        <div className="page-bg-kanji">組</div>
        <div className="page-header-inner">
          <span className="section-tag">— PROFESOR</span>
          <h1 className="page-title">ARMAR RUTINA</h1>
        </div>
      </div>

      <div className="page-content">
        {/* Config básica */}
        <div className="armar-config">
          <div className="config-field">
            <label className="config-label">Nombre de la rutina</label>
            <input
              className="config-input"
              placeholder="ej. Rutina Fuerza — 4 días"
              value={routineName}
              onChange={e => setRoutineName(e.target.value)}
            />
          </div>
          <div className="config-field">
            <label className="config-label">Cantidad de días</label>
            <div className="days-selector">
              {DAYS_OPTIONS.map(d => (
                <button
                  key={d}
                  className={`day-opt ${days === d ? 'active' : ''}`}
                  onClick={() => setDays(d)}
                >
                  {d} días
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="jp-divider" />

        {/* Plan por día */}
        <div className="days-builder">
          {activeDays.map(day => {
            const plan = dayPlans[day] || {};
            const muscles = plan.muscles || [];
            const exercises = plan.exercises || [];

            return (
              <div key={day} className="day-builder-card">
                <div className="day-builder-header">
                  <span className="day-builder-name">{day}</span>
                  <span className="day-builder-count">{exercises.length} ejercicios</span>
                </div>

                <div className="builder-section">
                  <span className="builder-section-label">Grupos musculares</span>
                  <div className="muscle-chips-row">
                    {MUSCLE_GROUPS.map(m => (
                      <button
                        key={m}
                        className={`muscle-chip-btn ${muscles.includes(m) ? 'active' : ''}`}
                        onClick={() => toggleMuscle(day, m)}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="builder-section">
                  <span className="builder-section-label">Ejercicios / Máquinas</span>
                  <div className="ex-chips-row">
                    {machines.map(m => (
                      <button
                        key={m.id}
                        className={`ex-chip-btn ${exercises.includes(m.name) ? 'active' : ''}`}
                        onClick={() => toggleExercise(day, m.name)}
                      >
                        {m.name}
                      </button>
                    ))}
                  </div>
                </div>

                {exercises.length > 0 && (
                  <div className="selected-exercises">
                    <span className="builder-section-label">Seleccionados</span>
                    <ul className="selected-ex-list">
                      {exercises.map(ex => (
                        <li key={ex}>
                          <span>{ex}</span>
                          <button className="ex-remove" onClick={() => toggleExercise(day, ex)}>✕</button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="armar-footer">
          <button className="btn-primary" onClick={handleSave} disabled={!routineName}>
            GUARDAR RUTINA
          </button>
          {savedMsg && <span className="saved-msg">✓ Rutina guardada exitosamente</span>}
        </div>
      </div>
    </main>
  );
}
