import { useMemo, useState } from 'react'
import './App.css'
import roninLogo from './assets/ronin-logo.svg'
import samuraiPattern from './assets/samurai-pattern.svg'

const menuItems = [
  { id: 'landing', label: 'Inicio' },
  { id: 'machines', label: 'Maquinas' },
  { id: 'calendar', label: 'Calendario' },
  { id: 'ideas', label: 'Ideas Gym' },
  { id: 'profile', label: 'Perfil' },
]

const teamMembers = [
  {
    name: 'Luz Martinez',
    role: 'Coach de fuerza',
    focus: 'Sobrecarga progresiva y tecnica de levantamiento',
  },
  {
    name: 'Bruno Diaz',
    role: 'Preparador fisico',
    focus: 'Acondicionamiento general y resistencia',
  },
  {
    name: 'Camila Ortiz',
    role: 'Coach de movilidad',
    focus: 'Prevencion de lesiones y recuperacion activa',
  },
]

const classCalendar = [
  { day: 'Lunes', block: '08:00', className: 'Full Body Iniciacion', coach: 'Luz' },
  { day: 'Lunes', block: '19:00', className: 'Fuerza Tren Superior', coach: 'Bruno' },
  { day: 'Miercoles', block: '18:30', className: 'Funcional Metabolico', coach: 'Camila' },
  { day: 'Viernes', block: '20:00', className: 'Piernas y Core', coach: 'Luz' },
  { day: 'Sabado', block: '11:00', className: 'Clase de Tecnica General', coach: 'Bruno' },
]

const machineCatalog = [
  {
    name: 'Press de pecho convergente',
    zone: 'Pecho y triceps',
    model: 'Hammer Pro X2',
    objective: 'Permite trabajar empuje con trayectoria guiada y segura.',
  },
  {
    name: 'Jalon dorsal con polea alta',
    zone: 'Espalda y biceps',
    model: 'Lat Pull HD',
    objective: 'Ideal para desarrollar espalda en amplitud y control escapular.',
  },
  {
    name: 'Prensa inclinada 45 grados',
    zone: 'Cuadriceps y gluteos',
    model: 'Leg Press 45 Elite',
    objective: 'Trabajo pesado de piernas con buena estabilidad lumbar.',
  },
  {
    name: 'Rack de sentadillas libre',
    zone: 'Fuerza general',
    model: 'Power Rack Titan',
    objective: 'Entrenamiento base para fuerza, hipertrofia y tecnica.',
  },
  {
    name: 'Remo bajo sentado',
    zone: 'Espalda media',
    model: 'Row Station R5',
    objective: 'Ayuda a mejorar postura y fuerza de traccion horizontal.',
  },
  {
    name: 'Bicicleta de aire',
    zone: 'Cardio de alta intensidad',
    model: 'Air Bike Attack',
    objective: 'Intervalos para mejorar capacidad aerobica y anaerobica.',
  },
]

const ideasPages = [
  {
    title: 'Planes y membresias',
    description: 'Comparador claro de planes, beneficios y precio mensual.',
  },
  {
    title: 'Transformaciones de socios',
    description: 'Historias reales con fotos, tiempos y metodologia usada.',
  },
  {
    title: 'Blog de entrenamiento',
    description: 'Notas sobre nutricion, fuerza, descanso y habitos.',
  },
  {
    title: 'Reserva de clases online',
    description: 'Agenda en tiempo real para cupos, espera y confirmaciones.',
  },
  {
    title: 'Evaluacion inicial',
    description: 'Formulario y turnos para diagnostico fisico de nuevos socios.',
  },
  {
    title: 'Tienda del gimnasio',
    description: 'Venta de suplementos, accesorios y merchandising de marca.',
  },
]

const gymInfo = {
  location: 'Av. Libertador 2540, Cordoba Capital',
  phone: '+54 351 555 0147',
  instagramUrl: 'https://instagram.com/ronin_1gym',
  instagramHandle: '@ronin_1gym',
  schedule: [
    'Lunes a Viernes: 08:00 a 22:00',
    'Sabado: 10:00 a 20:00',
    'Domingo: cerrado',
  ],
}

const membershipValueByPlan = {
  'Base Fit': 24000,
  'Samurai Pro': 36000,
  'Shogun Elite': 48000,
}

const initialMembers = [
  { id: 1, name: 'Luca Herrera', plan: 'Samurai Pro', level: 'Intermedio' },
  { id: 2, name: 'Mica Araya', plan: 'Base Fit', level: 'Inicial' },
  { id: 3, name: 'Ivan Mendez', plan: 'Shogun Elite', level: 'Avanzado' },
  { id: 4, name: 'Sofia Rojas', plan: 'Samurai Pro', level: 'Intermedio' },
]

function App() {
  const [activeView, setActiveView] = useState('landing')
  const [sessionRole, setSessionRole] = useState(null)
  const [userName, setUserName] = useState('')
  const [members, setMembers] = useState(initialMembers)
  const [memberForm, setMemberForm] = useState({
    name: '',
    plan: 'Base Fit',
    level: 'Inicial',
  })
  const [memberProfile, setMemberProfile] = useState({
    name: 'Akira Tanaka',
    plan: 'Samurai Pro',
    level: 'Intermedio',
    objective: 'Ganar potencia sin perder movilidad',
    attendanceDays: 19,
    streak: 6,
  })

  const adminStats = useMemo(() => {
    const total = members.length
    const advanced = members.filter((item) => item.level === 'Avanzado').length
    const todayCheckIns = Math.max(7, Math.round(total * 0.42))
    const monthlyIncome = members.reduce(
      (amount, item) => amount + membershipValueByPlan[item.plan],
      0,
    )

    return {
      total,
      advanced,
      todayCheckIns,
      monthlyIncome,
    }
  }, [members])

  const honorPoints = useMemo(() => {
    return memberProfile.attendanceDays * 15 + memberProfile.streak * 12
  }, [memberProfile.attendanceDays, memberProfile.streak])

  const honorRank = useMemo(() => {
    if (honorPoints >= 520) {
      return 'Daimyo de Hierro'
    }

    if (honorPoints >= 360) {
      return 'Ronin Veterano'
    }

    return 'Disciplina en Ascenso'
  }, [honorPoints])

  const landingSummary = [
    { label: 'Socios activos', value: adminStats.total },
    { label: 'Check-ins de hoy', value: adminStats.todayCheckIns },
    { label: 'Puntos de honor', value: `${honorPoints} pts` },
  ]

  const isAdmin = sessionRole === 'admin'
  const displayName = userName.trim() || (isAdmin ? 'Administrador Ronin' : 'Socio Ronin')

  const formatCurrency = (value) =>
    new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(value)

  const openSection = (viewId) => {
    setActiveView(viewId)
  }

  const startSession = (role) => {
    setSessionRole(role)
    setActiveView('landing')

    if (!userName.trim()) {
      setUserName(role === 'admin' ? 'Administrador Ronin' : 'Socio Ronin')
    }
  }

  const closeSession = () => {
    setSessionRole(null)
    setActiveView('landing')
  }

  const handleMemberFormChange = (event) => {
    const { name, value } = event.target

    setMemberForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleCreateMember = (event) => {
    event.preventDefault()

    if (!memberForm.name.trim()) {
      return
    }

    const newMember = {
      id: Date.now(),
      name: memberForm.name.trim(),
      plan: memberForm.plan,
      level: memberForm.level,
    }

    setMembers((current) => [newMember, ...current])
    setMemberForm({
      name: '',
      plan: 'Base Fit',
      level: 'Inicial',
    })
  }

  const registerAttendance = () => {
    setMemberProfile((current) => ({
      ...current,
      attendanceDays: current.attendanceDays + 1,
      streak: current.streak + 1,
    }))
  }

  const attendanceLoad = Math.min(100, Math.round((adminStats.todayCheckIns / Math.max(1, adminStats.total)) * 100))
  const advancedRatio = Math.min(100, Math.round((adminStats.advanced / Math.max(1, adminStats.total)) * 100))

  if (!sessionRole) {
    return (
      <div className="app-shell login-shell">
        <div
          className="samurai-pattern"
          style={{ backgroundImage: `url(${samuraiPattern})` }}
          aria-hidden="true"
        />

        <main className="login-panel">
          <div className="brand login-brand">
            <img src={roninLogo} alt="Logo de Ronin" />
            <span className="brand-text">
              <strong>Ronin</strong>
              <small>Gym</small>
            </span>
          </div>

          <h1>Ingresa a tu cuenta para ver el contenido segun tu rol</h1>
          <p>
            Esta maqueta simula login por rol. Si eliges socio veras tu perfil y progresos. Si eliges admin,
            veras panel de control, estadisticas y gestion de socios.
          </p>

          <label htmlFor="login-name">Nombre de usuario</label>
          <input
            id="login-name"
            className="login-input"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
            placeholder="Ej: Franco Gomez"
          />

          <div className="login-actions">
            <button type="button" className="primary-action" onClick={() => startSession('member')}>
              Entrar como socio
            </button>
            <button type="button" className="secondary-action" onClick={() => startSession('admin')}>
              Entrar como admin
            </button>
          </div>
        </main>
      </div>
    )
  }

  const renderLanding = () => (
    <section className="section-card landing-long">
      <div className="hero-copy">
        <p className="kicker">Entrenamiento inteligente y comunidad activa</p>
        <h1>Ronin Gym: fuerza real, progreso medible y resultados sostenibles.</h1>
        <p>
          Ronin Gym esta pensado para personas que recien comienzan y para quienes ya entrenan fuerte. El objetivo
          es simple: que cada socio tenga un plan claro, seguimiento constante y maquinas de calidad para mejorar
          semana a semana.
        </p>

        <div className="cta-row">
          <button type="button" className="primary-action" onClick={() => openSection('machines')}>
            Ver maquinas
          </button>
          <button type="button" className="secondary-action" onClick={() => openSection('calendar')}>
            Ver calendario
          </button>
        </div>
      </div>

      <div className="summary-grid">
        {landingSummary.map((item) => (
          <article key={item.label} className="summary-card">
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </article>
        ))}
      </div>

      <div className="landing-grid">
        <article className="info-card">
          <h3>Que incluye la experiencia</h3>
          <p>Evaluacion inicial y seguimiento mensual.</p>
          <p>Rutinas adaptadas al objetivo de cada socio.</p>
          <p>Zona de peso libre, maquinas y cardio.</p>
          <p>Asesoria tecnica del equipo en cada sesion.</p>
        </article>

        <article className="info-card">
          <h3>Ubicacion y horarios</h3>
          <p>{gymInfo.location}</p>
          {gymInfo.schedule.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </article>
      </div>

      <div className="section-title">
        <p className="kicker">Equipo del gimnasio</p>
        <h2>Profesionales que acompanan tu progreso</h2>
      </div>
      <div className="card-grid">
        {teamMembers.map((member) => (
          <article key={member.name} className="info-card">
            <h3>{member.name}</h3>
            <p className="pill">{member.role}</p>
            <p>{member.focus}</p>
          </article>
        ))}
      </div>

      <div className="section-title">
        <p className="kicker">Maquinas destacadas</p>
        <h2>Equipamiento para fuerza, hipertrofia y cardio</h2>
      </div>
      <div className="machine-preview-grid">
        {machineCatalog.slice(0, 4).map((machine) => (
          <article key={machine.name} className="info-card">
            <h3>{machine.name}</h3>
            <p className="pill">{machine.zone}</p>
            <p>{machine.objective}</p>
          </article>
        ))}
      </div>
    </section>
  )

  const renderMachines = () => (
    <section className="section-card">
      <div className="section-title">
        <p className="kicker">Sala de maquinas</p>
        <h2>Listado completo y ejemplo de uso en video</h2>
      </div>

      <div className="card-grid machine-grid">
        {machineCatalog.map((machine) => (
          <article key={machine.name} className="info-card">
            <h3>{machine.name}</h3>
            <p className="pill">{machine.zone}</p>
            <p>Modelo: {machine.model}</p>
            <p>{machine.objective}</p>
          </article>
        ))}
      </div>

      <article className="video-card">
        <h3>Video de ejemplo: uso correcto de maquina de pecho</h3>
        <p>
          Video de referencia para mostrar tecnica basica. En produccion puedes reemplazarlo por contenido propio
          del gimnasio.
        </p>
        <div className="video-wrapper">
          <iframe
            src="https://www.youtube.com/embed/7j0Yf5gh-4A"
            title="Ejemplo de uso de maquina de pecho"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </article>
    </section>
  )

  const renderCalendar = () => (
    <section className="section-card">
      <div className="section-title">
        <p className="kicker">Calendario de clases</p>
        <h2>Horarios semanales y clases activas</h2>
      </div>

      <div className="calendar-list">
        {classCalendar.map((block) => (
          <article key={`${block.day}-${block.block}-${block.className}`} className="calendar-item">
            <span>{block.day}</span>
            <strong>{block.block}</strong>
            <p>{block.className}</p>
            <small>Coach: {block.coach}</small>
          </article>
        ))}
      </div>

      <article className="info-card location-card">
        <h3>Ubicacion del gimnasio</h3>
        <p>{gymInfo.location}</p>
        {gymInfo.schedule.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </article>
    </section>
  )

  const renderIdeas = () => (
    <section className="section-card">
      <div className="section-title">
        <p className="kicker">Ideas de paginas para gimnasios</p>
        <h2>Secciones utiles para crecer online</h2>
      </div>

      <div className="card-grid">
        {ideasPages.map((idea) => (
          <article key={idea.title} className="info-card">
            <h3>{idea.title}</h3>
            <p>{idea.description}</p>
          </article>
        ))}
      </div>
    </section>
  )

  const renderProfile = () => {
    if (isAdmin) {
      return (
        <section className="section-card">
          <div className="section-title">
            <p className="kicker">Panel de administracion</p>
            <h2>Observabilidad, estadisticas y gestion de socios</h2>
          </div>

          <div className="admin-stats-grid">
            <article className="summary-card">
              <span>Socios totales</span>
              <strong>{adminStats.total}</strong>
            </article>
            <article className="summary-card">
              <span>Check-ins de hoy</span>
              <strong>{adminStats.todayCheckIns}</strong>
            </article>
            <article className="summary-card">
              <span>Nivel avanzado</span>
              <strong>{advancedRatio}%</strong>
            </article>
            <article className="summary-card">
              <span>Ingreso mensual estimado</span>
              <strong>{formatCurrency(adminStats.monthlyIncome)}</strong>
            </article>
          </div>

          <div className="observability-grid">
            <article className="metric-panel">
              <h3>Asistencia diaria</h3>
              <div className="meter">
                <span style={{ width: `${attendanceLoad}%` }} />
              </div>
              <p>{attendanceLoad}% de socios entrenaron hoy.</p>
            </article>

            <article className="metric-panel">
              <h3>Distribucion avanzada</h3>
              <div className="meter">
                <span style={{ width: `${advancedRatio}%` }} />
              </div>
              <p>{advancedRatio}% del plantel esta en nivel avanzado.</p>
            </article>
          </div>

          <div className="admin-layout">
            <form className="member-form" onSubmit={handleCreateMember}>
              <h3>Crear nuevo socio</h3>
              <label htmlFor="member-name">Nombre completo</label>
              <input
                id="member-name"
                name="name"
                value={memberForm.name}
                onChange={handleMemberFormChange}
                placeholder="Ej: Yuki Nakamura"
              />

              <label htmlFor="member-plan">Plan</label>
              <select
                id="member-plan"
                name="plan"
                value={memberForm.plan}
                onChange={handleMemberFormChange}
              >
                <option value="Base Fit">Base Fit</option>
                <option value="Samurai Pro">Samurai Pro</option>
                <option value="Shogun Elite">Shogun Elite</option>
              </select>

              <label htmlFor="member-level">Nivel</label>
              <select
                id="member-level"
                name="level"
                value={memberForm.level}
                onChange={handleMemberFormChange}
              >
                <option value="Inicial">Inicial</option>
                <option value="Intermedio">Intermedio</option>
                <option value="Avanzado">Avanzado</option>
              </select>

              <button type="submit" className="primary-action">
                Crear socio
              </button>
            </form>

            <div className="member-list">
              <h3>Resumen de socios</h3>
              <div className="list-scroll">
                {members.map((member) => (
                  <article key={member.id} className="member-row">
                    <strong>{member.name}</strong>
                    <span>{member.plan}</span>
                    <small>Nivel: {member.level}</small>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      )
    }

    return (
      <section className="section-card">
        <div className="section-title">
          <p className="kicker">Perfil de socio</p>
          <h2>Tu progreso personal</h2>
        </div>

        <div className="member-profile-grid">
          <article className="info-card">
            <h3>{memberProfile.name}</h3>
            <p className="pill">{memberProfile.plan}</p>
            <p>
              Nivel actual: {memberProfile.level}
              <br />
              Objetivo: {memberProfile.objective}
            </p>
          </article>

          <article className="info-card honor-card">
            <h3>Puntos de honor</h3>
            <strong>{honorPoints} pts</strong>
            <p>Rango actual: {honorRank}</p>
            <button type="button" className="primary-action" onClick={registerAttendance}>
              Registrar asistencia de hoy
            </button>
          </article>

          <article className="info-card">
            <h3>Resumen rapido</h3>
            <p>Dias entrenados: {memberProfile.attendanceDays}</p>
            <p>Racha actual: {memberProfile.streak} dias</p>
            <p>Proximo objetivo: 30 entrenamientos mensuales</p>
          </article>
        </div>
      </section>
    )
  }

  return (
    <div className="app-shell">
      <div
        className="samurai-pattern"
        style={{ backgroundImage: `url(${samuraiPattern})` }}
        aria-hidden="true"
      />

      <header className="site-header">
        <button type="button" className="brand" onClick={() => openSection('landing')}>
          <img src={roninLogo} alt="Logo de Ronin" />
          <span className="brand-text">
            <strong>Ronin</strong>
            <small>Gym</small>
          </span>
        </button>

        <nav className="site-nav" aria-label="Secciones principales">
          {menuItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={item.id === activeView ? 'nav-button active' : 'nav-button'}
              onClick={() => openSection(item.id)}
            >
              {item.id === 'profile' ? (isAdmin ? 'Administracion' : 'Mi perfil') : item.label}
            </button>
          ))}
        </nav>

        <div className="header-controls user-controls">
          <span className="role-badge">{isAdmin ? 'Admin' : 'Socio'}</span>
          <span className="user-name">{displayName}</span>
          <button type="button" className="secondary-action" onClick={closeSession}>
            Cerrar sesion
          </button>
        </div>
      </header>

      <main className="main-content">
        {activeView === 'landing' && renderLanding()}
        {activeView === 'machines' && renderMachines()}
        {activeView === 'calendar' && renderCalendar()}
        {activeView === 'ideas' && renderIdeas()}
        {activeView === 'profile' && renderProfile()}
      </main>

      <footer className="site-footer">
        <div className="footer-grid">
          <article>
            <h3>Ronin Gym</h3>
            <p>
              Gimnasio orientado a fuerza, salud y rendimiento. Planes para principiantes y avanzados con
              seguimiento real del progreso.
            </p>
          </article>

          <article>
            <h3>Horarios</h3>
            {gymInfo.schedule.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </article>

          <article>
            <h3>Contacto</h3>
            <p>{gymInfo.location}</p>
            <p>
              Tel: <a href={`tel:${gymInfo.phone.replace(/\s+/g, '')}`}>{gymInfo.phone}</a>
            </p>
            <p>
              IG: <a href={gymInfo.instagramUrl}>{gymInfo.instagramHandle}</a>
            </p>
          </article>

          <article>
            <h3>Secciones</h3>
            {menuItems.map((item) => (
              <button key={item.id} type="button" className="footer-link" onClick={() => openSection(item.id)}>
                {item.id === 'profile' ? (isAdmin ? 'Administracion' : 'Mi perfil') : item.label}
              </button>
            ))}
          </article>
        </div>
      </footer>
    </div>
  )
}
export default App
