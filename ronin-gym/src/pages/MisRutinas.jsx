import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useGym } from '../context/GymContext';
import { useNavigate } from 'react-router-dom';
import './MisRutinas.css';

const DAY_NAMES = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];

function buildSplit(days) {
  return DAY_NAMES.slice(0, Number(days)).map((day) => ({
    day,
    muscles: [],
    exercises: 0,
  }));
}

const EMPTY_EDITOR = {
  id: null,
  sourcePublicId: null,
  name: '',
  description: '',
  days: 3,
  level: 'Principiante',
  split: buildSplit(3),
};

export default function MisRutinas() {
  const { currentUser } = useAuth();
  const {
    publicRoutines,
    pendingRoutineSubmissions,
    getPersonalRoutines,
    getActiveRoutineForUser,
    savePersonalRoutine,
    clonePublicRoutineToPersonal,
    setActiveRoutine,
    submitRoutineForApproval,
    approveRoutineSubmission,
  } = useGym();
  const navigate = useNavigate();
  const [editor, setEditor] = useState(EMPTY_EDITOR);

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  const personalRoutines = getPersonalRoutines(currentUser);
  const activeRoutine = getActiveRoutineForUser(currentUser);
  const canApprove = currentUser.role === 'profesor' || currentUser.role === 'admin';

  const handleDaysChange = (value) => {
    const days = Number(value);
    setEditor((prev) => {
      const nextSplit = buildSplit(days).map((item, index) => ({
        ...item,
        ...(prev.split[index] || {}),
      }));
      return { ...prev, days, split: nextSplit };
    });
  };

  const handleSave = () => {
    const saved = savePersonalRoutine(editor, currentUser);
    if (saved) {
      setEditor(saved);
    }
  };

  const handleUsePublicTemplate = (routineId) => {
    const clone = clonePublicRoutineToPersonal(routineId, currentUser);
    if (clone) {
      setEditor(clone);
    }
  };

  const loadEditorFromPersonal = (routine) => {
    setEditor({
      ...routine,
      split: routine.split || buildSplit(routine.days || 3),
    });
  };

  const resetEditor = () => setEditor(EMPTY_EDITOR);

  return (
    <main className="page-mis-rutinas">
      <div className="page-header-banner">
        <div className="page-bg-kanji">型</div>
        <div className="page-header-inner">
          <span className="section-tag">— MIS RUTINAS</span>
          <h1 className="page-title">ENTRENAMIENTO</h1>
        </div>
      </div>

      <div className="page-content">
        <div className="routine-meta">
          <div className="routine-meta-item">
            <span className="meta-label">Rutina activa</span>
            <span className="meta-value">{activeRoutine?.routine?.name || 'Sin asignar'}</span>
          </div>
          <div className="routine-meta-item">
            <span className="meta-label">Origen</span>
            <span className="meta-value">{activeRoutine ? (activeRoutine.source === 'public' ? 'Biblioteca publica' : 'Rutina personal') : '---'}</span>
          </div>
          <div className="routine-meta-item">
            <span className="meta-label">Nivel</span>
            <span className="meta-value">{activeRoutine?.routine?.level || '---'}</span>
          </div>
        </div>

        <div className="jp-divider" />

        <section className="library-section">
          <h2 className="subsection-title">Biblioteca de rutinas</h2>
          <div className="library-grid">
            {publicRoutines.map((routine) => (
              <div key={routine.id} className="library-card">
                <h3>{routine.name}</h3>
                <p>{routine.description}</p>
                <span>{routine.days} dias - {routine.level}</span>
                <div className="library-actions">
                  <button className="btn-mini" onClick={() => setActiveRoutine('public', routine.id, currentUser)}>
                    Usar activa
                  </button>
                  <button className="btn-mini" onClick={() => handleUsePublicTemplate(routine.id)}>
                    Copiar y editar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="jp-divider" />

        <section>
          <h2 className="subsection-title">Editor de mi rutina</h2>
          <div className="editor-box">
            <div className="editor-head-actions">
              <button className="btn-mini" onClick={resetEditor}>Nueva rutina</button>
              {editor.id && (
                <button className="btn-mini" onClick={() => setActiveRoutine('personal', editor.id, currentUser)}>
                  Marcar como activa
                </button>
              )}
            </div>

            <div className="editor-grid">
              <input
                className="config-input"
                placeholder="Nombre"
                value={editor.name}
                onChange={(e) => setEditor((prev) => ({ ...prev, name: e.target.value }))}
              />
              <select
                className="config-input"
                value={editor.level}
                onChange={(e) => setEditor((prev) => ({ ...prev, level: e.target.value }))}
              >
                <option>Principiante</option>
                <option>Intermedio</option>
                <option>Avanzado</option>
              </select>
              <input
                className="config-input"
                type="number"
                min="3"
                max="6"
                value={editor.days}
                onChange={(e) => handleDaysChange(e.target.value)}
              />
              <textarea
                className="config-input editor-textarea"
                placeholder="Descripcion"
                value={editor.description}
                onChange={(e) => setEditor((prev) => ({ ...prev, description: e.target.value }))}
              />
            </div>

            <div className="split-editor-grid">
              {editor.split.map((day, index) => (
                <div key={`${day.day}-${index}`} className="split-edit-card">
                  <input
                    className="config-input"
                    value={day.day}
                    onChange={(e) => setEditor((prev) => {
                      const split = [...prev.split];
                      split[index] = { ...split[index], day: e.target.value };
                      return { ...prev, split };
                    })}
                  />
                  <input
                    className="config-input"
                    placeholder="Musculos separados por coma"
                    value={day.muscles.join(', ')}
                    onChange={(e) => setEditor((prev) => {
                      const split = [...prev.split];
                      split[index] = {
                        ...split[index],
                        muscles: e.target.value
                          .split(',')
                          .map((part) => part.trim())
                          .filter(Boolean),
                      };
                      return { ...prev, split };
                    })}
                  />
                  <input
                    className="config-input"
                    type="number"
                    min="0"
                    placeholder="Cantidad de ejercicios"
                    value={day.exercises}
                    onChange={(e) => setEditor((prev) => {
                      const split = [...prev.split];
                      split[index] = { ...split[index], exercises: Number(e.target.value) || 0 };
                      return { ...prev, split };
                    })}
                  />
                </div>
              ))}
            </div>

            <div className="editor-actions">
              <button className="btn-primary" onClick={handleSave} disabled={!editor.name}>
                Guardar en Mis Rutinas
              </button>
              {editor.id && (
                <button className="btn-mini" onClick={() => submitRoutineForApproval(editor.id, currentUser)}>
                  Enviar a aprobacion
                </button>
              )}
            </div>
          </div>
        </section>

        <div className="jp-divider" />

        <section>
          <h2 className="subsection-title">Mis rutinas guardadas</h2>
          <div className="full-routine-grid">
            {personalRoutines.map((routine) => (
              <div key={routine.id} className="full-day-card">
                <div className="full-day-header">
                  <span className="full-day-name">{routine.name}</span>
                  <span className="full-day-focus">{routine.status}</span>
                </div>
                <table className="exercise-table">
                  <thead>
                    <tr>
                      <th>Dia</th>
                      <th>Musculos</th>
                      <th>Ejercicios</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(routine.split || []).map((day) => (
                      <tr key={`${routine.id}-${day.day}`}>
                        <td>{day.day}</td>
                        <td>{day.muscles.join(', ') || '-'}</td>
                        <td>{day.exercises}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="routine-inline-actions">
                  <button className="btn-mini" onClick={() => loadEditorFromPersonal(routine)}>Editar</button>
                  <button className="btn-mini" onClick={() => setActiveRoutine('personal', routine.id, currentUser)}>Usar activa</button>
                  <button className="btn-mini" onClick={() => submitRoutineForApproval(routine.id, currentUser)}>Enviar a aprobacion</button>
                </div>
              </div>
            ))}
            {!personalRoutines.length && <p className="empty-text">Todavia no guardaste rutinas personales.</p>}
          </div>
        </section>

        {canApprove && (
          <>
            <div className="jp-divider" />
            <section>
              <h2 className="subsection-title">Pendientes de aprobacion</h2>
              <div className="pending-list">
                {pendingRoutineSubmissions.map((item) => (
                  <div key={item.id} className="pending-card">
                    <div>
                      <strong>{item.routine.name}</strong>
                      <p>Solicitante: {item.ownerName}</p>
                      <p>Fecha: {item.requestedAt}</p>
                    </div>
                    <button className="btn-mini" onClick={() => approveRoutineSubmission(item.id, currentUser)}>
                      Aprobar y publicar
                    </button>
                  </div>
                ))}
                {!pendingRoutineSubmissions.length && <p className="empty-text">No hay solicitudes pendientes.</p>}
              </div>
            </section>
          </>
        )}

      </div>
    </main>
  );
}
