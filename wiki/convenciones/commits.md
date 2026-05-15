# Convenciones de Commits — Governa GDM

## Formato

Se sigue **Conventional Commits** con mensajes en **español**:

```
<tipo>: <descripción en español, imperativo, minúsculas>
```

Opcionalmente con cuerpo y pie:

```
<tipo>(<alcance>): <descripción>

<cuerpo explicativo>

<pie: refs, breaking changes>
```

## Tipos

| Tipo | Cuándo usarlo |
|------|--------------|
| `feat` | Nueva funcionalidad visible para el usuario |
| `fix` | Corrección de bug o error |
| `refactor` | Reorganización de código sin cambiar comportamiento |
| `style` | Cambios de formato, estilos, sin lógica |
| `docs` | Documentación, wiki, README |
| `test` | Tests (cuando existan) |
| `chore` | Configuración, dependencias, build |
| `db` | Cambios de esquema o migraciones SQL |
| `perf` | Mejora de rendimiento |

## Ejemplos del Proyecto

```bash
feat: scaffold inicial Governa GDM
feat: agregar fuentes GDM en markdown para wiki
fix: tipos explícitos en server cookies
fix: tipos explícitos en middleware cookies
fix: cast explícito en dashboard redirect
fix: tipo rol en dashboard redirect
fix: database types completos
fix: agregar database.types.ts placeholder
fix: mover archivos a raíz del repo
```

## Reglas

1. La descripción va en minúsculas (excepto siglas: GDM, IES, OEDM)
2. Sin punto al final de la línea de título
3. Tiempo imperativo: "agregar", "corregir", "mover" — no "agregado", "corregido"
4. Máximo ~72 caracteres en la línea de título
5. Si el commit abarca múltiples archivos con un propósito cohesionado, un solo commit es suficiente
6. Commits atómicos: un cambio lógico por commit — facilita el `git bisect` y el historial

## Scope Opcional

El scope clarifica el módulo afectado:

```bash
feat(auth): implementar logout automático por inactividad
fix(captura): corregir cálculo de semáforo para indicador de desempeño
feat(revisiones): integrar análisis IA con Claude Sonnet
db(migrations): agregar índice en capturas.municipio_id
```

## Wiki y Documentación

Los cambios a la wiki se registran con `docs`:

```bash
docs(wiki): agregar ADR 005 sobre estrategia de testing
docs(wiki): actualizar estado-actual tras sesión 2026-05-20
docs(wiki): registrar decisión de deploy en Vercel
```

## Ver también

- [[convenciones/codigo]] — estilo de código
- [[log.md]] — registro cronológico de sesiones
