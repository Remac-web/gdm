import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import LoginForm from './login-form'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Iniciar sesión'
}

export default async function LoginPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) redirect('/dashboard')

  return (
    <main className="min-h-screen bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo / header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur mb-4">
            <span className="text-2xl font-display font-bold text-white">G</span>
          </div>
          <h1 className="text-2xl font-display font-bold text-white">
            Governa — GDM San Luis Potosí
          </h1>
          <p className="text-brand-200 text-sm mt-1">
            Guía Consultiva de Desempeño Municipal 2025–2027
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-lg font-display font-semibold text-gray-900 mb-6">
            Iniciar sesión
          </h2>
          <LoginForm />
        </div>

        <p className="text-center text-brand-300 text-xs mt-6">
          Governa · INAFED · OEDM San Luis Potosí · 2025–2027
        </p>
      </div>
    </main>
  )
}
