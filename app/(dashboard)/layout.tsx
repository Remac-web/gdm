import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Sidebar from '@/components/layout/sidebar'
import Header from '@/components/layout/header'

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Query simple sin joins para evitar problemas de RLS
  const { data: usuario } = await supabase
    .from('usuarios')
    .select('id, nombre, apellidos, email, rol, municipio_id, direccion_id, activo')
    .eq('id', user.id)
    .single()

  if (!usuario) redirect('/login')

  // Buscar nombre del municipio por separado si existe
  let municipioNombre: string | null = null
  if (usuario.municipio_id) {
    const { data: mun } = await supabase
      .from('municipios')
      .select('nombre')
      .eq('id', usuario.municipio_id)
      .single()
    municipioNombre = (mun as { nombre: string } | null)?.nombre ?? null
  }

  // Construir objeto compatible con Sidebar y Header
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
