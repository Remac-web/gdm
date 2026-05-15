import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { SemaforoCard } from '@/components/municipio/semaforo-card'
import { ESTADO_CAPTURA_CONFIG, formatFecha } from '@/lib/utils'
import type { CicloGDM, EtapaGDM, EstadoCaptura, SemaforoModulo } from '@/types'

type UsuarioConMunicipio = {
  municipio_id: string | null
  nombre: string
  municipios: { nombre: string } | null
}

type CapturaResumen = {
  id: string
  indicador_id: number
  estado: EstadoCaptura
  updated_at: string
}

const CICLOS: CicloGDM[] = ['2025', '2026', '2027']

const ETAPAS: { value: EtapaGDM; label: string }[] = [
  { value: 'diagnostico',  label: 'Diagnóstico' },
  { value: 'actualizacion', label: 'Actualización' },
  { value: 'revision',     label: 'Revisión' },
]

export default async function MunicipioDashboardPage({
  searchParams,
}: {
  searchParams: { ciclo?: string; etapa?: string }
}) {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: usuarioRaw } = await supabase
    .from('usuarios')
    .select('municipio_id, nombre, municipios(nombre)')
    .eq('id', user.id)
    .single()

  const usuario = usuarioRaw as unknown as UsuarioConMunicipio | null

  if (!usuario?.municipio_id) redirect('/dashboard')

  const ciclo = (CICLOS.includes(searchParams.ciclo as CicloGDM)
    ? searchParams.ciclo
    : '2025') as CicloGDM

  const etapa = (['diagnostico', 'actualizacion', 'revision'].includes(searchParams.etapa ?? '')
    ? searchParams.etapa
    : 'diagnostico') as EtapaGDM

  const municipioId = usuario.municipio_id as string

  const [modulosResult, capturasResult] = await Promise.all([
    supabase
      .from('vista_semaforo_municipio')
      .select('*')
      .eq('municipio_id', municipioId)
      .eq('ciclo', ciclo)
      .eq('etapa', etapa)
      .order('modulo_id'),
    supabase
      .from('capturas')
      .select('id, indicador_id, estado, updated_at')
      .eq('municipio_id', municipioId)
      .eq('ciclo', ciclo)
      .eq('etapa', etapa)
      .in('estado', ['borrador', 'observado_ies'])
      .order('updated_at', { ascending: false })
      .limit(20),
  ])

  const modulos = modulosResult.data as SemaforoModulo[] | null
  const capturas = capturasResult.data as CapturaResumen[] | null
  const municipioNombre = usuario.municipios?.nombre ?? 'Mi municipio'

  const totales = (modulos ?? []).reduce(
    (acc, m) => ({
      optimo:     acc.optimo     + m.optimo,
      en_proceso: acc.en_proceso + m.en_proceso,
      rezago:     acc.rezago     + m.rezago,
      total:      acc.total      + m.total_indicadores,
    }),
    { optimo: 0, en_proceso: 0, rezago: 0, total: 0 }
  )

  return (
    <div className="max-w-5xl mx-auto space-y-8">

      {/* Encabezado */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{municipioNombre}</h1>
        <p className="text-sm text-gray-500 mt-1">Panel del Enlace Municipal · GDM 2025-2027</p>
      </div>

      {/* Selectores ciclo / etapa */}
      <div className="flex flex-wrap gap-6 items-center">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-500">Ciclo</span>
          <div className="flex gap-1">
            {CICLOS.map((c) => (
              <Link
                key={c}
                href={`/dashboard/municipio?ciclo=${c}&etapa=${etapa}`}
                className={`px-3 py-1 text-xs rounded-full font-medium transition-colors ${
                  ciclo === c
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-indigo-400'
                }`}
              >
                {c}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-500">Etapa</span>
          <div className="flex gap-1">
            {ETAPAS.map((e) => (
              <Link
                key={e.value}
                href={`/dashboard/municipio?ciclo=${ciclo}&etapa=${e.value}`}
                className={`px-3 py-1 text-xs rounded-full font-medium transition-colors ${
                  etapa === e.value
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-indigo-400'
                }`}
              >
                {e.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Resumen de totales */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-gray-800">{totales.total}</div>
          <div className="text-xs text-gray-500 mt-1">Total indicadores</div>
        </div>
        <div className="bg-green-50 rounded-xl border border-green-200 p-4 text-center">
          <div className="text-2xl font-bold text-green-700">{totales.optimo}</div>
          <div className="text-xs text-green-600 mt-1">Óptimo</div>
        </div>
        <div className="bg-yellow-50 rounded-xl border border-yellow-200 p-4 text-center">
          <div className="text-2xl font-bold text-yellow-700">{totales.en_proceso}</div>
          <div className="text-xs text-yellow-600 mt-1">En proceso</div>
        </div>
        <div className="bg-red-50 rounded-xl border border-red-200 p-4 text-center">
          <div className="text-2xl font-bold text-red-700">{totales.rezago}</div>
          <div className="text-xs text-red-600 mt-1">Rezago</div>
        </div>
      </div>

      {/* Grid de semáforo por módulo */}
      <section>
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">
          Semáforo por módulo
        </h2>
        {modulos && modulos.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {modulos.map((m) => (
              <SemaforoCard key={m.modulo_id} modulo={m} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 p-12 text-center">
            <p className="text-sm text-gray-400">No hay datos para este ciclo y etapa.</p>
            <p className="text-xs text-gray-400 mt-1">Comienza capturando indicadores.</p>
          </div>
        )}
      </section>

      {/* Capturas que necesitan acción */}
      {capturas && capturas.length > 0 && (
        <section>
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Pendientes de acción
            <span className="ml-2 bg-red-100 text-red-600 font-semibold text-xs px-1.5 py-0.5 rounded-full">
              {capturas.length}
            </span>
          </h2>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50 text-xs text-gray-500">
                  <th className="text-left px-4 py-3 font-medium">Indicador</th>
                  <th className="text-left px-4 py-3 font-medium">Estado</th>
                  <th className="text-left px-4 py-3 font-medium hidden sm:table-cell">Actualizado</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {capturas.map((c) => {
                  const cfg = ESTADO_CAPTURA_CONFIG[c.estado]
                  return (
                    <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs text-gray-600">
                        Ind. #{c.indicador_id}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.color}`}>
                          {cfg.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-400 hidden sm:table-cell">
                        {formatFecha(c.updated_at)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Link
                          href={`/dashboard/indicadores/${c.indicador_id}?captura=${c.id}`}
                          className="text-xs font-medium text-indigo-600 hover:text-indigo-800 hover:underline"
                        >
                          Ver →
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}

    </div>
  )
}
