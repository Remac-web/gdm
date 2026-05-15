# ADR 001 — Supabase como Backend-as-a-Service

| Campo | Valor |
|-------|-------|
| **Estado** | Aceptado |
| **Fecha** | 2026-04-23 |
| **Autor** | Remac (desarrollador principal) |

## Contexto

Governa GDM es un proyecto SaaS desarrollado por una sola persona. Necesita:

- Base de datos relacional con control de acceso por filas (RLS) para aislar datos por municipio
- Autenticación robusta con manejo de sesiones compatible con SSR (Next.js App Router)
- Almacenamiento de archivos (PDFs, imágenes de evidencias)
- Tipos TypeScript generados automáticamente desde el esquema
- Despliegue inmediato sin administrar infraestructura

## Decisión

Se adopta **Supabase** como proveedor de backend. Supabase provee PostgreSQL + Auth + Storage + RLS en una sola plataforma con SDK oficial para Next.js.

## Alternativas Consideradas

| Alternativa | Razón de descarte |
|------------|-------------------|
| Firebase | NoSQL — la estructura relacional del GDM (módulos → temas → indicadores → capturas) requiere joins y constraints |
| PlanetScale / Neon | Solo DB — requeriría Auth y Storage adicionales (complejidad para un solo desarrollador) |
| Railway + Prisma | Más control pero más configuración — sin RLS nativo ni Auth integrado |
| Auth0 + AWS S3 | Demasiados servicios separados; costo y complejidad desproporcionados al estado del proyecto |

## Consecuencias

**Positivas:**
- Un solo proveedor para DB, Auth y Storage
- `@supabase/ssr` resuelve el manejo de sesiones en App Router sin código adicional
- RLS permite que el cliente (navegador) haga queries directos con seguridad garantizada
- `npm run db:types` genera `types/database.types.ts` automáticamente — TypeScript end-to-end
- Plan gratuito suficiente para desarrollo y piloto inicial
- Dashboard de Supabase facilita inspección de datos en producción

**Negativas / Riesgos:**
- Vendor lock-in moderado (RLS y funciones PL/pgSQL específicas de Supabase)
- Dependencia de la disponibilidad y pricing de Supabase a largo plazo
- Las migraciones se manejan en el dashboard de Supabase, no versionadas en el repo (por ahora)

## Notas de Investigación

La elección de Supabase como BaaS para un proyecto de gobernanza pública es en sí misma una decisión arquitectónica relevante para investigación: combina la agilidad de un servicio gestionado con las garantías de seguridad de RLS sobre datos sensibles (datos de gobierno municipal).

## Ver también

- [[arquitectura/stack]] — stack completo
- [[arquitectura/base-datos]] — esquema PostgreSQL con RLS
- [[decisiones/003-nextjs-app-router]] — integración con SSR
