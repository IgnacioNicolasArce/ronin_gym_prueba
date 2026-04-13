import React, { useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useGym } from '../context/GymContext';
import './Maquinas.css';

const EMPTY_FORM = {
  name: '',
  muscle: '',
  description: '',
  videoUrl: '',
  category: '',
};

export default function Maquinas() {
  const { currentUser } = useAuth();
  const { machines, createMachine, updateMachine, deleteMachine } = useGym();
  const [activeCategory, setActiveCategory] = useState('Todas');
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);

  const canManage = currentUser && (currentUser.role === 'profesor' || currentUser.role === 'admin');

  const categories = useMemo(() => {
    const all = new Set(machines.map((m) => m.category));
    return ['Todas', ...Array.from(all)];
  }, [machines]);

  const filtered = activeCategory === 'Todas'
    ? machines
    : machines.filter((m) => m.category === activeCategory);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!canManage) return;

    const payload = {
      name: form.name,
      muscle: form.muscle,
      description: form.description,
      videoUrl: form.videoUrl,
      category: form.category,
    };

    if (editingId) {
      updateMachine(editingId, payload, currentUser);
    } else {
      createMachine(payload, currentUser);
    }

    setForm(EMPTY_FORM);
    setEditingId(null);
  };

  const startEdit = (machine) => {
    setEditingId(machine.id);
    setForm({
      name: machine.name,
      muscle: machine.muscle,
      description: machine.description,
      videoUrl: machine.videoUrl,
      category: machine.category,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
  };

  return (
    <main className="page-maquinas">
      <div className="page-header-banner">
        <div className="page-bg-kanji">機</div>
        <div className="page-header-inner">
          <span className="section-tag">— EQUIPAMIENTO</span>
          <h1 className="page-title">MÁQUINAS</h1>
          <p className="page-subtitle">Cada máquina, una herramienta del guerrero</p>
        </div>
      </div>

      <div className="page-content">
        {canManage && (
          <form className="crud-panel" onSubmit={handleFormSubmit}>
            <div className="crud-panel-head">
              <h3>{editingId ? 'Editar maquina' : 'Nueva maquina'}</h3>
              {editingId && (
                <button type="button" className="btn-mini" onClick={cancelEdit}>
                  Cancelar
                </button>
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
              <input
                className="config-input"
                placeholder="Musculo"
                value={form.muscle}
                onChange={(e) => setForm((prev) => ({ ...prev, muscle: e.target.value }))}
                required
              />
              <input
                className="config-input"
                placeholder="Categoria"
                value={form.category}
                onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
                required
              />
              <input
                className="config-input"
                placeholder="URL video"
                value={form.videoUrl}
                onChange={(e) => setForm((prev) => ({ ...prev, videoUrl: e.target.value }))}
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
              {editingId ? 'GUARDAR CAMBIOS' : 'CREAR MAQUINA'}
            </button>
          </form>
        )}

        {/* Filtros */}
        <div className="category-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`cat-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="machines-grid">
          {filtered.map((machine) => (
            <div
              key={machine.id}
              className="machine-card"
              onClick={() => setSelectedMachine(machine)}
            >
              {canManage && (
                <div className="machine-actions" onClick={(e) => e.stopPropagation()}>
                  <button className="btn-mini" onClick={() => startEdit(machine)}>Editar</button>
                  <button className="btn-mini danger" onClick={() => deleteMachine(machine.id, currentUser)}>Borrar</button>
                </div>
              )}
              <div className="machine-cat-tag">{machine.category}</div>
              <div className="machine-num">
                {String(machine.id).padStart(2, '0')}
              </div>
              <h3 className="machine-name">{machine.name}</h3>
              <span className="machine-muscle">{machine.muscle}</span>
              <p className="machine-desc">{machine.description}</p>
              <p className="machine-updated">Editado por: {machine.updatedBy || 'Sistema'}</p>
              <div className="machine-footer">
                <span className="machine-video-link">
                  ▶ Ver técnica
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedMachine && (
        <div className="modal-overlay" onClick={() => setSelectedMachine(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedMachine(null)}>✕</button>
            <div className="modal-header">
              <span className="machine-cat-tag">{selectedMachine.category}</span>
              <h2 className="modal-title">{selectedMachine.name}</h2>
              <p className="modal-muscle">{selectedMachine.muscle}</p>
            </div>
            <p className="modal-desc">{selectedMachine.description}</p>
            <div className="modal-video-area">
              <a
                href={selectedMachine.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                ▶ VER VIDEO TUTORIAL
              </a>
              <p className="modal-video-note">Se abre en YouTube</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
