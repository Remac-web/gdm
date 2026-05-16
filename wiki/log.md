# Log de Sesiones — Governa GDM

> Registro cronológico, solo agregar al final. Nunca modificar entradas anteriores.
>
> Formato: `[YYYY-MM-DD] | <tipo> | <descripción>`
> Tipos: `sesión` · `decisión` · `ingest` · `lint` · `hito` · `fix`

---

[2026-04-23] | hito | Inicio del proyecto Governa GDM. Repositorio creado bajo organización Remac-web.

[2026-04-23] | sesión | Scaffold inicial: Next.js 14 App Router, Supabase Auth, estructura de rutas por rol, tipos TypeScript del dominio GDM, sistema de semáforos, middleware de protección. Ver sesiones/2026-04-23.md.

[2026-04-23] | decisión | ADR 001: Supabase como BaaS principal (Auth + PostgreSQL + Storage + RLS).

[2026-04-23] | decisión | ADR 002: Nombre de marca "Governa" para el ecosistema de plataformas de Remac.

[2026-04-23] | decisión | ADR 003: Next.js 14 con App Router (vs Pages Router o framework alternativo).

[2026-04-23] | decisión | ADR 004: JSONB para elementos_marcados y variables_calculo en tabla capturas.

[2026-04-24] | fix | Tipos explícitos en cookies de middleware y server. Cast explícito en redirect por rol.

[2026-05-15] | ingest | Fuentes GDM agregadas a raw/gdm/: lineamientos.md (~521p INAFED enero 2026), cuaderno-trabajo.md (~101p, 8 módulos 115 indicadores). Commit b67017a.

[2026-05-15] | hito | Wiki del proyecto inicializada. CLAUDE.md creado. Patrón LLM Wiki (Karpathy) adoptado como protocolo de sesiones.

[2026-05-15] | sesión | Confirmadas migraciones y catálogo GDM completos. Panel Enlace Municipal construido: semáforo 8 módulos, totales, capturas pendientes. Ver sesiones/2026-05-15.md.

[2026-05-15] | ingest | resultados-gdm-2025-slp.md procesado desde raw/gdm/. Creados wiki/datos/resultados-gdm-2025-slp.md (análisis cluster/módulos) + 43 notas en wiki/municipios/ (semáforo por módulo). wiki/index.md actualizado con secciones Datos GDM y Municipios.

[2026-05-15] | hito | Tabla resultados_modulo_2025 migrada y cargada en Supabase producción. Panel municipio muestra datos históricos GDM 2025 en producción sin capturas.
