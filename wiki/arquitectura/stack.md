# Stack Técnico — Governa GDM

## Resumen

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Framework | Next.js (App Router) | 14.2.5 |
| Lenguaje | TypeScript | 5.5.4 |
| UI | React | 18.3.1 |
| Estilos | Tailwind CSS | 3.4.7 |
| Base de datos | Supabase (PostgreSQL) | — |
| Auth | Supabase Auth | @supabase/ssr 0.5.1 |
| Storage | Supabase Storage | — |
| IA | Anthropic Claude API | — |
| Deploy | Vercel | — |
| Gestión de estado | Zustand | 4.5.4 |
| Formularios | React Hook Form + Zod | 7.52.2 / 3.23.8 |
| Fetching | TanStack Query | 5.51.0 |
| Gráficas | Recharts | 2.12.7 |

## Next.js — App Router

El proyecto usa exclusivamente el **App Router** de Next.js 14 (directorio `app/`). No usa Pages Router.

Estructura de rutas:
- `app/(auth)/` — rutas públicas (login)
- `app/(dashboard)/` — rutas protegidas (requieren sesión activa)
- `app/api/` — API routes del servidor

Convenciones clave:
- `layout.tsx` define el shell de cada grupo de rutas
- `page.tsx` es la página de cada ruta
- `route.ts` define API handlers (GET, POST, etc.)
- Los Server Components son el default — se marca explícitamente `'use client'` cuando se necesita interactividad

## Supabase

Supabase provee tres servicios en uno:
1. **PostgreSQL** — base de datos con RLS (Row Level Security)
2. **Auth** — autenticación con sesiones manejadas por cookies (SSR-safe con `@supabase/ssr`)
3. **Storage** — almacenamiento de evidencias (PDFs, imágenes, documentos)

Clientes:
- `lib/supabase/client.ts` — para componentes cliente (`createBrowserClient`)
- `lib/supabase/server.ts` — para Server Components (`createServerClient`)
- `lib/supabase/middleware.ts` — para middleware de protección de rutas

## Middleware de Autenticación

`middleware.ts` (raíz) → llama a `lib/supabase/middleware.ts`.

Lógica:
1. Si no hay sesión activa → redirige a `/login` (excepto rutas `/login` y `/auth`)
2. Si hay sesión y está en `/login` → redirige a `/dashboard`
3. Refresca cookies de sesión en cada request

## Sistema de Diseño

- **Fuente primaria**: Inter (sans-serif) — texto general
- **Fuente display**: Lexend — títulos y headings
- **Color de marca**: Indigo (`#4f46e5`, escala completa 50–950)
- **Colores de semáforo**: Verde (óptimo), Amarillo (en proceso), Rojo (rezago), Gris claro (no medible / info no disponible)
- **Componentes globales** en `app/globals.css`: `.card`, `.badge-*`, `.btn-primary`, `.btn-secondary`, `.input`, `.nav-item`

## Variables de Entorno Requeridas

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_APP_NAME=GDM
ANTHROPIC_API_KEY=
```

## Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo (localhost:3000)
npm run build        # Build de producción
npm run type-check   # Verificar tipos TypeScript
npm run lint         # ESLint
npm run db:types     # Generar tipos desde esquema Supabase local
```

## Ver también

- [[decisiones/001-supabase]] — por qué Supabase
- [[decisiones/003-nextjs-app-router]] — por qué App Router
- [[arquitectura/base-datos]] — esquema de la base de datos
- [[arquitectura/ia]] — integración Anthropic
