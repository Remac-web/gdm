# Ecosistema Governa

## Visión

Governa es el nombre del ecosistema de plataformas SaaS de gobernanza municipal desarrollado por Remac. GDM es el primer módulo y funciona como producto de lanzamiento que establece la base técnica y comercial del ecosistema.

## Módulos Planificados

| Módulo | Descripción | Estado |
|--------|-------------|--------|
| **Governa GDM** | Gestión de evidencias para la Guía Consultiva de Desempeño Municipal INAFED | En desarrollo |
| **Governa Planes** | PMD (Plan Municipal de Desarrollo) y POA (Programa Operativo Anual) con metodología de marco lógico | Planeado |
| **Governa Informes** | Informe de gobierno e ISV ODS (Índice de Seguimiento Voluntario — ODS) | Planeado |
| **Governa Dashboard** | Panel ejecutivo para presidentes municipales | Planeado |

## Estrategia de Ecosistema

Cada módulo de Governa atiende un instrumento de planificación o rendición de cuentas municipal diferente, pero comparten:

- Infraestructura Supabase (misma organización, proyectos separados o multi-tenant)
- Identidad de marca y sistema de diseño (Tailwind + paleta indigo)
- Base de usuarios (municipios, OEDM, IES)
- Modelo comercial SaaS por suscripción

El GDM establece las relaciones comerciales con los primeros clientes (municipios y OEDM) sobre los cuales se construirá la adopción de los módulos adicionales.

## Por qué GDM Primero

1. **Mandato externo**: el GDM es un programa federal con fechas y exigencias definidas — crea urgencia de adopción.
2. **Viabilidad técnica demostrable**: los 115 indicadores son suficientemente complejos para validar la arquitectura, pero acotados.
3. **Red de actores ya existente**: INAFED, OEDM, IES y municipios ya operan el programa — Governa GDM digitaliza un proceso en marcha.
4. **Contexto de investigación doctoral**: la integración de IA en la validación de evidencias municipales es material de investigación académica.

## Relación con la Investigación Doctoral

Las decisiones técnicas de Governa GDM (arquitectura, integración de IA, flujos de validación) forman parte de una agenda de investigación doctoral. Esto significa que:

- Las decisiones deben estar documentadas con su justificación (ADRs)
- Los resultados de uso de IA (tokens, costos, tasas de acuerdo) son datos de investigación
- La plataforma actúa simultáneamente como producto y como caso de estudio

## Ver también

- [[proyecto/overview]] — contexto del módulo GDM
- [[proyecto/negocio]] — modelo de negocio
- [[decisiones/002-nombre-governa]] — decisión de marca
