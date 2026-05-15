# Base de Datos — Governa GDM

## Motor y Proveedor

PostgreSQL hospedado en **Supabase**. Se usa RLS (Row Level Security) para restringir acceso por rol desde el cliente.

Los tipos TypeScript del esquema están en `types/database.types.ts` (generados con `npm run db:types`).

## Tablas

### `usuarios`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | uuid | PK, referencia a `auth.users` de Supabase |
| `nombre` | text | Nombre del usuario |
| `apellidos` | text? | Apellidos |
| `email` | text | Email (único) |
| `rol` | `rol_usuario` | Rol en el sistema |
| `municipio_id` | uuid? | FK → municipios (null para admin/OEDM) |
| `direccion_id` | uuid? | FK → direcciones_municipio (solo enlace_direccion) |
| `telefono` | text? | Teléfono de contacto |
| `activo` | boolean | Soft delete |
| `created_at`, `updated_at` | timestamptz | Auditoría |

### `municipios`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | uuid | PK |
| `nombre` | text | Nombre oficial del municipio |
| `clave_inegi` | text | Clave INEGI (único) |
| `rango_poblacion` | text? | Rango demográfico |
| `activo` | boolean | Soft delete |

Catálogo inicial: 59 municipios de San Luis Potosí.

### `direcciones_municipio`

Unidades administrativas dentro de un municipio (tesorería, obras, etc.).

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | uuid | PK |
| `municipio_id` | uuid | FK → municipios |
| `unidad_adm_catalogo_id` | integer? | FK a catálogo del Art. 115 |
| `nombre_personalizado` | text | Nombre que usa el municipio para esa dirección |
| `responsable_nombre` | text? | Nombre del director |
| `responsable_cargo` | text? | Cargo oficial |
| `activo` | boolean | Soft delete |
| `created_by` | uuid? | FK → usuarios |

### `capturas`

La tabla central. Registra la evaluación de un indicador por un municipio en un ciclo/etapa.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | uuid | PK |
| `municipio_id` | uuid | FK → municipios |
| `indicador_id` | integer | FK → catálogo GDM (no en DB, en JSON) |
| `direccion_id` | uuid? | FK → direcciones_municipio |
| `ciclo` | `ciclo_gdm` | '2025' / '2026' / '2027' |
| `etapa` | `etapa_gdm` | diagnostico / actualizacion / revision |
| `elementos_marcados` | JSONB? | `{a: true, b: false, c: true}` — gestión |
| `variables_calculo` | JSONB? | `{A: 120, B: 5000}` — desempeño |
| `resultado_numerico` | numeric? | Resultado calculado (desempeño) |
| `semaforo` | `estado_semaforo`? | Estado calculado |
| `no_medible` | boolean | Indica que el municipio no puede medir |
| `estado` | `estado_captura` | Flujo de trabajo |
| `capturado_por` | uuid | FK → usuarios |
| `validado_por` | uuid? | FK → usuarios |
| `fecha_captura`, `fecha_validacion`, `fecha_envio_ies` | timestamptz? | Hitos de flujo |
| `notas_captura`, `notas_validacion` | text? | Observaciones |

### `evidencias`

Archivos adjuntos que respaldan una captura.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | uuid | PK |
| `captura_id` | uuid | FK → capturas |
| `municipio_id` | uuid | Desnormalizado para RLS |
| `indicador_id` | integer | Desnormalizado |
| `nombre_archivo` | text | Nombre original |
| `url_storage` | text | Ruta en Supabase Storage |
| `tipo_archivo` | text? | MIME type |
| `extension` | text? | pdf, jpg, xlsx... |
| `tamanio_bytes` | integer? | Tamaño |
| `descripcion` | text? | Descripción del contenido |
| `uploaded_by` | uuid | FK → usuarios |
| `activo` | boolean | Soft delete |

### `revisiones`

Historial de revisiones (IA y humanas) de una captura.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | uuid | PK |
| `captura_id` | uuid | FK → capturas |
| `tipo` | `tipo_revision` | 'ia' o 'humano' |
| `revisor_id` | uuid? | FK → usuarios (null para IA) |
| `estado` | text | pendiente / en_revision / aprobado / rechazado / observado |
| `prompt_enviado` | text? | Prompt exacto enviado a Claude |
| `respuesta_ia` | text? | Respuesta raw de Claude |
| `analisis_ia` | JSONB? | Análisis estructurado de IA |
| `modelo_ia` | text? | Ej: "claude-opus-4-7" |
| `tokens_usados` | integer? | Para tracking de costos |
| `costo_usd` | numeric? | Costo calculado |
| `acepta_sugerencia_ia` | boolean? | Si el revisor aceptó la sugerencia |
| `comentario_revisor` | text? | Notas del revisor humano |
| `elementos_verificados` | JSONB? | Checklist del revisor |
| `resultado_revision` | `estado_semaforo`? | Resultado final |

## Enums de PostgreSQL

| Enum | Valores |
|------|---------|
| `rol_usuario` | enlace_municipal, enlace_direccion, revisor_ies, coordinador_oedm, admin |
| `estado_semaforo` | rezago, en_proceso, optimo, no_medible, info_no_disponible |
| `etapa_gdm` | diagnostico, actualizacion, revision |
| `ciclo_gdm` | 2025, 2026, 2027 |
| `estado_captura` | borrador, enviado_enlace, validado_enlace, enviado_ies, aprobado_ies, observado_ies |
| `tipo_indicador` | gestion, desempeno |
| `tipo_revision` | ia, humano |

## Vistas

### `vista_semaforo_municipio`

Agrega el semáforo por módulo para un municipio/ciclo/etapa. Columnas clave: `municipio_id`, `modulo_id`, `ciclo`, `etapa`, `optimo`, `en_proceso`, `rezago`, `pct_optimo`.

### `vista_panel_estado`

Vista del coordinador OEDM: un renglón por municipio con totales agregados y nombre del revisor IES asignado.

## Migraciones

Las migraciones están en `supabase/migrations/` (no incluidas en este repo — se ejecutan en el proyecto Supabase). Orden:

1. `01_extensions_enums.sql` — extensiones (uuid-ossp) y enums
2. `02_catalogo_gdm.sql` — módulos, temas, indicadores (8/31/115)
3. `03_municipios_usuarios.sql` — 59 municipios SLP, catálogo Art. 115
4. `04_capturas_evidencias_revisiones.sql` — tablas transaccionales
5. `05_rls_policies.sql` — Row Level Security por rol
6. `06_storage_views.sql` — bucket de storage y vistas

## Ver también

- [[decisiones/001-supabase]] — por qué Supabase
- [[decisiones/004-jsonb-elementos]] — por qué JSONB para elementos/variables
- [[arquitectura/roles-flujo]] — cómo los roles interactúan con las tablas
- [[convenciones/base-datos]] — naming conventions
