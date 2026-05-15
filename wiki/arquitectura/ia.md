# Integración de IA — Governa GDM

## Propósito

Governa GDM usa la **API de Anthropic Claude** para realizar revisiones automáticas de evidencias municipales. La IA actúa como asistente del revisor IES: analiza las evidencias subidas por el municipio y emite una recomendación estructurada antes de que el revisor humano tome su decisión.

Esta integración es también material de investigación doctoral sobre el uso de IA en procesos de gobernanza municipal.

## Modelo

Se usa Claude de Anthropic. El campo `modelo_ia` en la tabla `revisiones` registra el modelo exacto utilizado en cada revisión (ej: `claude-opus-4-7`, `claude-sonnet-4-6`). Esto permite comparar resultados por modelo en el análisis de investigación.

## Variable de Entorno

```
ANTHROPIC_API_KEY=
```

## Flujo de Revisión IA

1. El `enlace_municipal` envía la captura a revisión IES → estado `enviado_ies`
2. Se crea un registro en `revisiones` con `tipo: 'ia'`, `estado: 'pendiente'`
3. Un API route (`app/api/revisiones/`) construye el prompt y llama a Claude
4. El prompt incluye:
   - Definición del indicador (nombre, tipo, elementos o fórmula)
   - Criterios de semáforo (`CriterioSemaforo`)
   - Elementos capturados por el municipio (`elementos_marcados` o `variables_calculo`)
   - URLs de evidencias adjuntas
5. Claude devuelve un JSON estructurado con el tipo `AnalisisIA`
6. El resultado se guarda en `revisiones.analisis_ia` (JSONB)
7. El `revisor_ies` ve el análisis y toma su decisión

## Estructura de la Respuesta IA (`AnalisisIA`)

```typescript
interface AnalisisIA {
  cumple: boolean                              // ¿El indicador está en óptimo?
  elementos_verificados: Record<string, boolean> // Por inciso: {a: true, b: false}
  observaciones: string[]                      // Qué falta o no cumple
  sugerencias: string[]                        // Recomendaciones al municipio
  nivel_confianza: 'alto' | 'medio' | 'bajo'  // Certeza del análisis
}
```

## Datos de Investigación Registrados

La tabla `revisiones` captura metadatos para análisis posterior:

| Campo | Dato de investigación |
|-------|----------------------|
| `prompt_enviado` | Prompt exacto (auditoría y mejora) |
| `respuesta_ia` | Respuesta raw de Claude |
| `modelo_ia` | Qué modelo se usó |
| `tokens_usados` | Para análisis de costos |
| `costo_usd` | Costo real de cada revisión |
| `acepta_sugerencia_ia` | ¿El revisor humano siguió la IA? |
| `resultado_revision` | Decisión final (para comparar con IA) |

Estos datos permiten responder preguntas de investigación como:
- ¿Qué tasa de acuerdo hay entre IA y revisor humano por módulo/tipo de indicador?
- ¿Cuál es el costo promedio por municipio por ciclo?
- ¿Qué tipo de indicadores tienen mayor divergencia IA-humano?

## Consideraciones de Diseño

- La IA **sugiere**, no decide. El revisor humano siempre tiene la última palabra.
- Si la revisión IA falla (timeout, error), la captura puede ser revisada directamente por el humano.
- El prompt se guarda íntegramente para reproducibilidad de investigación.
- Los indicadores `no_medible` no se envían a revisión IA.

## Ver también

- [[arquitectura/roles-flujo]] — flujo de revisión en contexto
- [[arquitectura/base-datos]] — tabla revisiones y AnalisisIA
- [[proyecto/negocio]] — IA como diferenciador comercial
- [[proyecto/ecosistema]] — contexto de investigación doctoral
