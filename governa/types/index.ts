// ============================================================
// Tipos del dominio GDM — derivados del esquema Supabase
// ============================================================

// Enums (deben coincidir con los definidos en PostgreSQL)
export type TipoIndicador = 'gestion' | 'desempeno'
export type EstadoSemaforo = 'rezago' | 'en_proceso' | 'optimo' | 'no_medible' | 'info_no_disponible'
export type EtapaGDM = 'diagnostico' | 'actualizacion' | 'revision'
export type CicloGDM = '2025' | '2026' | '2027'
export type EstadoCaptura =
  | 'borrador'
  | 'enviado_enlace'
  | 'validado_enlace'
  | 'enviado_ies'
  | 'aprobado_ies'
  | 'observado_ies'
export type RolUsuario =
  | 'enlace_municipal'
  | 'enlace_direccion'
  | 'revisor_ies'
  | 'coordinador_oedm'
  | 'admin'

// Catálogo GDM
export interface Modulo {
  id: number
  nombre: string
  objetivo: string | null
  total_gestion: number
  total_desempeno: number
}

export interface Tema {
  id: number
  modulo_id: number
  numero: string
  nombre: string
  objetivo: string | null
}

export interface Indicador {
  id: number
  tema_id: number
  clave: string
  nombre: string
  tipo: TipoIndicador
  elementos: ElementoGestion[] | null
  criterios_semaforo: CriterioSemaforo
  metodo_calculo: MetodoCalculo | null
  una_vez_en_optimo: boolean
  revision_anual: boolean
  no_medible_gdm26: boolean
  sin_datos_es_rezago: boolean
  orden: number
}

export interface ElementoGestion {
  inciso: string        // "a", "b", "c"...
  descripcion: string
  requerido?: boolean
}

export interface CriterioSemaforo {
  optimo: number | { op: string; val: number }
  en_proceso?: { min?: number; max?: number; op?: string; val?: number }
  rezago: number | { op: string; val: number }
}

export interface MetodoCalculo {
  formula: string
  variables: VariableCalculo[]
  nota?: string
}

export interface VariableCalculo {
  clave: string         // "A", "B", "X1"...
  descripcion: string
  fuente?: string
}

// Municipios y usuarios
export interface Municipio {
  id: string
  nombre: string
  clave_inegi: string
  rango_poblacion: string | null
  activo: boolean
}

export interface Usuario {
  id: string
  nombre: string
  apellidos: string | null
  email: string
  rol: RolUsuario
  municipio_id: string | null
  direccion_id: string | null
  telefono: string | null
  activo: boolean
}

export interface DireccionMunicipio {
  id: string
  municipio_id: string
  unidad_adm_catalogo_id: number | null
  nombre_personalizado: string
  responsable_nombre: string | null
  responsable_cargo: string | null
  activo: boolean
}

// Capturas
export interface Captura {
  id: string
  municipio_id: string
  indicador_id: number
  direccion_id: string | null
  ciclo: CicloGDM
  etapa: EtapaGDM
  elementos_marcados: Record<string, boolean> | null
  variables_calculo: Record<string, number | string> | null
  resultado_numerico: number | null
  semaforo: EstadoSemaforo | null
  no_medible: boolean
  estado: EstadoCaptura
  capturado_por: string
  validado_por: string | null
  fecha_captura: string | null
  fecha_validacion: string | null
  fecha_envio_ies: string | null
  notas_captura: string | null
  notas_validacion: string | null
  created_at: string
  updated_at: string
}

// Evidencias
export interface Evidencia {
  id: string
  captura_id: string
  municipio_id: string
  indicador_id: number
  nombre_archivo: string
  url_storage: string
  tipo_archivo: string | null
  extension: string | null
  tamanio_bytes: number | null
  descripcion: string | null
  uploaded_by: string
  uploaded_at: string
  activo: boolean
}

// Revisiones
export interface Revision {
  id: string
  captura_id: string
  tipo: 'ia' | 'humano'
  revisor_id: string | null
  estado: 'pendiente' | 'en_revision' | 'aprobado' | 'rechazado' | 'observado'
  analisis_ia: AnalisisIA | null
  acepta_sugerencia_ia: boolean | null
  comentario_revisor: string | null
  elementos_verificados: Record<string, boolean> | null
  resultado_revision: EstadoSemaforo | null
  created_at: string
}

export interface AnalisisIA {
  cumple: boolean
  elementos_verificados: Record<string, boolean>
  observaciones: string[]
  sugerencias: string[]
  nivel_confianza: 'alto' | 'medio' | 'bajo'
}

// Vistas
export interface SemaforoModulo {
  municipio_id: string
  municipio_nombre: string
  modulo_id: number
  modulo_nombre: string
  ciclo: CicloGDM
  etapa: EtapaGDM
  total_indicadores: number
  optimo: number
  en_proceso: number
  rezago: number
  no_medible: number
  sin_info: number
  sin_captura: number
  pct_optimo: number
}

export interface PanelEstado {
  municipio_id: string
  nombre: string
  clave_inegi: string
  rango_poblacion: string | null
  ciclo: CicloGDM
  total_capturas: number
  optimo: number
  en_proceso: number
  rezago: number
  pct_avance: number
  revisor_ies_nombre: string | null
}
