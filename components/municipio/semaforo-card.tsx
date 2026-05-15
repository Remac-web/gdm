import { cn } from '@/lib/utils'
import type { SemaforoModulo } from '@/types'

type EstadoCard = 'optimo' | 'en_proceso' | 'rezago' | 'sin_captura'

function dominante(m: SemaforoModulo): EstadoCard {
  if (m.sin_captura === m.total_indicadores) return 'sin_captura'
  if (m.rezago >= m.en_proceso && m.rezago >= m.optimo) return 'rezago'
  if (m.en_proceso >= m.optimo) return 'en_proceso'
  return 'optimo'
}

const CARD_STYLE: Record<EstadoCard, { border: string; bg: string; bar: string; badge: string }> = {
  optimo:      { border: 'border-green-400',  bg: 'bg-green-50',  bar: 'bg-green-500',  badge: 'bg-green-100 text-green-700' },
  en_proceso:  { border: 'border-yellow-400', bg: 'bg-yellow-50', bar: 'bg-yellow-500', badge: 'bg-yellow-100 text-yellow-700' },
  rezago:      { border: 'border-red-400',    bg: 'bg-red-50',    bar: 'bg-red-500',    badge: 'bg-red-100 text-red-700' },
  sin_captura: { border: 'border-gray-200',   bg: 'bg-gray-50',   bar: 'bg-gray-300',   badge: 'bg-gray-100 text-gray-500' },
}

export function SemaforoCard({ modulo }: { modulo: SemaforoModulo }) {
  const estado = dominante(modulo)
  const s = CARD_STYLE[estado]
  const pct = Math.round(modulo.pct_optimo)

  return (
    <div className={cn('rounded-xl border-2 p-4', s.border, s.bg)}>
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
          M{modulo.modulo_id}
        </span>
        <span className={cn('text-xs font-semibold px-2 py-0.5 rounded-full', s.badge)}>
          {pct}%
        </span>
      </div>

      <h3 className="text-sm font-semibold text-gray-800 mb-3 leading-tight min-h-[2.5rem]">
        {modulo.modulo_nombre}
      </h3>

      <div className="w-full h-1.5 bg-white/60 rounded-full mb-3 overflow-hidden">
        <div className={cn('h-full rounded-full', s.bar)} style={{ width: `${pct}%` }} />
      </div>

      <div className="flex flex-wrap gap-2 text-xs text-gray-600">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-green-500 inline-block shrink-0" />
          {modulo.optimo}
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-yellow-500 inline-block shrink-0" />
          {modulo.en_proceso}
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-red-500 inline-block shrink-0" />
          {modulo.rezago}
        </span>
        {modulo.sin_captura > 0 && (
          <span className="flex items-center gap-1 text-gray-400">
            <span className="w-2 h-2 rounded-full bg-gray-300 inline-block shrink-0" />
            {modulo.sin_captura}
          </span>
        )}
      </div>
    </div>
  )
}
