# Convenciones de Código — Governa GDM

## TypeScript

- `strict: true` en `tsconfig.json` — sin excepciones
- Path alias `@/*` para imports desde la raíz (en lugar de `../../lib/...`)
- No usar `any` — si el tipo es desconocido usar `unknown` y hacer narrowing
- Los enums del dominio están en `types/index.ts` como `type` de TypeScript, no como `enum` nativo (para compatibilidad con los valores del schema Supabase)

## Nombrado

| Elemento | Convención | Ejemplo |
|----------|-----------|---------|
| Componentes | PascalCase | `LoginForm`, `SidebarNav` |
| Funciones | camelCase | `calcularSemaforoGestion` |
| Constantes de configuración | SCREAMING_SNAKE_CASE | `SEMAFORO_CONFIG`, `ROL_LABEL` |
| Archivos de componentes | kebab-case | `login-form.tsx`, `sidebar.tsx` |
| Archivos de utilidades | kebab-case | `utils.ts`, `database.types.ts` |
| Rutas de App Router | kebab-case (convención Next.js) | `login-form.tsx`, `route.ts` |
| Variables de DB | snake_case | `municipio_id`, `fecha_captura` |

## Componentes React

### Server vs Client Components

- **Por defecto**: Server Component (sin `'use client'`)
- **Usar `'use client'`** cuando:
  - El componente usa hooks de React (`useState`, `useEffect`, `useCallback`)
  - El componente maneja eventos del DOM (`onClick`, `onChange`)
  - El componente usa `useRouter`, `useSearchParams`, `usePathname`
  - El componente usa React Hook Form o Zustand

```tsx
// Server Component (default) — puede hacer fetch directamente
export default async function MunicipioPage({ params }: { params: { id: string } }) {
  const supabase = createServerClient()
  const { data } = await supabase.from('municipios').select('*').eq('id', params.id)
  return <div>{data?.nombre}</div>
}

// Client Component — necesita interactividad
'use client'
export function CapturaForm({ indicador }: { indicador: Indicador }) {
  const [valor, setValor] = useState('')
  // ...
}
```

### Estructura de un Componente

```tsx
// 1. Directiva (si es cliente)
'use client'

// 2. Imports externos
import { useState } from 'react'
import { useForm } from 'react-hook-form'

// 3. Imports internos (alias @/)
import { cn } from '@/lib/utils'
import type { Captura } from '@/types'

// 4. Tipos locales
interface Props {
  captura: Captura
  onSave: (data: Partial<Captura>) => Promise<void>
}

// 5. Componente
export function MiComponente({ captura, onSave }: Props) {
  // ...
}
```

## Helpers de Supabase

- En Server Components: usar `createServerClient()` de `@/lib/supabase/server`
- En Client Components: usar `createBrowserClient()` de `@/lib/supabase/client`
- Nunca usar la service role key en componentes cliente

## Tailwind y Estilos

- Usar la función `cn()` de `@/lib/utils` para combinar clases condicionales
- Preferir clases de Tailwind sobre CSS inline
- Los componentes base (botones, badges, inputs) usan las clases globales definidas en `app/globals.css`
- Colores de semáforo: usar `SEMAFORO_CONFIG[estado].color`, `.bg`, `.border`, `.dot` — no hardcodear clases de color

```tsx
// Correcto
<span className={cn('badge', SEMAFORO_CONFIG[semaforo].bg, SEMAFORO_CONFIG[semaforo].color)}>
  {SEMAFORO_CONFIG[semaforo].label}
</span>

// Incorrecto — hardcodear colores rompe la consistencia
<span className="bg-green-50 text-green-700">Óptimo</span>
```

## API Routes

Las API routes viven en `app/api/[recurso]/route.ts`. Estructura:

```ts
import { createServerClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const supabase = createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  // ...
}
```

## Ver también

- [[arquitectura/stack]] — stack y configuración de TypeScript
- [[convenciones/base-datos]] — naming de tablas y campos
- [[convenciones/commits]] — mensajes de commit
