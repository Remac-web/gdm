# Convenciones de Base de Datos — Governa GDM

## Nombrado en PostgreSQL

| Elemento | Convención | Ejemplo |
|----------|-----------|---------|
| Tablas | `snake_case`, plural | `capturas`, `municipios`, `revisiones` |
| Columnas | `snake_case` | `municipio_id`, `fecha_captura`, `activo` |
| Vistas | `vista_` + descriptor | `vista_semaforo_municipio`, `vista_panel_estado` |
| Enums | `snake_case` | `rol_usuario`, `estado_semaforo`, `etapa_gdm` |
| Valores de enum | `snake_case` | `enlace_municipal`, `en_proceso`, `info_no_disponible` |
| Funciones | `snake_case` verbo_sustantivo | `calcular_semaforo()` |
| Índices | `idx_tabla_columna` | `idx_capturas_municipio_id` |
| Políticas RLS | `nombre descriptivo entre comillas` | `"Municipios: solo ver los propios"` |

## PKs y FKs

- Todas las PKs son `uuid` generadas con `gen_random_uuid()`
- Excepción: claves del catálogo GDM (`modulo_id`, `tema_id`, `indicador_id`) son `integer` autoincremental — son identificadores del programa INAFED, predecibles y estables
- FKs usan el patrón `{tabla_referenciada_singular}_id` → `municipio_id`, `captura_id`, `usuario_id`

## Campos de Auditoría

Todas las tablas transaccionales incluyen:
```sql
created_at timestamptz DEFAULT now() NOT NULL,
updated_at timestamptz DEFAULT now() NOT NULL
```

El campo `updated_at` se actualiza con un trigger en cada UPDATE.

## Soft Delete

Las entidades que se "desactivan" (no se borran físicamente) usan:
```sql
activo boolean DEFAULT true NOT NULL
```

Nunca usar `DELETE` físico en producción para entidades de usuario, municipios, evidencias.

## JSONB

Los campos JSONB (`elementos_marcados`, `variables_calculo`, `analisis_ia`) siguen una estructura conocida en la aplicación:

| Campo | Estructura esperada |
|-------|-------------------|
| `capturas.elementos_marcados` | `{"a": true, "b": false, "c": true}` |
| `capturas.variables_calculo` | `{"A": 120, "B": 5000, "X1": 2.5}` |
| `revisiones.analisis_ia` | `AnalisisIA` (ver types/index.ts) |

## Row Level Security (RLS)

RLS está habilitado en todas las tablas transaccionales. Principios:

- `enlace_direccion` / `enlace_municipal`: solo ven datos de su `municipio_id`
- `revisor_ies`: ven capturas enviadas a IES (`estado = 'enviado_ies'`) de los municipios asignados
- `coordinador_oedm`: ven todos los municipios del estado (vía vista)
- `admin`: acceso total (usa service role key solo en API routes del servidor)
- Las políticas se definen en `05_rls_policies.sql`

## Orden de Migraciones

```
01_extensions_enums.sql     # uuid-ossp, pgcrypto; enums de dominio
02_catalogo_gdm.sql          # Módulos, temas, indicadores (catálogo inmutable)
03_municipios_usuarios.sql   # 59 municipios SLP, catálogo Art. 115, tabla usuarios
04_capturas_evidencias.sql   # Tablas transaccionales: capturas, evidencias, revisiones
05_rls_policies.sql          # Políticas de Row Level Security
06_storage_views.sql         # Bucket de Supabase Storage + vistas SQL
```

Nunca reordenar — las migraciones tienen dependencias. Si se necesita cambiar algo, agregar una migración nueva.

## Tipos TypeScript ↔ PostgreSQL

| PostgreSQL | TypeScript |
|-----------|-----------|
| `uuid` | `string` |
| `text` | `string` |
| `integer` | `number` |
| `numeric` | `number` |
| `boolean` | `boolean` |
| `timestamptz` | `string` (ISO 8601) |
| `jsonb` | `Record<string, ...> \| null` |
| enum | union type (`'a' \| 'b' \| 'c'`) |

Los tipos generados por `npm run db:types` son la fuente de verdad. Los tipos en `types/index.ts` derivan de ellos.

## Ver también

- [[arquitectura/base-datos]] — esquema completo
- [[decisiones/001-supabase]] — por qué Supabase/PostgreSQL
- [[decisiones/004-jsonb-elementos]] — por qué JSONB para elementos/variables
