// Datos mock del gimnasio RONIN

export const GYM_INFO = {
  name: 'RONIN',
  address: 'Gral. Nazar 849, La Tablada, Buenos Aires',
  mapsUrl: 'https://www.google.com/maps/search/Gral.+Nazar+849+La+Tablada+Buenos+Aires',
  instagram: '@ronin_1gym',
  instagramUrl: 'https://www.instagram.com/ronin_1gym',
  email: 'contacto@ronin1gym.com',
  phone: '+54 11 0000-0000',
  price: 35000,
  priceLabel: 'Pase Libre Mensual',
};

export const INSTRUCTORS = [
  {
    id: 1,
    name: 'Lucas Ferreyra',
    role: 'Entrenador Principal',
    specialty: 'Fuerza & Powerlifting',
    kanji: '力',
    kanjiMeaning: 'Fuerza',
    bio: 'Especialista en levantamiento de potencia con 10 años de experiencia. Campeón provincial 2021.',
    certifications: ['NSCA-CSCS', 'FEP Nivel III'],
  },
  {
    id: 2,
    name: 'Valentina Ríos',
    role: 'Entrenadora',
    specialty: 'Funcional & Movilidad',
    kanji: '動',
    kanjiMeaning: 'Movimiento',
    bio: 'Especialista en entrenamiento funcional y rehabilitación deportiva. Certificada en movilidad avanzada.',
    certifications: ['CF-L2', 'FMS Nivel II'],
  },
  {
    id: 3,
    name: 'Martín Ojeda',
    role: 'Entrenador',
    specialty: 'Hipertrofia & Nutrición',
    kanji: '鋼',
    kanjiMeaning: 'Acero',
    bio: 'Bodybuilder natural con foco en programación científica para hipertrofia máxima.',
    certifications: ['ISAK II', 'Nutrición Deportiva UBA'],
  },
];

export const MACHINES = [
  { id: 1, name: 'Press de Banca', muscle: 'Pecho', description: 'Mancuernas o barra, inclinado o plano.', videoUrl: 'https://www.youtube.com/shorts/e_Gm4szRlec', category: 'Empuje' },
  { id: 2, name: 'Sentadilla en Rack', muscle: 'Piernas', description: 'Squat libre con barra en rack de potencia.', videoUrl: 'https://www.youtube.com/shorts/T2dPDq3v1Zs', category: 'Piernas' },
  { id: 3, name: 'Polea Alta', muscle: 'Espalda', description: 'Jalones al pecho y trasnuca.', videoUrl: 'https://www.youtube.com/shorts/bHsEwXYcfLI', category: 'Tirón' },
  { id: 4, name: 'Máquina de Remo', muscle: 'Espalda', description: 'Remo sentado con cable.', videoUrl: 'https://www.youtube.com/shorts/F8I-B3lPqhg', category: 'Tirón' },
  { id: 5, name: 'Press Hombros Smith', muscle: 'Hombros', description: 'Press militar en máquina Smith.', videoUrl: 'https://www.youtube.com/shorts/1N6fHiDoGro', category: 'Empuje' },
  { id: 6, name: 'Curl de Bíceps Cable', muscle: 'Bíceps', description: 'Curl con barra EZ en polea baja.', videoUrl: 'https://www.youtube.com/shorts/cwA4dBtJjtM', category: 'Bíceps' },
  { id: 7, name: 'Extensiones Tríceps', muscle: 'Tríceps', description: 'Pushdown con cuerda en polea alta.', videoUrl: 'https://www.youtube.com/shorts/1QdtHGBMcKo', category: 'Tríceps' },
  { id: 8, name: 'Prensa de Piernas', muscle: 'Piernas', description: 'Leg press 45° con carga ajustable.', videoUrl: 'https://www.youtube.com/shorts/IZxyjW7OSFI', category: 'Piernas' },
  { id: 9, name: 'Curl Femoral', muscle: 'Isquiotibiales', description: 'Máquina de curl acostado.', videoUrl: 'https://www.youtube.com/shorts/Ic4VpNDKEP0', category: 'Piernas' },
  { id: 10, name: 'Extensión de Cuádriceps', muscle: 'Cuádriceps', description: 'Máquina de extensión sentada.', videoUrl: 'https://www.youtube.com/shorts/YyvwhFes0cc', category: 'Piernas' },
  { id: 11, name: 'Hip Thrust', muscle: 'Glúteos', description: 'Con barra sobre banco o máquina.', videoUrl: 'https://www.youtube.com/shorts/xDmFkJxPzeM', category: 'Piernas' },
  { id: 12, name: 'Caminadora', muscle: 'Cardio', description: 'Trotadora eléctrica de alta velocidad.', videoUrl: 'https://www.youtube.com/shorts/uwZ-5kGmM1w', category: 'Cardio' },
];

export const ROUTINES = [
  {
    id: 1,
    days: 3,
    name: 'Rutina 3 Días — Fullbody',
    description: 'Entrenamiento de cuerpo completo ideal para principiantes o quien tiene poco tiempo.',
    split: [
      { day: 'Día A', muscles: ['Pecho', 'Espalda', 'Piernas'], exercises: 5 },
      { day: 'Día B', muscles: ['Hombros', 'Bíceps', 'Tríceps', 'Glúteos'], exercises: 6 },
      { day: 'Día C', muscles: ['Pecho', 'Espalda', 'Piernas'], exercises: 5 },
    ],
    level: 'Principiante',
  },
  {
    id: 2,
    days: 4,
    name: 'Rutina 4 Días — Upper/Lower',
    description: 'División tren superior / inferior. Buena frecuencia sin sobreentrenar.',
    split: [
      { day: 'Lunes', muscles: ['Pecho', 'Espalda', 'Hombros', 'Bíceps', 'Tríceps'], exercises: 7 },
      { day: 'Martes', muscles: ['Cuádriceps', 'Isquiotibiales', 'Glúteos', 'Pantorrillas'], exercises: 6 },
      { day: 'Jueves', muscles: ['Pecho', 'Espalda', 'Hombros'], exercises: 7 },
      { day: 'Viernes', muscles: ['Cuádriceps', 'Isquiotibiales', 'Glúteos'], exercises: 6 },
    ],
    level: 'Intermedio',
  },
  {
    id: 3,
    days: 5,
    name: 'Rutina 5 Días — Push/Pull/Legs',
    description: 'El clásico PPL para máximo volumen por grupo muscular.',
    split: [
      { day: 'Lunes (Push)', muscles: ['Pecho', 'Hombros', 'Tríceps'], exercises: 6 },
      { day: 'Martes (Pull)', muscles: ['Espalda', 'Bíceps', 'Femorales'], exercises: 6 },
      { day: 'Miércoles (Legs)', muscles: ['Cuádriceps', 'Glúteos', 'Pantorrillas'], exercises: 6 },
      { day: 'Jueves (Push)', muscles: ['Pecho', 'Hombros', 'Tríceps'], exercises: 6 },
      { day: 'Viernes (Pull/Legs)', muscles: ['Espalda', 'Bíceps', 'Piernas'], exercises: 7 },
    ],
    level: 'Avanzado',
  },
  {
    id: 4,
    days: 6,
    name: 'Rutina 6 Días — PPL x2',
    description: 'Push Pull Legs repetido dos veces por semana. Frecuencia máxima.',
    split: [
      { day: 'Lunes (Push A)', muscles: ['Pecho', 'Hombros', 'Tríceps'], exercises: 6 },
      { day: 'Martes (Pull A)', muscles: ['Espalda', 'Bíceps'], exercises: 6 },
      { day: 'Miércoles (Legs A)', muscles: ['Cuádriceps', 'Glúteos', 'Pantorrillas'], exercises: 6 },
      { day: 'Jueves (Push B)', muscles: ['Pecho', 'Hombros', 'Tríceps'], exercises: 6 },
      { day: 'Viernes (Pull B)', muscles: ['Espalda', 'Bíceps', 'Femorales'], exercises: 6 },
      { day: 'Sábado (Legs B)', muscles: ['Cuádriceps', 'Glúteos', 'Pantorrillas'], exercises: 6 },
    ],
    level: 'Avanzado',
  },
];

// Mock users for demonstration
export const MOCK_USERS = {
  socio: { id: 1, name: 'Juan Pérez', role: 'socio', email: 'juan@mail.com', honorPoints: 340, memberSince: '2024-01-15' },
  profesor: { id: 2, name: 'Lucas Ferreyra', role: 'profesor', email: 'lucas@ronin1gym.com', honorPoints: 980, memberSince: '2023-06-01' },
  admin: { id: 3, name: 'Admin RONIN', role: 'admin', email: 'admin@ronin1gym.com', honorPoints: 0, memberSince: '2023-01-01' },
};

// Dashboard mock data
export const DASHBOARD_DATA = {
  activeMembers: 87,
  expiredMembers: 12,
  soonToExpire: 8,
  todayPresent: 23,
  todayCheckedIn: [
    { id: 101, name: 'Marcos Villalba', time: '07:12', status: 'presente' },
    { id: 102, name: 'Sofía Méndez', time: '08:30', status: 'presente' },
    { id: 103, name: 'Pablo Ruiz', time: '09:05', status: 'fue' },
    { id: 104, name: 'Ana González', time: '09:45', status: 'presente' },
    { id: 105, name: 'Diego Torres', time: '10:20', status: 'fue' },
  ],
  lockers: [
    { number: 1, member: 'Marcos Villalba', expires: '2025-05-01', active: true },
    { number: 5, member: 'Sofía Méndez', expires: '2025-04-20', active: true },
    { number: 12, member: 'Pablo Ruiz', expires: '2025-03-31', active: false },
    { number: 18, member: 'Carla López', expires: '2025-06-15', active: true },
  ],
  stock: [
    { item: 'Agua mineral 500ml', quantity: 48, min: 20, unit: 'unidades' },
    { item: 'Gatorade Naranja', quantity: 12, min: 15, unit: 'unidades' },
    { item: 'Gatorade Limón', quantity: 9, min: 15, unit: 'unidades' },
    { item: 'Proteína Whey', quantity: 3, min: 5, unit: 'kg' },
    { item: 'Toallas descartables', quantity: 200, min: 50, unit: 'unidades' },
  ],
  members: [
    {
      id: 101,
      name: 'Marcos Villalba',
      dni: '32.456.789',
      plan: 'Pase Libre',
      status: 'activo',
      paidUntil: '2025-04-30',
      payments: [
        { date: '2025-04-01', amount: 35000, method: 'transferencia' },
        { date: '2025-03-01', amount: 30000, method: 'efectivo' },
      ],
    },
    {
      id: 102,
      name: 'Sofía Méndez',
      dni: '35.123.456',
      plan: 'Pase Libre',
      status: 'activo',
      paidUntil: '2025-05-15',
      payments: [
        { date: '2025-04-15', amount: 35000, method: 'transferencia' },
      ],
    },
    {
      id: 103,
      name: 'Pablo Ruiz',
      dni: '28.987.654',
      plan: 'Pase Libre',
      status: 'por_vencer',
      paidUntil: '2025-04-15',
      payments: [
        { date: '2025-03-15', amount: 30000, method: 'efectivo' },
      ],
    },
  ],
};
