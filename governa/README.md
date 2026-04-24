# Governa — Plataforma de Gobernanza Municipal

> Módulo GDM · Guía Consultiva de Desempeño Municipal INAFED 2025–2027

Governa es una plataforma SaaS para que municipios y gobiernos estatales gestionen, evidencien y validen el cumplimiento de indicadores de desempeño municipal. Este repositorio corresponde al **módulo GDM** — gestión de evidencias para la Guía Consultiva de Desempeño Municipal del INAFED.

---

## Stack

| Capa | Tecnología |
|------|-----------|
| Frontend | Next.js 14 (App Router) · TypeScript · Tailwind CSS |
| Backend / DB | Supabase (PostgreSQL + RLS + Storage) |
| Auth | Supabase Auth |
| IA | Anthropic Claude API (revisión de evidencias) |
| Deploy | Vercel |

---

## Perfiles de usuario

| Rol | Función |
|-----|---------|
| `enlace_municipal` | Valida capturas de su municipio y envía a revisión IES |
| `enlace_direccion` | Captura indicadores asignados a su dirección/área |
| `revisor_ies` | Valida evidencias con apoyo de IA (universidad) |
| `coordinador_oedm` | Vista panorámica estatal |
| `admin` | Gestión de usuarios, municipios y asignaciones |

---

## Estructura del proyecto

```
governa/
├── app/
│   ├── (auth)/
│   │   └── login/          # Página de autenticación
│   └── (dashboard)/
│       ├── layout.tsx       # Layout con sidebar por rol
│       ├── dashboard/       # Redirect inteligente por rol
│       ├── municipio/       # Dashboard del enlace municipal
│       ├── indicadores/     # Captura de indicadores
│       ├── evidencias/      # Gestión de archivos
│       ├── revisiones/      # Panel del revisor IES
│       ├── estado/          # Panel coordinador OEDM
│       └── admin/           # Administración
├── components/
│   ├── layout/              # Sidebar, Header
│   ├── ui/                  # Componentes base
│   ├── forms/               # Formularios de captura
│   └── charts/              # Visualizaciones de semáforo
├── lib/
│   ├── supabase/            # Cliente browser, server y middleware
│   └── utils.ts             # Helpers: semáforo, formatos, clases
├── types/
│   └── index.ts             # Tipos TypeScript del dominio GDM
└── middleware.ts             # Protección de rutas por auth
```

---

## Setup local

```bash
# 1. Clonar
git clone https://github.com/Remac-web/gdm.git
cd gdm

# 2. Instalar dependencias
npm install

# 3. Variables de entorno
cp .env.local.example .env.local
# Editar .env.local con tus credenciales de Supabase y Anthropic

# 4. Generar tipos de Supabase (opcional, requiere Supabase CLI)
npm run db:types

# 5. Desarrollo
npm run dev
```

---

## Base de datos

Las migraciones SQL están en `/supabase/migrations/` (ver carpeta `sigdm_migrations` en la sesión de diseño).

Orden de ejecución:
1. `01_extensions_enums.sql`
2. `02_catalogo_gdm.sql` — 8 módulos, 31 temas, 115 indicadores
3. `03_municipios_usuarios.sql` — 59 municipios SLP, catálogo Art. 115
4. `04_capturas_evidencias_revisiones.sql`
5. `05_rls_policies.sql`
6. `06_storage_views.sql`

---

## Variables de entorno requeridas

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ANTHROPIC_API_KEY=
NEXT_PUBLIC_APP_URL=
```

---

## Ecosistema Governa

Este módulo es parte del ecosistema **Governa** de Remac:

- **Governa GDM** ← este repositorio
- Governa Planes — PMD y POA con metodología de marco lógico *(próximamente)*
- Governa Informes — Informe de gobierno e ISV ODS *(próximamente)*
- Governa Dashboard — Panel ejecutivo para presidentes municipales *(próximamente)*

---

*Desarrollado por [Remac](https://remac.mx) · San Luis Potosí, México*
