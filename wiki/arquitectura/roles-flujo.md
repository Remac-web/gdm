# Roles y Flujo de Trabajo — Governa GDM

## Los 5 Roles del Sistema

| Rol (DB) | Nombre UI | Función |
|----------|-----------|---------|
| `enlace_direccion` | Enlace de Dirección | Captura indicadores asignados a su dirección/área municipal |
| `enlace_municipal` | Enlace Municipal | Valida capturas internas y envía al revisor IES |
| `revisor_ies` | Revisor IES | Valida evidencias (con apoyo de IA) desde la universidad |
| `coordinador_oedm` | Coordinador OEDM | Vista panorámica estatal de todos los municipios |
| `admin` | Administrador | Gestiona usuarios, municipios, asignaciones |

## Flujo Principal de una Captura

```
enlace_direccion          enlace_municipal          revisor_ies
      │                          │                        │
  Captura indicador          Revisa captura           Revisa con IA
  Sube evidencias            Valida o devuelve        Acepta / observa
  Estado: borrador           Estado:                  Estado:
                             validado_enlace          aprobado_ies
                                                      observado_ies
```

### Estados de Captura (`estado_captura`)

```
borrador
  └─► enviado_enlace     (enlace_direccion envía al enlace_municipal)
        └─► validado_enlace  (enlace_municipal valida)
              └─► enviado_ies     (enlace_municipal envía al revisor IES)
                    ├─► aprobado_ies   (revisor aprueba)
                    └─► observado_ies  (revisor devuelve con observaciones)
                              └─► [vuelve a enviado_ies tras corrección]
```

### ¿Qué puede hacer cada rol?

| Acción | enlace_dir | enlace_mun | revisor_ies | coord_oedm | admin |
|--------|:----------:|:----------:|:-----------:|:----------:|:-----:|
| Crear captura | ✓ | — | — | — | — |
| Subir evidencias | ✓ | — | — | — | — |
| Enviar a revisión interna | ✓ | — | — | — | — |
| Validar y enviar a IES | — | ✓ | — | — | — |
| Revisar con IA | — | — | ✓ | — | — |
| Aprobar / observar | — | — | ✓ | — | — |
| Ver panel estatal | — | — | — | ✓ | — |
| Gestionar usuarios | — | — | — | — | ✓ |
| Gestionar municipios | — | — | — | — | ✓ |

## Redirect Inteligente por Rol

Al acceder a `/dashboard`, el sistema redirige automáticamente:

| Rol | Destino |
|-----|---------|
| `enlace_municipal` | `/dashboard/municipio` |
| `enlace_direccion` | `/dashboard/municipio` |
| `revisor_ies` | `/dashboard/revisiones` |
| `coordinador_oedm` | `/dashboard/estado` |
| `admin` | `/dashboard/admin` |

Implementado en `app/(dashboard)/dashboard/page.tsx`.

## Rutas del Dashboard

| Ruta | Propósito | Rol principal |
|------|-----------|---------------|
| `/dashboard/municipio/[id]` | Dashboard del municipio: semáforo por módulo | enlace_municipal, enlace_direccion |
| `/dashboard/indicadores` | Captura de indicadores | enlace_direccion |
| `/dashboard/evidencias` | Gestión de archivos adjuntos | enlace_direccion |
| `/dashboard/revisiones` | Panel del revisor IES | revisor_ies |
| `/dashboard/estado` | Panel coordinador estatal | coordinador_oedm |
| `/dashboard/admin` | Gestión de usuarios y municipios | admin |

## Flujo de Revisión con IA

Cuando `enlace_municipal` envía a IES:
1. Se crea una `revision` de `tipo: 'ia'` en estado `pendiente`
2. Un API route envía el prompt a Claude con el contexto del indicador y las evidencias
3. Claude devuelve análisis estructurado (`AnalisisIA`): cumple, elementos_verificados, observaciones, sugerencias, nivel_confianza
4. El `revisor_ies` ve el análisis de IA y puede aceptar la sugerencia o usar su criterio propio
5. Se registra si `acepta_sugerencia_ia = true/false` para tracking de investigación

## Ver también

- [[arquitectura/ia]] — detalle de la integración con Claude
- [[arquitectura/base-datos]] — esquema de capturas, evidencias, revisiones
- [[convenciones/codigo]] — cómo se implementa el redirect por rol
