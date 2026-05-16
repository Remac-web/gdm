# Estado Actual — Governa GDM

> Última actualización: 2026-05-15 (sesión 3)

## Resumen Ejecutivo

El proyecto está en fase de **scaffold completo**. La arquitectura, tipos, autenticación y estructura de rutas están implementados. Los módulos funcionales (UI de captura, revisión, panel estatal) aún no están construidos.

## Resultados GDM 2025 — Línea Base SLP

> Fuente primaria: `raw/gdm/resultados-gdm-2025-slp.md` · Ingesta: 2026-05-15  
> Ver análisis completo en [[datos/resultados-gdm-2025-slp]]

| Indicador | Valor |
|-----------|-------|
| Municipios con dictamen concluido | **43 / 59 (73%)** |
| Promedio estatal de avance | **~36%** |
| 1er lugar | Rioverde — 99.1% |
| 2º lugar | Soledad de Graciano Sánchez — 93.4% |
| 3er lugar | Villa de Reyes — 77.4% |
| Último lugar | Ciudad del Maíz — 2.6% |
| IES participantes | 5 |
| Municipios sin dictamen (16) | No aparecen en el reporte — no concluyeron revisión 2025 |

### Módulos con Mayor Rezago

Medido por número de municipios con 0% de indicadores en óptimo:

| Módulo | Municipios en 0% | Lectura |
|--------|-----------------|---------|
| **M7 Fomento Económico** | ~21 / 43 (49%) | Módulo más abandonado del ciclo |
| **M5 Gestión Ambiental** | ~16 / 43 (37%) | Capacidad técnica muy escasa |
| **M4 Servicios Públicos** | ~15 / 43 (35%) | Brecha de infraestructura |
| **M6 Desarrollo Social** | ~10 / 43 (23%) | Mejora con apoyo IES |
| **M3 Catastro Municipal** | ~7 / 43 (16%) | Modernización catastral pendiente |

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
| Base de datos Supabase | Migraciones ejecutadas. Catálogo GDM cargado (8 mód, 31 temas, 115 ind, 59 mun). |

## Calidad del Código

- TypeScript estricto (`strict: true`) — sin errores conocidos
- ESLint configurado
- Sin tests unitarios ni de integración (no iniciados)
- Build de producción: no verificado aún

## Próximos Pasos

Ver [[progreso/pendientes]] para el backlog priorizado.
