'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, FileText, Upload, CheckSquare,
  Settings, Users, Map, BarChart3, LogOut, Building2
} from 'lucide-react'
import { cn, ROL_LABEL } from '@/lib/utils'
import type { RolUsuario } from '@/types'

interface SidebarProps {
  usuario: {
    nombre: string
    rol: RolUsuario
    municipios?: { nombre: string } | null
  }
}

// Navegación por rol
const NAV_ITEMS: Record<RolUsuario, { href: string; label: string; icon: React.ElementType }[]> = {
  enlace_municipal: [
    { href: '/dashboard/municipio',   label: 'Dashboard',         icon: LayoutDashboard },
    { href: '/dashboard/indicadores', label: 'Indicadores',       icon: FileText },
    { href: '/dashboard/evidencias',  label: 'Evidencias',        icon: Upload },
    { href: '/dashboard/direcciones', label: 'Mis Direcciones',   icon: Building2 },
  ],
  enlace_direccion: [
    { href: '/dashboard/municipio',   label: 'Mi avance',         icon: LayoutDashboard },
    { href: '/dashboard/indicadores', label: 'Mis indicadores',   icon: FileText },
    { href: '/dashboard/evidencias',  label: 'Evidencias',        icon: Upload },
  ],
  revisor_ies: [
    { href: '/dashboard/revisiones',  label: 'Revisiones',        icon: CheckSquare },
    { href: '/dashboard/municipios',  label: 'Municipios',        icon: Map },
  ],
  coordinador_oedm: [
    { href: '/dashboard/estado',      label: 'Panel estatal',     icon: BarChart3 },
    { href: '/dashboard/municipios',  label: 'Municipios',        icon: Map },
    { href: '/dashboard/revisiones',  label: 'Revisiones IES',    icon: CheckSquare },
  ],
  admin: [
    { href: '/dashboard/admin',       label: 'Dashboard',         icon: LayoutDashboard },
    { href: '/dashboard/admin/usuarios', label: 'Usuarios',       icon: Users },
    { href: '/dashboard/municipios',  label: 'Municipios',        icon: Map },
    { href: '/dashboard/admin/ies',   label: 'Asignaciones IES',  icon: CheckSquare },
    { href: '/dashboard/admin/config', label: 'Configuración',    icon: Settings },
  ],
}

export default function Sidebar({ usuario }: SidebarProps) {
  const pathname = usePathname()
  const navItems = NAV_ITEMS[usuario.rol] ?? []

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shrink-0">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
            <span className="text-white font-display font-bold text-sm">G</span>
          </div>
          <div>
            <p className="font-display font-semibold text-gray-900 text-sm leading-tight">Governa</p>
            <p className="text-gray-400 text-xs leading-tight">2025–2027</p>
          </div>
        </div>
      </div>

      {/* Navegación */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map(item => {
          const Icon = item.icon
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn('nav-item', isActive && 'active')}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Footer: usuario */}
      <div className="p-3 border-t border-gray-200">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center shrink-0">
            <span className="text-brand-700 font-medium text-sm">
              {usuario.nombre.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{usuario.nombre}</p>
            <p className="text-xs text-gray-500 truncate">{ROL_LABEL[usuario.rol]}</p>
          </div>
        </div>
        <Link
          href="/auth/logout"
          className="nav-item mt-1 text-red-600 hover:bg-red-50 hover:text-red-700 w-full"
        >
          <LogOut size={16} />
          Cerrar sesión
        </Link>
      </div>
    </aside>
  )
}
