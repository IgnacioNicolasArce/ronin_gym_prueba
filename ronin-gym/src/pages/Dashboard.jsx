import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useGym } from '../context/GymContext';
import { useNavigate } from 'react-router-dom';
import { DASHBOARD_DATA } from '../data/gymData';
import './Dashboard.css';

const TABS = ['Resumen', 'Asistencia', 'Socios', 'Lockers', 'Stock'];

export default function Dashboard() {
  const { currentUser } = useAuth();
  const {
    lockers,
    stock,
    addLocker,
    updateLocker,
    deleteLocker,
    addStockItem,
    updateStockItem,
    adjustStock,
    removeStockItem,
  } = useGym();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Resumen');
  const [selectedMember, setSelectedMember] = useState(null);
  const [qrInput, setQrInput] = useState('');
  const [qrResult, setQrResult] = useState(null);
  const [editingLocker, setEditingLocker] = useState(null);
  const [lockerForm, setLockerForm] = useState({ number: '', member: '', expires: '', active: true });
  const [editingStock, setEditingStock] = useState(null);
  const [stockForm, setStockForm] = useState({ item: '', quantity: '', min: '', unit: 'unidades' });

  if (!currentUser || currentUser.role !== 'admin') {
    navigate('/login');
    return null;
  }

  const handleQrCheck = () => {
    const found = DASHBOARD_DATA.members.find(m =>
      m.name.toLowerCase().includes(qrInput.toLowerCase()) || m.dni.includes(qrInput)
    );
    setQrResult(found || 'not_found');
  };

  const getStatusColor = (status) => {
    if (status === 'activo') return '#22c55e';
    if (status === 'por_vencer') return '#eab308';
    return '#cc1a1a';
  };

  const getStatusLabel = (status) => {
    if (status === 'activo') return 'ACTIVO';
    if (status === 'por_vencer') return 'POR VENCER';
    return 'VENCIDO';
  };

  const handleLockerSubmit = (e) => {
    e.preventDefault();

    if (editingLocker) {
      updateLocker(editingLocker, {
        member: lockerForm.member,
        expires: lockerForm.expires,
        active: lockerForm.active,
      });
    } else {
      addLocker(lockerForm);
    }

    setEditingLocker(null);
    setLockerForm({ number: '', member: '', expires: '', active: true });
  };

  const startLockerEdit = (locker) => {
    setEditingLocker(locker.number);
    setLockerForm({
      number: locker.number,
      member: locker.member,
      expires: locker.expires,
      active: locker.active,
    });
  };

  const handleStockSubmit = (e) => {
    e.preventDefault();

    if (editingStock) {
      updateStockItem(editingStock, stockForm);
    } else {
      addStockItem(stockForm);
    }

    setEditingStock(null);
    setStockForm({ item: '', quantity: '', min: '', unit: 'unidades' });
  };

  const startStockEdit = (item) => {
    setEditingStock(item.item);
    setStockForm({
      item: item.item,
      quantity: item.quantity,
      min: item.min,
      unit: item.unit,
    });
  };

  return (
    <main className="page-dashboard">
      <div className="page-header-banner">
        <div className="page-bg-kanji">主</div>
        <div className="page-header-inner">
          <span className="section-tag">— ADMINISTRACIÓN</span>
          <h1 className="page-title">DASHBOARD</h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="dashboard-tabs">
        {TABS.map(tab => (
          <button
            key={tab}
            className={`dash-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="page-content">

        {/* ===== RESUMEN ===== */}
        {activeTab === 'Resumen' && (
          <div className="tab-content">
            <div className="kpi-grid">
              <div className="kpi-card green">
                <span className="kpi-label">Socios Activos</span>
                <span className="kpi-number">{DASHBOARD_DATA.activeMembers}</span>
                <span className="kpi-sub">Con membresía vigente</span>
              </div>
              <div className="kpi-card yellow">
                <span className="kpi-label">Por Vencer</span>
                <span className="kpi-number">{DASHBOARD_DATA.soonToExpire}</span>
                <span className="kpi-sub">Próximos 7 días</span>
              </div>
              <div className="kpi-card red">
                <span className="kpi-label">Vencidos</span>
                <span className="kpi-number">{DASHBOARD_DATA.expiredMembers}</span>
                <span className="kpi-sub">Sin membresía activa</span>
              </div>
              <div className="kpi-card neutral">
                <span className="kpi-label">Hoy en el Gym</span>
                <span className="kpi-number">{DASHBOARD_DATA.todayPresent}</span>
                <span className="kpi-sub">Asistencias registradas</span>
              </div>
            </div>

            <div className="dash-section-title">ACTIVIDAD DE HOY</div>
            <div className="today-list">
              {DASHBOARD_DATA.todayCheckedIn.map(member => (
                <div key={member.id} className="today-row">
                  <div className="today-status-dot" style={{
                    background: member.status === 'presente' ? '#22c55e' : '#5a5a5a'
                  }} />
                  <span className="today-name">{member.name}</span>
                  <span className="today-time">{member.time}</span>
                  <span className="today-badge" style={{
                    color: member.status === 'presente' ? '#22c55e' : '#5a5a5a'
                  }}>
                    {member.status === 'presente' ? 'PRESENTE' : 'FUE'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== ASISTENCIA / QR ===== */}
        {activeTab === 'Asistencia' && (
          <div className="tab-content">
            <div className="qr-section">
              <div className="qr-icon-area">
                <div className="qr-mock-icon">
                  <div className="qr-corner tl" /><div className="qr-corner tr" />
                  <div className="qr-corner bl" /><div className="qr-corner br" />
                  <div className="qr-center-dot" />
                  <span className="qr-label-text">QR</span>
                </div>
                <p className="qr-desc">
                  En la implementación final, esta pantalla activará la cámara del dispositivo para escanear el QR del socio al ingresar.
                </p>
              </div>

              <div className="qr-manual">
                <span className="qr-manual-label">Búsqueda manual (Demo)</span>
                <div className="qr-input-row">
                  <input
                    className="config-input"
                    placeholder="Nombre o DNI del socio..."
                    value={qrInput}
                    onChange={e => setQrInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleQrCheck()}
                  />
                  <button className="btn-primary" onClick={handleQrCheck}>VERIFICAR</button>
                </div>

                {qrResult && (
                  <div className={`qr-result ${qrResult === 'not_found' ? 'not-found' : qrResult.status}`}>
                    {qrResult === 'not_found' ? (
                      <span>✕ Socio no encontrado</span>
                    ) : (
                      <div className="qr-result-info">
                        <div className="qr-result-name">{qrResult.name}</div>
                        <div className="qr-result-detail">
                          <span>DNI: {qrResult.dni}</span>
                          <span>Vence: {qrResult.paidUntil}</span>
                          <span style={{ color: getStatusColor(qrResult.status) }}>
                            {getStatusLabel(qrResult.status)}
                          </span>
                        </div>
                        {qrResult.status === 'activo' && (
                          <div className="qr-ok">✓ ACCESO PERMITIDO — Registrando asistencia...</div>
                        )}
                        {qrResult.status !== 'activo' && (
                          <div className="qr-deny">✕ ACCESO DENEGADO — Membresía vencida</div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ===== SOCIOS ===== */}
        {activeTab === 'Socios' && (
          <div className="tab-content">
            <div className="members-table-wrap">
              <table className="members-table">
                <thead>
                  <tr>
                    <th>Socio</th>
                    <th>DNI</th>
                    <th>Estado</th>
                    <th>Vence</th>
                    <th>Último pago</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {DASHBOARD_DATA.members.map(m => (
                    <tr key={m.id}>
                      <td className="member-name-cell">{m.name}</td>
                      <td>{m.dni}</td>
                      <td>
                        <span className="status-pill" style={{ color: getStatusColor(m.status), borderColor: getStatusColor(m.status) }}>
                          {getStatusLabel(m.status)}
                        </span>
                      </td>
                      <td>{m.paidUntil}</td>
                      <td>
                        ${m.payments[0].amount.toLocaleString()} — {m.payments[0].method}
                      </td>
                      <td>
                        <button className="btn-view-member" onClick={() => setSelectedMember(m)}>
                          VER PERFIL
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Modal socio */}
            {selectedMember && (
              <div className="modal-overlay" onClick={() => setSelectedMember(null)}>
                <div className="modal-box" onClick={e => e.stopPropagation()}>
                  <button className="modal-close" onClick={() => setSelectedMember(null)}>✕</button>
                  <div className="member-modal-header">
                    <span className="member-modal-name">{selectedMember.name}</span>
                    <span className="member-modal-dni">DNI {selectedMember.dni}</span>
                    <span className="status-pill" style={{
                      color: getStatusColor(selectedMember.status),
                      borderColor: getStatusColor(selectedMember.status)
                    }}>
                      {getStatusLabel(selectedMember.status)}
                    </span>
                  </div>
                  <div className="jp-divider" />
                  <div className="member-modal-info">
                    <div className="modal-info-row">
                      <span className="modal-info-label">Plan</span>
                      <span className="modal-info-value">{selectedMember.plan}</span>
                    </div>
                    <div className="modal-info-row">
                      <span className="modal-info-label">Válido hasta</span>
                      <span className="modal-info-value">{selectedMember.paidUntil}</span>
                    </div>
                  </div>
                  <div className="jp-divider" />
                  <div className="member-payments-title">HISTORIAL DE PAGOS</div>
                  <div className="member-payments">
                    {selectedMember.payments.map((p, i) => (
                      <div key={i} className="payment-row">
                        <span className="payment-date">{p.date}</span>
                        <span className="payment-amount">${p.amount.toLocaleString()}</span>
                        <span className={`payment-method ${p.method}`}>{p.method.toUpperCase()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ===== LOCKERS ===== */}
        {activeTab === 'Lockers' && (
          <div className="tab-content">
            <form className="admin-form" onSubmit={handleLockerSubmit}>
              <input
                className="config-input"
                type="number"
                min="1"
                placeholder="Numero"
                value={lockerForm.number}
                onChange={(e) => setLockerForm((prev) => ({ ...prev, number: e.target.value }))}
                required
                disabled={Boolean(editingLocker)}
              />
              <input
                className="config-input"
                placeholder="Socio que lo usa"
                value={lockerForm.member}
                onChange={(e) => setLockerForm((prev) => ({ ...prev, member: e.target.value }))}
                required
              />
              <input
                className="config-input"
                type="date"
                value={lockerForm.expires}
                onChange={(e) => setLockerForm((prev) => ({ ...prev, expires: e.target.value }))}
                required
              />
              <label className="checkbox-row">
                <input
                  type="checkbox"
                  checked={lockerForm.active}
                  onChange={(e) => setLockerForm((prev) => ({ ...prev, active: e.target.checked }))}
                />
                Activo
              </label>
              <button className="btn-primary" type="submit">
                {editingLocker ? 'Guardar locker' : 'Crear locker'}
              </button>
            </form>

            <div className="lockers-grid">
              {lockers.map((locker) => (
                <div key={locker.number} className={`locker-card ${locker.active ? 'active' : 'expired'}`}>
                  <div className="locker-number">#{locker.number}</div>
                  <div className="locker-member">{locker.member}</div>
                  <div className="locker-expires">Vence: {locker.expires}</div>
                  <div className="locker-status">
                    {locker.active ? '● ACTIVO' : '● VENCIDO'}
                  </div>
                  <div className="locker-actions">
                    <button className="btn-mini" onClick={() => startLockerEdit(locker)}>Editar</button>
                    <button className="btn-mini" onClick={() => deleteLocker(locker.number)}>Eliminar</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== STOCK ===== */}
        {activeTab === 'Stock' && (
          <div className="tab-content">
            <form className="admin-form" onSubmit={handleStockSubmit}>
              <input
                className="config-input"
                placeholder="Producto"
                value={stockForm.item}
                onChange={(e) => setStockForm((prev) => ({ ...prev, item: e.target.value }))}
                required
              />
              <input
                className="config-input"
                type="number"
                min="0"
                placeholder="Cantidad"
                value={stockForm.quantity}
                onChange={(e) => setStockForm((prev) => ({ ...prev, quantity: e.target.value }))}
                required
              />
              <input
                className="config-input"
                type="number"
                min="0"
                placeholder="Minimo"
                value={stockForm.min}
                onChange={(e) => setStockForm((prev) => ({ ...prev, min: e.target.value }))}
                required
              />
              <input
                className="config-input"
                placeholder="Unidad"
                value={stockForm.unit}
                onChange={(e) => setStockForm((prev) => ({ ...prev, unit: e.target.value }))}
              />
              <button className="btn-primary" type="submit">
                {editingStock ? 'Guardar producto' : 'Agregar producto'}
              </button>
            </form>

            <div className="stock-list">
              {stock.map((item) => {
                const base = item.min > 0 ? item.min * 3 : 1;
                const pct = Math.min(100, (item.quantity / base) * 100);
                const isLow = item.quantity <= item.min;
                return (
                  <div key={item.item} className="stock-row">
                    <div className="stock-info">
                      <span className="stock-name">{item.item}</span>
                      <span className="stock-qty" style={{ color: isLow ? '#cc1a1a' : '#22c55e' }}>
                        {item.quantity} {item.unit}
                        {isLow && <span className="stock-alert"> ⚠ BAJO STOCK</span>}
                      </span>
                    </div>
                    <div className="stock-bar-wrap">
                      <div
                        className="stock-bar-fill"
                        style={{
                          width: `${pct}%`,
                          background: isLow ? '#cc1a1a' : pct < 60 ? '#eab308' : '#22c55e'
                        }}
                      />
                    </div>
                    <span className="stock-min">Mín: {item.min} {item.unit}</span>
                    <div className="stock-actions">
                      <button className="btn-mini" onClick={() => adjustStock(item.item, -1)}>-1</button>
                      <button className="btn-mini" onClick={() => adjustStock(item.item, 1)}>+1</button>
                      <button className="btn-mini" onClick={() => startStockEdit(item)}>Editar</button>
                      <button className="btn-mini" onClick={() => removeStockItem(item.item)}>Eliminar</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
