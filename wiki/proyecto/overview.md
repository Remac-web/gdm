# Governa GDM — Visión General del Proyecto

## ¿Qué es?

Governa GDM es una plataforma SaaS para la gestión digital de evidencias del programa **Guía Consultiva de Desempeño Municipal (GDM)** del INAFED. Permite que municipios capturen, organicen y envíen evidencias de sus indicadores de desempeño, y que revisores universitarios y coordinadores estatales validen esa información — con apoyo de inteligencia artificial.

## Contexto del Programa GDM

El GDM es un programa federal operado por el INAFED que evalúa a los municipios de México en 8 módulos a través de 115 indicadores (80 de gestión + 35 de desempeño). Opera con ciclos anuales (2025, 2026, 2027) y tres etapas:

| Etapa | Descripción |
|-------|-------------|
| `diagnostico` | Captura inicial del estado de cada indicador |
| `actualizacion` | Mejora con nueva evidencia durante el ciclo |
| `revision` | Validación final por OEDM e IES |

El sistema de evaluación usa un **semáforo** de 5 estados: `optimo`, `en_proceso`, `rezago`, `no_medible`, `info_no_disponible`.

## Actores Institucionales

| Actor | Rol en GDM |
|-------|-----------|
| **INAFED** | Emite lineamientos, norma el programa |
| **OEDM** | Órgano Estatal de Desarrollo Municipal — coordina la implementación en el estado |
| **IES** | Instituciones de Educación Superior — asignadas a municipios como revisoras |
| **Municipios** | Capturan evidencias y auto-evalúan su desempeño |

Governa GDM digitaliza y agiliza la interacción entre estos cuatro actores.

## Alcance Geográfico Inicial

**San Luis Potosí**: 59 municipios catalogados con clave INEGI.

## Catálogo GDM 2025-2027

| # | Módulo | Tipo de indicadores |
|---|--------|-------------------|
| 1 | Organización Municipal | Gestión + Desempeño |
| 2 | Hacienda Municipal | Gestión + Desempeño |
| 3 | Gestión Territorial | Gestión + Desempeño |
| 4 | Servicios Públicos | Gestión + Desempeño |
| 5 | Medio Ambiente | Gestión + Desempeño |
| 6 | Desarrollo Social | Gestión + Desempeño |
| 7 | Desarrollo Económico | Gestión + Desempeño |
| 8 | Gobierno Abierto | Gestión + Desempeño |
| — | **Total** | **31 temas · 115 indicadores** |

- **Indicadores de gestión** (80): documentales/procedimentales — se capturan marcando elementos (incisos a, b, c...) que la dirección municipal cumple.
- **Indicadores de desempeño** (35): cuantitativos — se calculan con variables numéricas según fórmula específica.

## Fuentes de Dominio

| Archivo | Contenido |
|---------|-----------|
| `raw/gdm/lineamientos.md` | Lineamientos operativos INAFED (enero 2026) — roles, responsabilidades, etapas |
| `raw/gdm/cuaderno-trabajo.md` | Catálogo completo de 115 indicadores con criterios de semáforo y métodos de cálculo |

> `raw/` es inmutable — solo lectura.

## Ver también

- [[proyecto/ecosistema]] — otros módulos Governa
- [[proyecto/negocio]] — modelo SaaS y mercado
- [[arquitectura/roles-flujo]] — los 5 roles del sistema
- [[arquitectura/ia]] — revisión con Claude
