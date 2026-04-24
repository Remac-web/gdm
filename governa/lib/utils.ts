import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { EstadoSemaforo, EstadoCaptura, RolUsuario } from '@/types'

// Tailwind class merger
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Semáforo: color y etiqueta
export const SEMAFORO_CONFIG: Record<EstadoSemaforo, {
  label: string
  color: string
  bg: string
  border: string
  dot: string
}> = {
  optimo: {
    label: 'Óptimo',
    color: 'text-green-700',
    bg: 'bg-green-50',
    border: 'border-green-200',
    dot: 'bg-green-500'
  },
  en_proceso: {
    label: 'En proceso',
    color: 'text-yellow-700',
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    dot: 'bg-yellow-500'
  },
  rezago: {
    label: 'Rezago',
    color: 'text-red-700',
    bg: 'bg-red-50',
    border: 'border-red-200',
    dot: 'bg-red-500'
  },
  no_medible: {
    label: 'No medible',
    color: 'text-gray-600',
    bg: 'bg-gray-50',
    border: 'border-gray-200',
    dot: 'bg-gray-400'
  },
  info_no_disponible: {
    label: 'Info no disponible',
    color: 'text-gray-500',
    bg: 'bg-gray-50',
    border: 'border-gray-100',
    dot: 'bg-gray-300'
  }
}

// Estado de captura: etiqueta y color
export const ESTADO_CAPTURA_CONFIG: Record<EstadoCaptura, {
  label: string
  color: string
  bg: string
}> = {
  borrador:         { label: 'Borrador',          color: 'text-gray-600',   bg: 'bg-gray-100'   },
  enviado_enlace:   { label: 'En revisión interna',color: 'text-blue-700',  bg: 'bg-blue-50'    },
  validado_enlace:  { label: 'Validado',           color: 'text-indigo-700',bg: 'bg-indigo-50'  },
  enviado_ies:      { label: 'En revisión IES',    color: 'text-purple-700',bg: 'bg-purple-50'  },
  aprobado_ies:     { label: 'Aprobado',           color: 'text-green-700', bg: 'bg-green-50'   },
  observado_ies:    { label: 'Con observaciones',  color: 'text-orange-700',bg: 'bg-orange-50'  }
}

// Roles: etiqueta legible
export const ROL_LABEL: Record<RolUsuario, string> = {
  enlace_municipal:  'Enlace Municipal',
  enlace_direccion:  'Enlace de Dirección',
  revisor_ies:       'Revisor IES',
  coordinador_oedm:  'Coordinador OEDM',
  admin:             'Administrador'
}

// Calcular semáforo de gestión
export function calcularSemaforoGestion(
  resultado: number,
  criterios: { optimo: number; rezago: number }
): EstadoSemaforo {
  if (resultado === criterios.rezago) return 'rezago'
  if (resultado >= criterios.optimo) return 'optimo'
  return 'en_proceso'
}

// Formatear tamaño de archivo
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

// Formatear fecha en español
export function formatFecha(fecha: string | null): string {
  if (!fecha) return '—'
  return new Intl.DateTimeFormat('es-MX', {
    day: '2-digit', month: 'short', year: 'numeric'
  }).format(new Date(fecha))
}

// Porcentaje de avance
export function calcularPctAvance(optimo: number, total: number): number {
  if (total === 0) return 0
  return Math.round((optimo / total) * 100)
}
