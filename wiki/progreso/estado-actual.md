# Estado Actual — Governa GDM

> Última actualización: 2026-05-15 (sesión 2)

## Resumen Ejecutivo

El proyecto está en fase de **scaffold completo**. La arquitectura, tipos, autenticación y estructura de rutas están implementados. Los módulos funcionales (UI de captura, revisión, panel estatal) aún no están construidos.

## Estado por Módulo Funcional

| Módulo | Estado | Notas |
|--------|--------|-------|
| **Autenticación** | Completo | Login, logout, middleware SSR, redirect por rol |
| **Layout del dashboard** | Completo | Sidebar con navegación por rol, header, layout anidado |
| **Tipos TypeScript** | Completo | `types/database.types.ts` + `types/index.ts` — todo el dominio tipado |
| **Sistema de semáforo** | Completo | `SEMAFORO_CONFIG`, `calcularSemaforoGestion()` en `lib/utils.ts` |
| **Redirect inteligente por rol** | Completo | `app/(dashboard)/dashboard/page.tsx` |
| **Panel municipio** (`/dashboard/municipio`) | Completo | Semáforo por módulo (8 cards), totales, capturas pendientes. Ver `app/(dashboard)/dashboard/municipio/page.tsx` y `components/municipio/semaforo-card.tsx`. |
| **Captura de indicadores** (`/indicadores`) | No iniciado | Solo directorio creado |
| **Gestión de evidencias** (`/evidencias`) | No iniciado | Solo directorio creado |
| **Panel revisor IES** (`/revisiones`) | No iniciado | Solo directorio creado |
| **Panel OEDM** (`/estado`) | No iniciado | Solo directorio creado |
| **Panel admin** (`/admin`) | No iniciado | Solo directorio creado |
| **API routes** (`/api/*`) | No iniciado | Directorios creados, sin handlers |
| **Componentes UI** (`components/ui/`) | No iniciado | Directorio creado |
| **Formularios de captura** (`components/forms/`) | No iniciado | Directorio creado |
| **Gráficas de semáforo** (`components/charts/`) | No iniciado | Directorio creado |
| **Hooks personalizados** (`lib/hooks/`) | No iniciado | Directorio creado |
| **Integración Claude API** | No iniciado | `ANTHROPIC_API_KEY` en env, lógica pendiente |
| **Base de datos en producción** | Completo | Migraciones ejecutadas (sesión 2026-04-23). Catálogo cargado: 8 módulos, 31 temas, 115 indicadores, 59 municipios SLP. Usuario admin creado. |
| **Fuentes GDM en raw/** | Completo | `lineamientos.md` y `cuaderno-trabajo.md` agregados (2026-05-15) |

## Infraestructura y DevOps

| Ítem | Estado |
|------|--------|
| Repositorio GitHub | Activo (`Remac-web/gdm`) |
| Deploy en Vercel | No configurado |
| Variables de entorno en producción | No configuradas |
| Base de datos Supabase | Proyecto creado (sin migraciones ejecutadas) |

## Calidad del Código

- TypeScript estricto (`strict: true`) — sin errores conocidos
- ESLint configurado
- Sin tests unitarios ni de integración (no iniciados)
- Build de producción: no verificado aún

## Próximos Pasos

Ver [[progreso/pendientes]] para el backlog priorizado.
