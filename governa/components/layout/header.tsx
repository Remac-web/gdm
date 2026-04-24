'use client'

import { Bell, HelpCircle } from 'lucide-react'
import type { RolUsuario } from '@/types'
import { ROL_LABEL } from '@/lib/utils'

interface HeaderProps {
  usuario: {
    nombre: string
    rol: RolUsuario
    municipios?: { nombre: string } | null
  }
}

export default function Header({ usuario }: HeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
      {/* Contexto: municipio o rol */}
      <div>
        {usuario.municipios ? (
          <div>
            <p className="text-sm font-medium text-gray-900">{usuario.municipios.nombre}</p>
            <p className="text-xs text-gray-500">{ROL_LABEL[usuario.rol]}</p>
          </div>
        ) : (
          <p className="text-sm font-medium text-gray-900">{ROL_LABEL[usuario.rol]}</p>
        )}
      </div>

      {/* Acciones */}
      <div className="flex items-center gap-2">
        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <HelpCircle size={18} />
        </button>
        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors relative">
          <Bell size={18} />
        </button>
        <div className="w-px h-6 bg-gray-200 mx-1" />
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center">
            <span className="text-brand-700 font-medium text-sm">
              {usuario.nombre.charAt(0).toUpperCase()}
            </span>
          </div>
          <span className="text-sm font-medium text-gray-700 hidden sm:block">
            {usuario.nombre}
          </span>
        </div>
      </div>
    </header>
  )
}
