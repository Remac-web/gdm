# ADR 002 — Nombre de Marca: "Governa"

| Campo | Valor |
|-------|-------|
| **Estado** | Aceptado |
| **Fecha** | 2026-04-23 |
| **Autor** | Remac (desarrollador principal) |

## Contexto

El proyecto necesita un nombre de marca que:
- Comunique su naturaleza (gobernanza municipal)
- Sea extensible a múltiples módulos (no atado al GDM específicamente)
- Funcione en español e inglés
- Sea memorable y profesional para el mercado gubernamental mexicano

## Decisión

El ecosistema de plataformas de Remac se llama **Governa**. Cada módulo se denomina con un sufijo descriptivo:
- **Governa GDM** — Guía Consultiva de Desempeño Municipal
- **Governa Planes** — PMD y POA
- **Governa Informes** — Informes de gobierno e ISV ODS
- **Governa Dashboard** — Panel ejecutivo

El desarrollador y empresa propietaria es **Remac** (remac.mx), San Luis Potosí, México.

## Razonamiento

"Governa" combina:
- "Govern-" (gobernar, governance) — reconocible en contexto municipal
- Terminación "-a" — suaviza el término, suena a plataforma/herramienta
- Funciona como sustantivo y como verbo implícito en español
- Diferencia del término inglés "Govern" — da identidad propia

El nombre es escalable: "Governa [módulo]" funciona como familia de productos.

## Consecuencias

- La identidad visual (indigo, tipografía Lexend para display) complementa el nombre
- El repo en GitHub está bajo la organización `Remac-web`, el módulo GDM es `gdm`
- El `package.json` usa `name: "governa"` como nombre de la aplicación
- En la UI se muestra `NEXT_PUBLIC_APP_NAME=GDM` para el módulo activo

## Ver también

- [[proyecto/ecosistema]] — el ecosistema completo de módulos
- [[arquitectura/stack]] — identidad visual y sistema de diseño
