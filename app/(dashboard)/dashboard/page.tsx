import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data } = await supabase
    .from('usuarios')
    .select('rol, municipio_id')
    .eq('id', user.id)
    .single()

  const rol = (data as { rol: string; municipio_id: string | null } | null)?.rol
  const municipioId = (data as { rol: string; municipio_id: string | null } | null)?.municipio_id

  switch (rol) {
    case 'enlace_municipal':
    case 'enlace_direccion':
      // Solo redirigir si tiene municipio_id válido
      if (municipioId) redirect('/dashboard/municipio')
      break
    case 'revisor_ies':
      redirect('/dashboard/revisiones')
    case 'coordinador_oedm':
      redirect('/dashboard/estado')
    case 'admin':
      redirect('/dashboard/admin')
  }

  // Fallback — no redirigir en loop
  return (
    <div className="p-8">
      <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
      <p className="text-gray-500 mt-2">Bienvenido a Governa GDM.</p>
      <p className="text-xs text-gray-400 mt-4">Rol: {rol ?? 'desconocido'} · municipio_id: {municipioId ?? 'null'}</p>
    </div>
  )
}
