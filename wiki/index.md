# Governa GDM — Índice de la Wiki

> Wiki del proyecto mantenida por Claude siguiendo el patrón LLM Wiki (Karpathy).
> Última actualización: 2026-05-15

---

## Proyecto

| Página | Descripción |
|--------|-------------|
| [proyecto/overview.md](proyecto/overview.md) | Qué es Governa GDM, contexto INAFED, estructura del catálogo GDM 2025-2027 |
| [proyecto/ecosistema.md](proyecto/ecosistema.md) | Módulos del ecosistema Governa y hoja de ruta de Remac |
| [proyecto/negocio.md](proyecto/negocio.md) | Modelo de negocio SaaS, mercado objetivo, propuesta de valor |

## Arquitectura

| Página | Descripción |
|--------|-------------|
| [arquitectura/stack.md](arquitectura/stack.md) | Stack técnico completo: Next.js 14, Supabase, Tailwind, Vercel |
| [arquitectura/base-datos.md](arquitectura/base-datos.md) | Esquema PostgreSQL: tablas, vistas, enums, RLS y migraciones |
| [arquitectura/roles-flujo.md](arquitectura/roles-flujo.md) | Los 5 roles y el flujo captura → validación → revisión IES |
| [arquitectura/ia.md](arquitectura/ia.md) | Integración Anthropic Claude API para revisión de evidencias |

## Decisiones Técnicas (ADR)

| # | Página | Estado |
|---|--------|--------|
| 001 | [decisiones/001-supabase.md](decisiones/001-supabase.md) | Aceptado |
| 002 | [decisiones/002-nombre-governa.md](decisiones/002-nombre-governa.md) | Aceptado |
| 003 | [decisiones/003-nextjs-app-router.md](decisiones/003-nextjs-app-router.md) | Aceptado |
| 004 | [decisiones/004-jsonb-elementos.md](decisiones/004-jsonb-elementos.md) | Aceptado |

## Progreso

| Página | Descripción |
|--------|-------------|
| [progreso/estado-actual.md](progreso/estado-actual.md) | Estado de implementación por módulo funcional (actualizado cada sesión) |
| [progreso/pendientes.md](progreso/pendientes.md) | Backlog priorizado: qué construir y en qué orden |

### Sesiones

| Fecha | Sesión |
|-------|--------|
| 2026-04-23 | [progreso/sesiones/2026-04-23.md](progreso/sesiones/2026-04-23.md) — Scaffold inicial, tipos, estructura de rutas |
| 2026-05-15 | [progreso/sesiones/2026-05-15.md](progreso/sesiones/2026-05-15.md) — Panel Enlace Municipal, semáforo por módulo |

## Convenciones

| Página | Descripción |
|--------|-------------|
| [convenciones/codigo.md](convenciones/codigo.md) | TypeScript/React: naming, estructura de componentes, patrones |
| [convenciones/base-datos.md](convenciones/base-datos.md) | Nomenclatura PostgreSQL/Supabase, RLS, migraciones |
| [convenciones/commits.md](convenciones/commits.md) | Formato de commits (Conventional Commits en español) |

## Datos GDM

| Página | Descripción |
|--------|-------------|
| [datos/resultados-gdm-2025-slp.md](datos/resultados-gdm-2025-slp.md) | Análisis de resultados GDM 2025 SLP: clusters, patrones por módulo, municipios atípicos |

## Municipios

[municipios/index.md](municipios/index.md) — Tabla de los 43 municipios con dictamen validado (posición, % avance, cluster).

Notas individuales: `wiki/municipios/<nombre>.md` — semáforo por módulo para cada municipio.

## Log

[log.md](log.md) — Registro cronológico de sesiones, decisiones e hitos.

---

## Fuentes Crudas (solo lectura)

| Archivo | Descripción |
|---------|-------------|
| `raw/gdm/lineamientos.md` | Lineamientos operativos GDM INAFED 2025-2027 (enero 2026) |
| `raw/gdm/cuaderno-trabajo.md` | Cuaderno de trabajo GDM 2025-2027: 8 módulos, 31 temas, 115 indicadores |
| `raw/gdm/resultados-gdm-2025-slp.md` | Resultados GDM 2025 SLP: 43 municipios, % avance y semáforo por módulo (18-dic-2025) |
