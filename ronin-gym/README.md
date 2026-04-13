# 浪人 RONIN GYM — Frontend

Proyecto React para el sistema de gestión del gimnasio RONIN.

## Stack

- React 18
- React Router DOM v6
- CSS Modules custom (sin framework)
- Fuentes: Bebas Neue, Noto Serif JP, Space Mono

---

## Cómo correr

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar en modo desarrollo
npm start

# 3. Abrir en el browser
# http://localhost:3000
```

---

## Estructura del proyecto

```
src/
├── components/
│   ├── Header.jsx / .css      → Navegación con roles
│   └── Footer.jsx / .css      → Footer con contacto
│
├── context/
│   └── AuthContext.jsx        → Context de autenticación (mock)
│
├── data/
│   └── gymData.js             → Datos del gimnasio (mock)
│
├── pages/
│   ├── Home.jsx / .css        → Landing principal
│   ├── Maquinas.jsx / .css    → Catálogo de máquinas con videos
│   ├── Rutinas.jsx / .css     → Rutinas según días
│   ├── Login.jsx / .css       → Selector de rol (demo)
│   ├── Perfil.jsx / .css      → Perfil socio con Honor Points
│   ├── MisRutinas.jsx / .css  → Rutina asignada detallada
│   ├── ArmarRutina.jsx / .css → Builder de rutinas (profesor/admin)
│   └── Dashboard.jsx / .css   → Dashboard admin completo
│
├── styles/
│   └── global.css             → Variables CSS y estilos base
│
├── App.jsx                    → Routing principal
└── index.js                   → Entry point
```

---

## Roles de usuario (Demo)

Para probar los diferentes roles, andá a `/login` y seleccioná:

| Rol | Acceso |
|-----|--------|
| **Socio** | Perfil, Honor Points, Mis Rutinas |
| **Profesor** | Todo lo del socio + Armar Rutinas |
| **Admin** | Todo lo anterior + Dashboard completo |

---

## Páginas públicas (sin login)

- `/` — Landing con hero, ubicación, profesores, precio
- `/maquinas` — Catálogo de máquinas con links a videos
- `/rutinas` — Rutinas por cantidad de días

---

## Dashboard Admin — Funcionalidades

- **Resumen**: KPIs de socios activos / vencidos / por vencer / hoy en gym
- **Asistencia**: Verificador de QR (simulado), búsqueda manual
- **Socios**: Tabla con estado, pagos, perfil detallado por socio
- **Lockers**: Estado de lockers asignados vs disponibles
- **Stock**: Control de inventario con alertas de bajo stock

---

## Colores

```css
--black:   #0a0a0a   /* Fondo principal */
--white:   #f5f0e8   /* Texto principal */
--red:     #cc1a1a   /* Acento / CTA */
```

---

## Próximos pasos sugeridos

1. **Backend**: API REST (Node/Express o Next.js API routes)
2. **Auth real**: JWT o sessions
3. **QR real**: Integrar cámara con `html5-qrcode` o `react-qr-reader`
4. **Base de datos**: PostgreSQL o Supabase
5. **Pagos**: Mercado Pago para renovaciones automáticas
6. **Push notifications**: Para vencimientos próximos

---

## Diseño

Estética inspirada en los **47 Rōnin** — guerreros sin amo que mantuvieron su código de honor.  
Paleta: Negro · Blanco · Rojo · Tipografías japonesas.
