import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Sidebar from '@/components/layout/sidebar'
import Header from '@/components/layout/header'

type UsuarioRow = {
  id: string
  nombre: string
  apellidos: string | null
  email: string
  rol: string
  municipio_id: string | null
  direccion_id: string | null
  activo: boolean
}

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: usuarioRaw } = await supabase
    .from('usuarios')
    .select('id, nombre, apellidos, email, rol, municipio_id, direccion_id, activo')
    .eq('id', user.id)
    .single()

  const usuario = usuarioRaw as UsuarioRow | null
  if (!usuario) redirect('/login')

  let municipioNombre: string | null = null
  if (usuario.municipio_id) {
    const { data: mun } = await supabase
      .from('municipios')
      .select('nombre')
      .eq('id', usuario.municipio_id)
      .single()
    municipioNombre = (mun as { nombre: string } | null)?.nombre ?? null
  }

  const usuarioConMunicipio = {
    ...usuario,
    municipios: municipioNombre ? { nombre: municipioNombre } : null,
    direcciones_municipio: null
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar usuario={usuarioConMunicipio} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header usuario={usuarioConMunicipio} />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
