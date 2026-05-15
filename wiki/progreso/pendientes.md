# Pendientes — Governa GDM

> Backlog priorizado. Las decisiones de priorización reflejan el criterio del desarrollador principal.
> Actualizar después de cada sesión.

---

## Prioridad Alta — Producto Funcionando

Estas tareas permiten que un primer usuario real pueda usar la plataforma.

### 1. Cargar catálogo GDM en base de datos
- Ejecutar migraciones en Supabase: `01_extensions_enums.sql` → `06_storage_views.sql`
- Poblar 8 módulos, 31 temas, 115 indicadores desde `raw/gdm/cuaderno-trabajo.md`
- Crear seed de 59 municipios de San Luis Potosí
- Requisito bloqueante para todo lo demás

### 2. Pantalla de captura de indicador
- Ruta: `/dashboard/indicadores/[indicadorId]`
- Formulario dinámico: si `tipo === 'gestion'` → checkboxes por elemento; si `tipo === 'desempeno'` → inputs numéricos con fórmula
- Cálculo de semáforo en tiempo real
- Guardar en `capturas` con estado `borrador`

### 3. Gestión de evidencias
- Ruta: `/dashboard/evidencias`
- Upload de archivos a Supabase Storage
- Listado de evidencias por captura
- Soft delete (`activo: false`)

### 4. Panel del enlace municipal
- Ruta: `/dashboard/municipio/[id]`
- Semáforo visual por módulo (8 módulos)
- Lista de capturas pendientes de validar
- Acción: enviar captura a revisión IES

### 5. Panel del revisor IES
- Ruta: `/dashboard/revisiones`
- Lista de capturas en `enviado_ies`
- Vista de evidencias adjuntas
- Integración con Claude para análisis IA (primera llamada real a Anthropic)
- Acción: aprobar / observar con comentario

---

## Prioridad Media — Operación Completa

### 6. Panel coordinador OEDM
- Ruta: `/dashboard/estado`
- Vista usando `vista_panel_estado`
- Filtros por ciclo y etapa
- Exportación básica

### 7. Panel de administración
- Ruta: `/dashboard/admin`
- CRUD de usuarios (crear, editar rol, desactivar)
- CRUD de municipios
- Asignación IES → municipio

### 8. Notificaciones de estado
- Email al enlace_municipal cuando el revisor IES emite observación
- Puede ser via Supabase Edge Functions + Resend/Postmark

---

## Prioridad Baja — Pulimiento

### 9. Tests
- Tests de los flujos críticos: login, captura, envío a IES
- No bloquea MVP pero es deuda técnica

### 10. Deploy en Vercel
- Configurar proyecto en Vercel
- Variables de entorno de producción
- Dominio personalizado (governa.remac.mx o similar)

### 11. Logging de uso de IA para investigación
- Dashboard o export de métricas: tokens, costos, tasas de acuerdo IA-humano
- Material para tesis doctoral

---

## Bloqueantes Conocidos

| Bloqueante | Afecta a |
|-----------|---------|
| Migraciones SQL no ejecutadas | Todo el stack de datos |
| `ANTHROPIC_API_KEY` no configurada en producción | Revisión IA |
| Supabase Storage bucket no creado | Upload de evidencias |
