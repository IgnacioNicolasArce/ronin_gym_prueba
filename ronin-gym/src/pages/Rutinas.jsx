import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useGym } from '../context/GymContext';
import './Rutinas.css';

const LEVEL_COLOR = { Principiante: '#22c55e', Intermedio: '#eab308', Avanzado: '#cc1a1a' };
const DAY_NAMES = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];

const EMPTY_FORM = {
  name: '',
  description: '',
  days: 3,
  level: 'Principiante',
};

function buildSplit(days) {
  return DAY_NAMES.slice(0, Number(days)).map((day) => ({
    day,
    muscles: [],
    exercises: 0,
  }));
}

export default function Rutinas() {
  const { currentUser } = useAuth();
  const { publicRoutines, createPublicRoutine, updatePublicRoutine, deletePublicRoutine } = useGym();
  const [selected, setSelected] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const canManage = currentUser && (currentUser.role === 'profesor' || currentUser.role === 'admin');

  const handleSaveRoutine = (e) => {
    e.preventDefault();
    if (!canManage) return;

    const payload = {
      name: form.name,
      description: form.description,
      days: Number(form.days),
      level: form.level,
      split: buildSplit(Number(form.days)),
    };

    if (editingId) {
      updatePublicRoutine(editingId, payload, currentUser);
    } else {
      createPublicRoutine(payload, currentUser);
    }

    setEditingId(null);
    setForm(EMPTY_FORM);
  };

  const startEdit = (routine) => {
    setEditingId(routine.id);
    setForm({
      name: routine.name,
      description: routine.description,
      days: routine.days,
      level: routine.level,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
  };

  return (
    <main className="page-rutinas">
      <div className="page-header-banner">
        <div className="page-bg-kanji">型</div>
        <div className="page-header-inner">
          <span className="section-tag">— PROGRAMACIÓN</span>
          <h1 className="page-title">RUTINAS</h1>
          <p className="page-subtitle">Elegí cuántos días y el camino se traza solo</p>
        </div>
      </div>

      <div className="page-content">
        {canManage && (
          <form className="crud-panel" onSubmit={handleSaveRoutine}>
            <div className="crud-panel-head">
              <h3>{editingId ? 'Editar rutina publica' : 'Nueva rutina publica'}</h3>
              {editingId && (
                <button type="button" className="btn-mini" onClick={cancelEdit}>Cancelar</button>
              )}
            </div>

            <div className="crud-grid">
              <input
                className="config-input"
                placeholder="Nombre"
                value={form.name}
                onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                required
              />
              <select
                className="config-input"
                value={form.level}
                onChange={(e) => setForm((prev) => ({ ...prev, level: e.target.value }))}
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
                value={form.days}
                onChange={(e) => setForm((prev) => ({ ...prev, days: e.target.value }))}
                required
              />
              <textarea
                className="config-input crud-textarea"
                placeholder="Descripcion"
                value={form.description}
                onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                required
              />
            </div>

            <button className="btn-primary" type="submit">
              {editingId ? 'GUARDAR CAMBIOS' : 'CREAR RUTINA'}
            </button>
          </form>
        )}

        <div className="routines-list">
          {publicRoutines.map((routine) => (
            <div
              key={routine.id}
              className={`routine-row ${selected === routine.id ? 'open' : ''}`}
            >
              <div
                className="routine-header-row"
                onClick={() => setSelected(selected === routine.id ? null : routine.id)}
              >
                {canManage && (
                  <div className="routine-admin-actions" onClick={(e) => e.stopPropagation()}>
                    <button className="btn-mini" onClick={() => startEdit(routine)}>Editar</button>
                    <button className="btn-mini danger" onClick={() => deletePublicRoutine(routine.id, currentUser)}>Borrar</button>
                  </div>
                )}
                <div className="routine-days-badge">
                  <span className="days-num">{routine.days}</span>
                  <span className="days-label">días</span>
                </div>
                <div className="routine-info">
                  <span className="routine-level" style={{ color: LEVEL_COLOR[routine.level] }}>
                    {routine.level}
                  </span>
                  <h3 className="routine-name">{routine.name}</h3>
                  <p className="routine-desc">{routine.description}</p>
                  <span className="routine-meta-created">Creada por: {routine.createdBy || 'Sistema'}</span>
                </div>
                <div className="routine-toggle">
                  {selected === routine.id ? '−' : '+'}
                </div>
              </div>

              {selected === routine.id && (
                <div className="routine-detail">
                  <div className="jp-divider" />
                  <div className="split-grid">
                    {routine.split.map((day, j) => (
                      <div key={j} className="split-card">
                        <span className="split-day">{day.day}</span>
                        <div className="split-muscles">
                          {day.muscles.map(m => (
                            <span key={m} className="muscle-chip">{m}</span>
                          ))}
                        </div>
                        <span className="split-exercises">{day.exercises} ejercicios</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
