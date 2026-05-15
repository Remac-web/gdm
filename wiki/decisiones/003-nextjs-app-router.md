# ADR 003 — Next.js 14 con App Router

| Campo | Valor |
|-------|-------|
| **Estado** | Aceptado |
| **Fecha** | 2026-04-23 |
| **Autor** | Remac (desarrollador principal) |

## Contexto

La plataforma necesita:
- Server-Side Rendering para rendimiento y SEO (aunque el dashboard es privado, el SSR ayuda en tiempo de carga inicial)
- Manejo seguro de sesiones en el servidor (crítico para la autenticación con Supabase)
- Deploy en Vercel (integración nativa)
- TypeScript de primera clase
- API routes para el servidor (revisión IA con Anthropic, file uploads)

## Decisión

Se adopta **Next.js 14** con **App Router** (directorio `app/`). Se descarta Pages Router.

## Por qué App Router sobre Pages Router

| Característica | App Router | Pages Router |
|----------------|-----------|--------------|
| Server Components | Nativo | No |
| Layouts anidados | Nativo | Workaround |
| Integración `@supabase/ssr` | Directa | Más compleja |
| Streaming / Suspense | Nativo | Limitado |
| Es el futuro de Next.js | Sí | Legacy |

El `@supabase/ssr` está diseñado específicamente para App Router — el manejo de cookies en Server Components y Middleware es limpio y explícito.

## Alternativas Consideradas

| Alternativa | Razón de descarte |
|------------|-------------------|
| Remix | Ecosistema más pequeño; menos documentación de integración con Supabase |
| SvelteKit | Cambio de paradigma; el equipo (solo desarrollador) ya conoce React/TypeScript |
| Nuxt / Vue | Sin razón técnica; preferencia por React ecosystem |
| CRA / Vite SPA | Sin SSR nativo; el Auth de Supabase en SPA pura tiene más complejidad |

## Estructura de Rutas Adoptada

```
app/
├── (auth)/        # Grupo sin layout de dashboard (login)
├── (dashboard)/   # Grupo con sidebar y header (requiere auth)
│   ├── layout.tsx # Shell del dashboard
│   └── [rutas]/   # Páginas por rol
└── api/           # API routes del servidor
```

Los grupos de rutas `(auth)` y `(dashboard)` permiten layouts distintos sin afectar la URL.

## Consecuencias

**Positivas:**
- `middleware.ts` protege todas las rutas de `(dashboard)` antes de que lleguen a los componentes
- Server Components hacen fetch de datos directamente desde el servidor — sin exposición de claves
- Deploy automático en Vercel sin configuración adicional
- `layout.tsx` anidados permiten el shell del dashboard (sidebar + header) sin repetición

**Negativas / Complejidad:**
- La distinción entre Server y Client Components requiere atención (`'use client'` explícito)
- El manejo de cookies en Server Components vs Middleware tiene sutilezas (documentadas en `lib/supabase/server.ts` con try-catch para cookies)
- `useSearchParams` y otros hooks solo en Client Components

## Ver también

- [[arquitectura/stack]] — stack completo
- [[decisiones/001-supabase]] — integración SSR con Supabase
- [[convenciones/codigo]] — cuándo usar 'use client'
