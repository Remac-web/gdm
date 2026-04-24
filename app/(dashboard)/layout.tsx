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

  // Obtener perfil del usuario
  const { data: usuario } = await supabase
    .from('usuarios')
    .select('*, municipios(nombre), direcciones_municipio(nombre_personalizado)')
    .eq('id', user.id)
    .single()

  if (!usuario) redirect('/login')

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar usuario={usuario} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header usuario={usuario} />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
