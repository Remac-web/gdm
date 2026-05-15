# CLAUDE.md — Governa GDM · Schema de Operación de Wiki

> Este archivo es el protocolo de operación para sesiones de desarrollo con Claude.
> Define la estructura del conocimiento, las reglas de mantenimiento de la wiki,
> y los procedimientos exactos para cada operación.
> Basado en el patrón LLM Wiki de Andrej Karpathy.

---

## 1. Arquitectura del Conocimiento

El repositorio tiene tres capas con permisos distintos:

| Capa | Ubicación | Permisos | Descripción |
|------|-----------|----------|-------------|
| **Fuentes crudas** | `raw/gdm/` | **Solo lectura — nunca modificar** | Documentos INAFED oficiales. Fuente de verdad del dominio. |
| **Wiki** | `wiki/` | Lectura + Escritura | Síntesis generada por Claude. Páginas de entidades, decisiones, progreso. |
| **Schema** | `CLAUDE.md` | Lectura + Escritura | Este archivo. Actualizar si el protocolo cambia. |

### Fuentes Crudas Disponibles

| Archivo | Descripción |
|---------|-------------|
| `raw/gdm/lineamientos.md` | Lineamientos operativos GDM INAFED (enero 2026, ~521p) — roles, responsabilidades, etapas |
| `raw/gdm/cuaderno-trabajo.md` | Catálogo GDM 2025-2027: 8 módulos, 31 temas, 115 indicadores con criterios de semáforo |

---

## 2. Mapa de la Wiki

```
wiki/
├── index.md                          # Catálogo de todas las páginas
├── log.md                            # Registro cronológico (append-only)
│
├── proyecto/
│   ├── overview.md                   # Qué es Governa GDM, contexto INAFED
│   ├── ecosistema.md                 # Módulos Governa y hoja de ruta
│   └── negocio.md                    # Modelo de negocio SaaS
│
├── arquitectura/
│   ├── stack.md                      # Next.js, Supabase, Tailwind, Vercel
│   ├── base-datos.md                 # Esquema PostgreSQL, tablas, vistas, enums
│   ├── roles-flujo.md                # 5 roles y flujo captura→revisión
│   └── ia.md                         # Integración Anthropic Claude API
│
├── decisiones/                       # Architecture Decision Records (ADR)
│   ├── 001-supabase.md
│   ├── 002-nombre-governa.md
│   ├── 003-nextjs-app-router.md
│   └── 004-jsonb-elementos.md
│
├── progreso/
│   ├── estado-actual.md              # Estado de implementación (actualizar cada sesión)
│   ├── pendientes.md                 # Backlog priorizado
│   └── sesiones/
│       └── YYYY-MM-DD.md             # Log detallado de cada sesión
│
└── convenciones/
    ├── codigo.md                     # TypeScript/React
    ├── base-datos.md                 # PostgreSQL/Supabase
    └── commits.md                    # Conventional Commits en español
```

---

## 3. Procedimientos de Operación

### 3.1 Al Inicio de una Sesión

**Siempre hacer al iniciar:**

1. Leer `wiki/index.md` — orientación rápida del estado del proyecto
2. Leer `wiki/progreso/estado-actual.md` — qué está hecho y qué no
3. Leer `wiki/progreso/pendientes.md` — qué hay que construir
4. Si la sesión tiene objetivo específico, leer las páginas relevantes de `wiki/arquitectura/`

No es necesario leer todas las páginas en cada sesión. El índice es suficiente para orientarse.

---

### 3.2 Al Final de una Sesión (OBLIGATORIO)

**Al terminar cualquier sesión de desarrollo, ejecutar estos pasos en orden:**

#### Paso 1 — Crear archivo de sesión

Crear `wiki/progreso/sesiones/YYYY-MM-DD.md` con la fecha del día:

```markdown
# Sesión YYYY-MM-DD — [Título descriptivo]

## Resumen
[2-3 oraciones describiendo lo que se hizo]

## Commits de Esta Sesión
| Hash | Mensaje |
|------|---------|
| `abc1234` | tipo: descripción |

## Lo que se Construyó
[Lista detallada de archivos creados/modificados y su propósito]

## Problemas Encontrados y Resueltos
[Bugs, errores de TypeScript, decisiones tomadas sobre la marcha]

## Estado al Final de la Sesión
[Snapshot del estado — qué funciona, qué no]

## Ver también
- [[progreso/estado-actual]]
- [[progreso/pendientes]]
```

#### Paso 2 — Actualizar `wiki/progreso/estado-actual.md`

- Cambiar el estado de cada módulo funcional trabajado
- Actualizar la fecha de "Última actualización" al tope del archivo

#### Paso 3 — Actualizar `wiki/progreso/pendientes.md`

- Marcar como completos los ítems terminados (o eliminarlos)
- Agregar nuevos pendientes descubiertos durante la sesión
- Re-priorizar si hay cambios

#### Paso 4 — Agregar entrada al log

Agregar al final de `wiki/log.md`:

```
[YYYY-MM-DD] | sesión | [descripción de una línea]. Ver sesiones/YYYY-MM-DD.md.
```

Si se tomaron decisiones técnicas:
```
[YYYY-MM-DD] | decisión | ADR 00N: [descripción breve].
```

Si se ingresó una nueva fuente a `raw/`:
```
[YYYY-MM-DD] | ingest | [nombre del archivo] agregado a raw/. [Páginas/descripción].
```

#### Paso 5 — Actualizar páginas de wiki afectadas

Si en la sesión se construyó algo que cambia la arquitectura, el stack o las convenciones, actualizar la página correspondiente en `wiki/arquitectura/` o `wiki/convenciones/`.

#### Paso 6 — Commit de la wiki

```bash
git add wiki/ CLAUDE.md
git commit -m "docs(wiki): actualizar wiki sesión YYYY-MM-DD"
```

---

### 3.3 Registrar una Decisión Técnica (ADR)

Cuando se toma una decisión técnica significativa:

1. Determinar el siguiente número de ADR (ver directorio `wiki/decisiones/`)
2. Crear `wiki/decisiones/00N-nombre-descriptivo.md` con la plantilla:

```markdown
# ADR 00N — [Título de la Decisión]

| Campo | Valor |
|-------|-------|
| **Estado** | Propuesto / Aceptado / Rechazado / Deprecado |
| **Fecha** | YYYY-MM-DD |
| **Autor** | Remac (desarrollador principal) |

## Contexto
[Por qué se necesitaba tomar esta decisión]

## Decisión
[Qué se decidió, en una oración clara]

## Alternativas Consideradas
| Alternativa | Razón de descarte |
|------------|-------------------|

## Consecuencias
**Positivas:**
- ...

**Negativas / Riesgos:**
- ...

## Notas de Investigación (opcional)
[Si aplica al contexto doctoral]

## Ver también
- [[páginas relacionadas]]
```

3. Agregar el ADR al índice en `wiki/index.md` bajo "Decisiones Técnicas"
4. Agregar entrada al log: `[YYYY-MM-DD] | decisión | ADR 00N: descripción.`

---

### 3.4 Ingestar una Nueva Fuente

Cuando se agrega un documento a `raw/gdm/`:

1. Leer el documento completo
2. Identificar qué páginas de la wiki deben actualizarse (típicamente: `proyecto/overview.md`, `arquitectura/base-datos.md`, páginas relevantes de dominio)
3. Actualizar o crear páginas de wiki con la información nueva
4. Agregar entrada al log: `[YYYY-MM-DD] | ingest | nombre-archivo.md agregado a raw/gdm/.`
5. Agregar el archivo a la tabla de "Fuentes Crudas" en `wiki/index.md`

---

### 3.5 Lint de la Wiki (Periódico)

Ejecutar ocasionalmente para mantener la calidad de la wiki:

- [ ] ¿Hay páginas en `wiki/` que no aparecen en `wiki/index.md`?
- [ ] ¿Hay referencias `[[página]]` que apuntan a páginas que no existen?
- [ ] ¿`progreso/estado-actual.md` refleja el estado real del código?
- [ ] ¿`progreso/pendientes.md` tiene ítems que ya están completos en el código?
- [ ] ¿Hay ADRs cuyo estado debería cambiar a "Deprecado"?
- [ ] ¿`wiki/log.md` tiene entradas de todas las sesiones en `wiki/progreso/sesiones/`?

---

## 4. Convenciones de la Wiki

### Formato de Páginas

- Título H1 en la primera línea
- Usar tablas para comparaciones y listas estructuradas
- Los términos clave del dominio van en **negrita** la primera vez que aparecen
- Los valores de enum y nombres de campos de DB van en `backticks`
- Las rutas de código van en `backticks`

### Referencias entre Páginas

Usar `[[ruta/sin-extensión]]` para referencias entre páginas de la wiki:

```markdown
Ver [[arquitectura/base-datos]] para el esquema completo.
Ver [[decisiones/001-supabase]] para la justificación de esta elección.
```

### Sección "Ver también"

Cada página debe terminar con una sección `## Ver también` con 2-5 referencias a páginas relacionadas.

### Idioma

Todo el contenido de la wiki en **español** (el proyecto es para gobierno municipal de México). El código y los nombres técnicos de herramientas en inglés cuando corresponde.

---

## 5. Contexto del Proyecto (Resumen Ejecutivo)

Para orientación rápida sin leer la wiki:

| Atributo | Valor |
|----------|-------|
| **Proyecto** | Governa GDM — plataforma SaaS de gobernanza municipal |
| **Empresa** | Remac, San Luis Potosí, México |
| **Desarrollador** | Una sola persona (desarrollador principal + investigador doctoral) |
| **Programa** | GDM — Guía Consultiva de Desempeño Municipal, INAFED 2025-2027 |
| **Alcance inicial** | 59 municipios de San Luis Potosí |
| **Stack** | Next.js 14 App Router · TypeScript · Supabase · Tailwind · Vercel · Anthropic Claude |
| **Estado** | Scaffold completo · UI funcional pendiente · DB migraciones pendientes |
| **Módulo** | GDM es el primero del ecosistema Governa (Planes, Informes, Dashboard futuros) |
| **IA** | Claude revisa evidencias municipales — datos de investigación doctoral |

---

## 6. Reglas Fundamentales

1. `raw/` es **inmutable** — nunca crear, editar ni borrar archivos en `raw/`
2. `wiki/log.md` es **append-only** — nunca editar entradas anteriores
3. Actualizar la wiki al **final de cada sesión** — nunca dejar sesiones sin documentar
4. Los ADRs una vez "Aceptados" no se borran — si una decisión cambia, crear un nuevo ADR que lo supera y marcar el anterior como "Deprecado"
5. `wiki/progreso/estado-actual.md` debe reflejar el estado **real** del código, no el aspiracional
6. Antes de implementar algo que no está en la wiki, verificar si hay un ADR o convención relevante

---

## 7. Comandos Útiles

```bash
# Verificar tipos TypeScript
npm run type-check

# Lint
npm run lint

# Regenerar tipos de Supabase (requiere Supabase CLI y proyecto activo)
npm run db:types

# Servidor de desarrollo
npm run dev

# Commit de wiki después de una sesión
git add wiki/ CLAUDE.md
git commit -m "docs(wiki): actualizar wiki sesión YYYY-MM-DD"
```

---

*Schema definido: 2026-05-15 · Patrón: LLM Wiki (Karpathy) · Proyecto: Governa GDM · Remac*
