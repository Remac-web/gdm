# ADR 004 — JSONB para Elementos de Gestión y Variables de Cálculo

| Campo | Valor |
|-------|-------|
| **Estado** | Aceptado |
| **Fecha** | 2026-04-23 |
| **Autor** | Remac (desarrollador principal) |

## Contexto

Los 115 indicadores del GDM tienen estructuras heterogéneas:

- **Indicadores de gestión (80)**: cada uno tiene entre 2 y 8 "elementos" (incisos a, b, c...) que el municipio debe acreditar. Los elementos varían por indicador — no hay una estructura uniforme.
- **Indicadores de desempeño (35)**: cada uno tiene una fórmula de cálculo con variables nombradas (A, B, X1...) que el municipio debe ingresar como valores numéricos.

El número y nombres de elementos/variables son diferentes para cada indicador y están definidos en el cuaderno de trabajo GDM (`raw/gdm/cuaderno-trabajo.md`).

## Decisión

En la tabla `capturas`:
- `elementos_marcados` — `JSONB` — almacena `{a: true, b: false, c: true}` para gestión
- `variables_calculo` — `JSONB` — almacena `{A: 120, B: 5000}` para desempeño

El catálogo de indicadores (definición de elementos, fórmulas, criterios de semáforo) se almacena como **datos en la migración SQL** (`02_catalogo_gdm.sql`), no se modela como tabla relacional de columnas fijas.

## Alternativas Consideradas

| Alternativa | Razón de descarte |
|------------|-------------------|
| Tabla `elementos` con fila por elemento | 115 × promedio 5 elementos = ~575 filas de catálogo + complejidad de joins en cada captura |
| Columnas separadas por elemento | Imposible — los nombres de elementos son distintos por indicador; resultaría en cientos de columnas con NULLs |
| MongoDB / documento NoSQL | Supabase ya está elegido (ADR 001); agregar otro motor solo para esto es overhead |

## Por qué JSONB Funciona Aquí

1. **El esquema es conocido en tiempo de ejecución**: el frontend sabe exactamente qué campos mostrar porque carga la definición del indicador (del catálogo) antes de renderizar el formulario.
2. **Queries de JSONB en PostgreSQL son eficientes**: `capturas.elementos_marcados->>'a'` es indexable y rápido.
3. **El catálogo no cambia frecuentemente**: los 115 indicadores están definidos por INAFED para el ciclo 2025-2027 — no es un schema que evolucione con el usuario.
4. **TypeScript cierra el loop**: `Record<string, boolean>` y `Record<string, number | string>` tipan correctamente estos campos desde el cliente.

## Consecuencias

**Positivas:**
- Schema de `capturas` es simple y estable — un renglón por indicador/municipio/ciclo/etapa
- Formularios de captura se generan dinámicamente desde el catálogo — no requieren migraciones cuando cambia un indicador
- `AnalisisIA` también se almacena como JSONB (`revisiones.analisis_ia`) por la misma razón

**Negativas / Limitaciones:**
- No es posible hacer `WHERE elementos_marcados.a = true` de forma directa con el ORM — se hace con `->>` de JSONB en queries raw o con RPC
- La validación de datos depende del frontend y de la lógica de negocio — PostgreSQL no puede hacer CHECK constraints sobre campos JSONB específicos fácilmente

## Ver también

- [[arquitectura/base-datos]] — tabla capturas completa
- [[arquitectura/ia]] — `analisis_ia` también usa JSONB
- [[proyecto/overview]] — estructura del catálogo GDM (módulos → temas → indicadores)
