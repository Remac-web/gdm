import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data } = await supabase
    .from('usuarios')
    .select('rol')
    .eq('id', user!.id)
    .single()

  const rol = (data as { rol: string } | null)?.rol

  switch (rol) {
    case 'enlace_municipal':
    case 'enlace_direccion':
      redirect('/dashboard/municipio')
    case 'revisor_ies':
      redirect('/dashboard/revisiones')
    case 'coordinador_oedm':
      redirect('/dashboard/estado')
    case 'admin':
      redirect('/dashboard/admin')
    default:
      redirect('/dashboard/municipio')
  }
}