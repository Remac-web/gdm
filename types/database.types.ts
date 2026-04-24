export type Database = {
  public: {
    Tables: {
      usuarios: {
        Row: {
          id: string
          nombre: string
          apellidos: string | null
          email: string
          rol: 'enlace_municipal' | 'enlace_direccion' | 'revisor_ies' | 'coordinador_oedm' | 'admin'
          municipio_id: string | null
          direccion_id: string | null
          telefono: string | null
          activo: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['usuarios']['Row'], 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['usuarios']['Row']>
      }
      municipios: {
        Row: {
          id: string
          nombre: string
          clave_inegi: string
          rango_poblacion: string | null
          activo: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['municipios']['Row'], 'created_at'>
        Update: Partial<Database['public']['Tables']['municipios']['Row']>
      }
      direcciones_municipio: {
        Row: {
          id: string
          municipio_id: string
          unidad_adm_catalogo_id: number | null
          nombre_personalizado: string
          responsable_nombre: string | null
          responsable_cargo: string | null
          activo: boolean
          created_at: string
          created_by: string | null
        }
        Insert: Omit<Database['public']['Tables']['direcciones_municipio']['Row'], 'created_at'>
        Update: Partial<Database['public']['Tables']['direcciones_municipio']['Row']>
      }
      capturas: {
        Row: {
          id: string
          municipio_id: string
          indicador_id: number
          direccion_id: string | null
          ciclo: '2025' | '2026' | '2027'
          etapa: 'diagnostico' | 'actualizacion' | 'revision'
          elementos_marcados: Record<string, boolean> | null
          variables_calculo: Record<string, number | string> | null
          resultado_numerico: number | null
          semaforo: 'rezago' | 'en_proceso' | 'optimo' | 'no_medible' | 'info_no_disponible' | null
          no_medible: boolean
          estado: 'borrador' | 'enviado_enlace' | 'validado_enlace' | 'enviado_ies' | 'aprobado_ies' | 'observado_ies'
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
        Insert: Omit<Database['public']['Tables']['capturas']['Row'], 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['capturas']['Row']>
      }
      evidencias: {
        Row: {
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
        Insert: Omit<Database['public']['Tables']['evidencias']['Row'], 'uploaded_at'>
        Update: Partial<Database['public']['Tables']['evidencias']['Row']>
      }
      revisiones: {
        Row: {
          id: string
          captura_id: string
          tipo: 'ia' | 'humano'
          revisor_id: string | null
          estado: 'pendiente' | 'en_revision' | 'aprobado' | 'rechazado' | 'observado'
          prompt_enviado: string | null
          respuesta_ia: string | null
          analisis_ia: Record<string, unknown> | null
          modelo_ia: string | null
          tokens_usados: number | null
          costo_usd: number | null
          fecha_ia: string | null
          acepta_sugerencia_ia: boolean | null
          comentario_revisor: string | null
          elementos_verificados: Record<string, boolean> | null
          resultado_revision: 'rezago' | 'en_proceso' | 'optimo' | 'no_medible' | 'info_no_disponible' | null
          fecha_revision_humana: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['revisiones']['Row'], 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['revisiones']['Row']>
      }
    }
    Views: {
      vista_semaforo_municipio: {
        Row: {
          municipio_id: string
          municipio_nombre: string
          modulo_id: number
          modulo_nombre: string
          ciclo: '2025' | '2026' | '2027'
          etapa: 'diagnostico' | 'actualizacion' | 'revision'
          total_indicadores: number
          optimo: number
          en_proceso: number
          rezago: number
          no_medible: number
          sin_info: number
          sin_captura: number
          pct_optimo: number
        }
      }
      vista_panel_estado: {
        Row: {
          municipio_id: string
          nombre: string
          clave_inegi: string
          rango_poblacion: string | null
          ciclo: '2025' | '2026' | '2027'
          total_capturas: number
          optimo: number
          en_proceso: number
          rezago: number
          pct_avance: number
          revisor_ies_nombre: string | null
        }
      }
    }
    Functions: Record<string, never>
    Enums: {
      rol_usuario: 'enlace_municipal' | 'enlace_direccion' | 'revisor_ies' | 'coordinador_oedm' | 'admin'
      estado_semaforo: 'rezago' | 'en_proceso' | 'optimo' | 'no_medible' | 'info_no_disponible'
      etapa_gdm: 'diagnostico' | 'actualizacion' | 'revision'
      ciclo_gdm: '2025' | '2026' | '2027'
      estado_captura: 'borrador' | 'enviado_enlace' | 'validado_enlace' | 'enviado_ies' | 'aprobado_ies' | 'observado_ies'
      tipo_indicador: 'gestion' | 'desempeno'
      tipo_revision: 'ia' | 'humano'
    }
  }
}
