import { Component, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule }                     from '@angular/common';
import { MatGridListModule }                from '@angular/material/grid-list';
import { MatCardModule }                    from '@angular/material/card';
import { MatButtonModule }                  from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef }       from '@angular/material/dialog';
import { MatExpansionModule }               from '@angular/material/expansion';
import { MatListModule }                    from '@angular/material/list';
import { MatIconModule }                    from '@angular/material/icon';
import { Router } from '@angular/router';

interface MenuItem {
  label: string;
  link:  string;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

interface Card {
  title:        string;
  icon:         string;
  description?: string;
  menuSections: MenuSection[];
}

@Component({
  selector: 'app-sir-laminaire',
  standalone: true,
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatExpansionModule,
    MatListModule,
    MatIconModule,
  ],
  templateUrl: './sir-laminaire.component.html',
  styleUrls: ['./sir-laminaire.component.scss']
})
export class SirLaminaireComponent {
  @ViewChild('cardDialog') cardDialogTpl!: TemplateRef<any>;
   



  cards: Card[] = [
  {
  title: 'CEO',
  icon: 'account_balance',
  menuSections: [
    {
      title: '',
      items: [
        { label: 'Análisis Financiero Empresas Colombia', link: 'https://web.laminaire.net/SirWeb/D_Estrategico/Frms/Informes_Analisis_Competencia.aspx' },
        { label: 'Plan Estratégico',                  link: 'https://web.laminaire.net/SirWeb/D_Estrategico/Frms/Plan_Estrategico.aspx' },
        { label: 'Proyectos',                          link: 'https://web.laminaire.net/SirWeb/D_Estrategico/Frms/Proyectos.aspx' },
        { label: 'Administración de Actas',            link: 'https://web.laminaire.net/SirWeb/Actas/Frm_Actas_V2.aspx' },
        { label: 'Plan Mensual de Ejecución',          link: 'https://web.laminaire.net/SirWeb/D_Estrategico/Frms/Plan_Mensual_Ejecucion.aspx' },
        { label: 'Ideas Innovadoras',                  link: 'https://web.laminaire.net/SirWeb/D_Estrategico/Frms/Ideas_Innovadoras.aspx' },
        { label: 'Administrador Ideas Innovadoras',    link: 'https://web.laminaire.net/SirWeb/D_Estrategico/Frms/Administrador_Ideas_Innovadoras.aspx' },
        { label: 'Matriz de Riesgos Legales',          link: 'https://web.laminaire.net/SirWeb/D_Estrategico/Frms/Matriz_Requisitos_Legales_Nuevo.aspx' },
        { label: 'Gestión Documental',                 link: 'https://web.laminaire.net/SirWeb/D_Estrategico/Frms/Gestion_Documental.aspx' },
        { label: 'Gobierno Corporativo',               link: 'https://web.laminaire.net/SirWeb/D_Estrategico/Frms/Gobierno_Corporativo.aspx' },
        { label: 'Documentación CEO',                  link: 'https://web.laminaire.net/SirWeb/D_Estrategico/Frms/documentacion_directores.aspx?parametro=11' },
        { label: 'Plan de Autodesarrollo',             link: 'https://web.laminaire.net/SirWeb/D_Estrategico/Frms/Plan_Autodesarrollo_Competencias_Gerenciales.aspx' },
      ]
    }
  ]
}
,
{
  title: 'Gerencia',
  icon: 'leaderboard',
  menuSections: [
    {
      title: '',
      items: [
      { label: 'Análisis Financiero Empresas Colombia', link: 'https://web.laminaire.net/SirWeb/D_Estrategico/Frms/Informes_Analisis_Competencia.aspx' },
        { label: 'Plan Estratégico',                  link: 'https://web.laminaire.net/SirWeb/D_Estrategico/Frms/Plan_Estrategico.aspx' },
        { label: 'Proyectos',                          link: 'https://web.laminaire.net/SirWeb/D_Estrategico/Frms/Proyectos.aspx' },
        { label: 'Administración de Actas',            link: 'https://web.laminaire.net/SirWeb/Actas/Frm_Actas_V2.aspx' },
        { label: 'Plan Mensual de Ejecución',          link: 'https://web.laminaire.net/SirWeb/D_Estrategico/Frms/Plan_Mensual_Ejecucion.aspx' },
        { label: 'Ideas Innovadoras',                  link: 'https://web.laminaire.net/SirWeb/D_Estrategico/Frms/Ideas_Innovadoras.aspx' },
        { label: 'Administrador Ideas Innovadoras',    link: 'https://web.laminaire.net/SirWeb/D_Estrategico/Frms/Administrador_Ideas_Innovadoras.aspx' },
        { label: 'Matriz de Riesgos Legales',          link: 'https://web.laminaire.net/SirWeb/D_Estrategico/Frms/Matriz_Requisitos_Legales_Nuevo.aspx' },
        { label: 'Gestión Documental',                 link: 'https://web.laminaire.net/SirWeb/D_Estrategico/Frms/Gestion_Documental.aspx' },
        { label: 'Gobierno Corporativo',               link: 'https://web.laminaire.net/SirWeb/D_Estrategico/Frms/Gobierno_Corporativo.aspx' },
        { label: 'Documentación CEO',                  link: 'https://web.laminaire.net/SirWeb/D_Estrategico/Frms/documentacion_directores.aspx?parametro=11' },
        { label: 'Plan de Autodesarrollo',             link: 'https://web.laminaire.net/SirWeb/D_Estrategico/Frms/Plan_Autodesarrollo_Competencias_Gerenciales.aspx' },
      ]
    }
  ]
}
,
    {
      title: 'Financiera',
      icon:  'currency_exchange',
      menuSections: [
        {
          title: '',
          items: [
            { label: 'Informe Resumen Bodegas CMV',    link: 'https://web.laminaire.net/SirWeb/Financiera/Frm/Costo_Mercancia_Vendida.aspx' },
            { label: 'Verificación de TRM',            link: 'https://web.laminaire.net/SirWeb/Financiera/Frm/Verificacion_TRM.aspx' },
            { label: 'Comisiones',                     link: 'https://web.laminaire.net/SirWeb/Financiera/Frm/Comisiones.aspx' },
            { label: 'Cuentas y C. Costos Proveedores',link: 'https://web.laminaire.net/SirWeb/Financiera/Frm/Ctas_CC_Proveedores.aspx' },
            { label: 'Control de Gastos',              link: 'https://web.laminaire.net/SirWeb/Financiera/Frm/Gastos.aspx' },
            { label: 'Ingresos Operacionales',         link: 'https://web.laminaire.net/SirWeb/Ofimatica/Frms/Maestro_General_Ventas.aspx' },
            { label: 'Flujo de Caja',                  link: 'https://web.laminaire.net/SirWeb/Financiera/Frm/Flujo_Caja.aspx' },
            { label: 'Consulta Documentos por Usuarios',link: 'https://web.laminaire.net/SirWeb/Logistica/Frm/Consultar_Documentos_Usuarios.aspx?proceso=FINANCIERA' },
            { label: 'Documentación Financiera',       link: 'https://web.laminaire.net/SirWeb/Financiera/Frm/Documentacion_Financiera.aspx' },
            { label: 'Solicitud de Notas Crédito',     link: 'https://web.laminaire.net/SirWeb/Financiera/Frm/Solicitud_Notas_Credito.aspx' },
             { label: 'Integración de Nómina', link: 'https://web.laminaire.net/SirWeb/Financiera/Frm/Integracion_Nomina.aspx' },
            { label: 'Compras T.C',           link: 'https://web.laminaire.net/SirWeb/Financiera/Frm/Integracion_Fac_Compras.aspx' },
            { label: 'Cierre CMV',       link: 'https://web.laminaire.net/SirWeb/Financiera/Frm/CIERRE_CMV.aspx' },
            { label: 'Ventas Laminaire', link: 'https://web.laminaire.net/SirWeb/Financiera/Frm/VENTAS_LAMINAIRE.aspx' },
             { label: 'Estado de Resultados', link: 'https://web.laminaire.net/SirWeb/Financiera/Frm/Informe_Simetrica.aspx' },
            { label: 'Balance General',       link: 'https://web.laminaire.net/SirWeb/Financiera/Frm/Info_Estado_Financiero.aspx' },
            { label: 'Parámetros',            link: 'https://web.laminaire.net/SirWeb/Financiera/Frm/Parametros_Simetrica.aspx' },
          ]
        }   
      ]
    },
{
  title: 'TI | BI',
  icon: 'devices',
  menuSections: [
    {
      title: '',
      items: [
        { label: 'Tablero Power BI',                        link: 'https://app.powerbi.com/view?r=eyJrIjoiOGNkMjQwMzEtYzc2Mi00NDA4LWEwZWQtMmZiYjM3YjVlOTlhIiwidCI6IjVmYzZkYWUyLTg1NmMtNDUyNC05MGVjLWQ4N2IxNjE5ZjE1OSJ9' },
        { label: 'Solicitudes a Sistemas',                   link: 'https://web.laminaire.net/SirWeb/Solicitudes_Sistemas/Frms/Solicitudes_Sistemas.aspx' },
        { label: 'Informe Encuestas',                        link: 'https://web.laminaire.net/SirWeb/Solicitudes_Sistemas/Frms/Informe_Encuestas_TI.aspx' },
        { label: 'Ficha Técnica Activos Informáticos',       link: 'https://web.laminaire.net/SirWeb/Solicitudes_Sistemas/Frms/Ficha_Tecnica_Activos.aspx' },
        { label: 'Documentación TI | BI',                    link: 'https://web.laminaire.net/SirWeb/Solicitudes_Sistemas/Frms/Repositorio_IN.aspx' },
        { label: 'Matriz Perfilación de Usuarios',           link: 'https://web.laminaire.net/SirWeb/Solicitudes_Sistemas/Frms/Matriz_Perfilacion.aspx' },
        { label: 'Permisos Carpetas Comunes',                link: 'https://web.laminaire.net/SirWeb/Solicitudes_Sistemas/Frms/Permisos_Comunes.aspx' },
        { label: 'Informe Activos Informáticos',             link: 'https://web.laminaire.net/SirWeb/Solicitudes_Sistemas/Frms/Informe_Activos_Inf.aspx' },
        { label: 'Informe Solicitudes por Usuarios',         link: 'https://web.laminaire.net/SirWeb/Solicitudes_Sistemas/Frms/Informe_Solicitudes_por_Empleados.aspx' },
        { label: 'Maestro de Usuarios',                      link: 'https://web.laminaire.net/SirWeb/Maestros/Frms/Usuarios.aspx' },
        { label: 'Administrador de Encuestas',               link: 'https://web.laminaire.net/SirWeb/Solicitudes_Sistemas/Frms/Admin_Encuestas.aspx' },
        { label: 'Solicitud Recursos Informáticos',          link: 'https://web.laminaire.net/SirWeb/Solicitudes_Sistemas/Frms/Solicitud_Recursos_Inf.aspx' },
        { label: 'Políticas SIR',                            link: 'https://web.laminaire.net/SirWeb/Solicitudes_Sistemas/Frms/Maestro_Politicas.aspx' },
      ]
    }
  ]
}
,
{
  title: 'Logística',
  icon: 'local_shipping',
  menuSections: [
    {
      title: ' ',
      items: [
      { label: 'Evaluación de Proveedores',           link: 'https://web.laminaire.net/SirWeb/Solicitudes_ControlDoc/Frms/Evaluacion_Proveedores.aspx' },
        { label: 'SRM Gestión de Proveedores',          link: 'https://web.laminaire.net/SirWeb/Logistica/Frm/Gestion_Proveedores.aspx' },
        { label: 'O.C Proveedores Pedidos EQUIPART',     link: 'https://web.laminaire.net/SirWeb/Logistica/Frm/OC_Proveedores_Disfrio.aspx' },
        { label: 'Estado Órdenes de Compra',            link: 'https://web.laminaire.net/SirWeb/Logistica/Frm/Informe_Estado_OC.aspx' },
        { label: 'Partidas Arancelarias x Contenedor',  link: 'https://web.laminaire.net/SirWeb/Logistica/Frm/Partidas_Arancelarias_Contenedores.aspx' },
        { label: 'Control Importaciones y Anticipos',    link: 'https://web.laminaire.net/SirWeb/Logistica/Frm/Control_Impo_Anticipos.aspx' },
        { label: 'Bloqueo de MP x Faltante',             link: 'https://web.laminaire.net/SirWeb/Logistica/Frm/Bloqueo_MP.aspx' },
        { label: 'Seguimiento Cot. Arquitectónicos',     link: 'https://web.laminaire.net/SirWeb/Logistica/Frm/Gestion_MP_Arquitectonicos.aspx' },
        { label: 'Modificación Salidas (S3)',           link: 'https://web.laminaire.net/SirWeb/Logistica/Frm/Frm_Modificacion_Salidas_S3.aspx' },
        { label: 'Conteos Físicos',                     link: 'https://web.laminaire.net/SirWeb/Logistica/Frm/Conteo_fisico.aspx' },
        { label: 'Estadísticas de Inventario MP',       link: 'https://web.laminaire.net/SirWeb/Logistica/Frm/Control_Estadist_Invent.aspx' },
        { label: 'Estadísticas Inventario EQUIPART',    link: 'https://web.laminaire.net/SirWeb/Logistica/Frm/Control_Estad_Inv_Disfrio.aspx' },
        { label: 'Lista Precios Stock EQUIPART',        link: 'https://web.laminaire.net/SirWeb/Logistica/Frm/Lista_Precios_Stock.aspx' },
        { label: 'Lista Stock Laminaire',               link: 'https://web.laminaire.net/SirWeb/Logistica/Frm/Lista_Stock_Laminaire.aspx' },
        { label: 'Lista Stock Grandes Superficies',     link: 'https://web.laminaire.net/SirWeb/Logistica/Frm/Stock_Grandes_Superficies.aspx' },
        { label: 'Traslado de Pedidos',                 link: 'https://web.laminaire.net/SirWeb/Logistica/Frm/Traslado_Pedidos.aspx' },
        { label: 'Control de Cajas',                    link: 'https://web.laminaire.net/SirWeb/Logistica/Frm/Control_Cajas.aspx' },
        { label: 'Descripciones Mínimas',               link: 'https://web.laminaire.net/SirWeb/Logistica/Frm/Descripciones_Minimas.aspx' },
        { label: 'WMS Gestión de Almacenamiento',       link: 'https://web.laminaire.net/SirWeb/Logistica/Frm/WMS.aspx' },
        { label: 'WMS Bodegas de Aluminio',             link: 'https://web.laminaire.net/SirWeb/Logistica/Frm/WMS_Perfileria.aspx' },
        { label: 'WMS Girardota',                       link: 'https://web.laminaire.net/SirWeb/Logistica/Frm/WMS_GIRARDOTA.aspx' },
        { label: 'Administrar Bodegas',                 link: 'https://web.laminaire.net/SirWeb/Logistica/Frm/Administrar_Bodegas.aspx' },
        { label: 'Cargar Masivo Guías Pedidos',         link: 'https://web.laminaire.net/SirWeb/Logistica/Frm/Masivo_Guias_Pedidos.aspx' },
        { label: 'Control Pintura',                     link: 'https://web.laminaire.net/SirWeb/Logistica/Frm/Control_Pintura.aspx' },
        { label: 'Consulta de Documentos',              link: 'https://web.laminaire.net/SirWeb/Logistica/Frm/Consulta_Documentos.aspx' },
        { label: 'Informes',                            link: 'https://web.laminaire.net/SirWeb/Logistica/Frm/vigencia_costos.aspx' },
        { label: 'Documentos Logística',                link: 'https://web.laminaire.net/SirWeb/Logistica/Frm/Repositorio_Logistica.aspx' }
      ]
    }
  
  ]
}
,
   {
  title: 'Mantenimiento',
  icon: 'construction Mantenimiento',
  menuSections: [
    {
      title: '',
      items: [
         { label: 'Solicitudes de Mantenimiento',                 link: 'https://web.laminaire.net/SirWeb/Solicitudes_Mmto/Frms/Solicitudes_Mmto.aspx' },
        { label: 'Contenedor Solicitudes de MTTO',               link: 'https://web.laminaire.net/SirWeb/Solicitudes_Mmto/Frms/Contenedor_Mtto.aspx' },
        { label: 'Seguimiento Solicitudes de MTTO',              link: 'https://web.laminaire.net/SirWeb/Solicitudes_Mmto/Frms/Solicitudes_X_Usuario.aspx' },
        { label: 'Ficha Técnica Activos MTTO',                   link: 'https://web.laminaire.net/SirWeb/Solicitudes_Mmto/Frms/Ficha_Tecnica_Mtto.aspx' },
        { label: 'Bitácora Operación Mantenimiento - Medellín',   link: 'https://web.laminaire.net/SirWeb/Solicitudes_Mmto/Frms/Bitacora_Operacion_Mtto.aspx' },
        { label: 'Bitácora Operación Mantenimiento - Girardota',  link: 'https://web.laminaire.net/SirWeb/Solicitudes_Mmto/Frms/Bitacora_Mtto_Girardota.aspx' },
        { label: 'Plan Mantenimiento Preventivo',                 link: 'https://web.laminaire.net/SirWeb/Solicitudes_Mmto/Frms/Plan_Mtto.aspx' },
        { label: 'Informes Contenedor Mantenimiento',             link: 'https://web.laminaire.net/SirWeb/Solicitudes_Mmto/Frms/Informes_Contenedor.aspx' },
        { label: 'Informe de Encuestas',                          link: 'https://web.laminaire.net/SirWeb/Solicitudes_Mmto/Frms/Informes_Encuestas.aspx' },
        { label: 'Pronóstico Mantenimiento Preventivo',           link: 'https://web.laminaire.net/SirWeb/Solicitudes_Mmto/Frms/Pronostico_mtto_prev.aspx' },
        { label: 'Adelantar Mantenimiento Preventivo',            link: 'https://web.laminaire.net/SirWeb/Solicitudes_Mmto/Frms/Adelantar_Mtto_Prevent.aspx' }
      ]
    }   
  ]
}
,
  {
  title: 'Tal. Humano',
  icon: 'group',
  menuSections: [
    {
      title: '',
      items: [
          { label: 'Comprob. de Pago Anteriores a 2024',                      link: 'https://web.laminaire.net/SirWeb/Comprobantes_Pago/Frms/Frm_Comprobante.aspx' },
          { label: 'Certificado Laboral',                                    link: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/Frm_Certificado_Laboral.aspx' },
          { label: 'Ficha del Empleado',                                     link: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/Frm_Ficha_Talento_V2.aspx' },
          { label: 'Informe Ficha del Empleado',                              link: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/Frm_Informe_Ficha_Talento.aspx' },
          { label: 'Perfil del Cargo',                                       link: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/Frm_Perfil_Cargo_V2.aspx' },
          { label: 'Competencias',                                           link: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/Frm_Competencias.aspx' },
          { label: 'Proced., Instruct., Políticas, Form.',                   link: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/Frm_Maestros_Pc.aspx' },
          { label: 'Resp Seg, Resp SG-SST, Res Amb',                         link: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/Frm_Maestros_Pc_2.aspx' },
          { label: 'Valores Corporativos',                                   link: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/Frm_Maestros_Valores_Corp.aspx' },
          { label: 'Informes Control de Acceso',                             link: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/ReporteControlAcceso.aspx' },
          { label: 'Solicitud de vacaciones',                                link: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/Control_Vacaciones_Empleados.aspx' },
          { label: 'Calendario de Reuniones',                                link: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/Calendario_Reuniones.aspx' },
          { label: 'Control Plan de Bienestar',                              link: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/Frm_Pasaportes.aspx' },
          { label: 'Informes Plan de Bienestar',                             link: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/Informes_Pasaporte.aspx' },
          { label: 'Gestión del Conocimiento',                               link: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/Frm_Control_Capacitaciones.aspx' },
          { label: 'Informes Gestión Conocimiento',                          link: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/Frm_Informes_Control_Capacitaciones.aspx' },
          { label: 'Informes Detallado G. C',                                link: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/Frm_Informes_Capacit_Detallado.aspx' },
          { label: 'Evaluaciones de 360°',                                   link: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/Frm_Evaluaciones_360.aspx' },
          { label: 'Informes Evaluaciones de 360°',                         link: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/Informes_Evaluacion_360.aspx' },
          { label: 'Maestro Evaluaciones de 360°',                           link: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/Maestros_Evaluaciones_360.aspx' },
          { label: 'Revisión de Aspectos',                                   link: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/Revision_Aspectos.aspx' },
          { label: 'Análisis de Causas',                                     link: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/Analisis_Causas_Evaluac_360.aspx' },
          { label: 'Control de Empleados',                                   link: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/Control_Empleados_Activos_V2.aspx' },
          { label: 'Empleados Ctrl_Acceso Vs Ofima',                         link: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/Frm_Control_Empleados.aspx' },
          { label: 'Informe Control de Empleados',                           link: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/Frm_Informes_Control_Empleados.aspx' },
          { label: 'Plan General de Capacitaciones',                         link: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/FrmPlanGeneralCapacitcionesaspx.aspx' },
          { label: 'Maestro Plan Gral Capacitaciones',                       link: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/Frm_MestroPlanGeneral_Capacita.aspx' },
          { label: 'Plan de Entrenamiento',                                 link: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/Plan_Entrenamiento.aspx' },
          { label: 'Rifa Canasta Laminaire',                                link: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/Rifa.aspx' },
          { label: 'Rifa General',                                           link: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/RifaGeneral.aspx' },
          { label: 'Registro Disponibilidad Empleados',                     link: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/Frm_Registro_Disponibilidad_Empleados.aspx' },
          { label: 'Consulta Disponibilidad Empleados',                     link: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/Frm_Consulta_Disponibilidad_Empleados.aspx' },
          { label: 'Control de Dotación',                                   link: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/Frm_Control_Dotacion.aspx' },
          { label: 'Dctos Firmados Electrónicamente',                       link: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/Dctos_Firmados_Electr.aspx' },
          { label: 'Encuesta Retiro Empleados',                             link: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/Formulario_Retiro_Empleados.aspx' }
      ]
    }
    
  ]
}
,
    {
  title: 'S.G.I',
  icon: 'dashboard',
  menuSections: [
    {
      title: '',
      items: [
        { label: 'Informe E.G.A',                                     link: 'https://web.laminaire.net/SirWeb/S.G.I/FRM/Informe_EGA.aspx' },
          { label: 'Mejoramiento Continuo',                            link: 'https://web.laminaire.net/SirWeb/S.G.I/FRM/GestionMejoramiento_continuo.aspx' },
          { label: 'Informe Mejoramiento Continuo',                     link: 'https://web.laminaire.net/SirWeb/S.G.I/FRM/Info_Gestion_Mejoramiento_Continuo.aspx' },
          { label: 'Documentación S.G.I',                              link: 'https://web.laminaire.net/SirWeb/S.G.I/FRM/Documentacion_SGI.aspx' },
          { label: 'Informe Documentación S.G.I',                       link: 'https://web.laminaire.net/SirWeb/S.G.I/FRM/Informes_Documentacion_SGI.aspx' },
          { label: 'Control SG-SST',                                    link: 'https://web.laminaire.net/SirWeb/S.G.I/FRM/Control_SG-SST.aspx' },
          { label: 'Informe Acceso Visitantes',                        link: 'https://web.laminaire.net/SirWeb/S.G.I/FRM/Informe_Visitantes.aspx' },
          { label: 'Control de Acceso',                                link: 'https://web.laminaire.net/SirWeb/S.G.I/FRM/Control_Acceso.aspx' },
          { label: 'Control de Extintores',                            link: 'https://web.laminaire.net/SirWeb/S.G.I/FRM/Control_Extintores.aspx' },
          { label: 'Matriz de Riesgos',                                link: 'https://web.laminaire.net/SirWeb/S.G.I/FRM/Matriz_Riesgos.aspx' },
          { label: 'Captura Lavado de Manos',                           link: 'https://web.laminaire.net/SirWeb/S.G.I/FRM/Control_Lavado_Manos.aspx' },
          { label: 'Informe Lavado de Manos',                           link: 'https://web.laminaire.net/SirWeb/S.G.I/FRM/Informe_Lavado_Manos.aspx' },
          { label: 'Contexto Interno y Externo (DOFA)',                 link: 'https://web.laminaire.net/SirWeb/S.G.I/FRM/Contexto_Int_Ext_DOFA.aspx' },
          { label: 'Control de Retal',                                 link: 'https://web.laminaire.net/SirWeb/S.G.I/FRM/Control_Retal.aspx' },
          { label: 'Control Retal Mecanizado',                         link: 'https://web.laminaire.net/SirWeb/S.G.I/FRM/Control_Retal_Mecanizado.aspx' },
          { label: 'Monitoreo Precio Retal',                           link: 'https://web.laminaire.net/SirWeb/S.G.I/FRM/Monitoreo_Precios_Retal.aspx' },
          { label: 'Índice Producción de Láminas',                     link: 'https://web.laminaire.net/SirWeb/S.G.I/FRM/Indice_Lamina.aspx' },
          { label: 'Gestión de Ausentismo',                            link: 'https://web.laminaire.net/SirWeb/S.G.I/FRM/Gestion_Ausentismos.aspx' },
          { label: 'Informe Gestión de Ausentismo',                     link: 'https://web.laminaire.net/SirWeb/S.G.I/FRM/Informes_Ausentismo.aspx' },
          { label: 'Maestro Inspectores',                              link: 'https://web.laminaire.net/SirWeb/S.G.I/FRM/Registro_Inspectores.aspx' },
          { label: 'Banco Preguntas',                                  link: 'https://web.laminaire.net/SirWeb/S.G.I/FRM/Banco_Preguntas.aspx' },
          { label: 'Encuesta 5s',                                    link: 'https://web.laminaire.net/SirWeb/S.G.I/FRM/Encuestas_5S.aspx' },
          { label: 'Gestión Mejoras',                                  link: 'https://web.laminaire.net/SirWeb/S.G.I/FRM/Mejoras_5S.aspx' },
          { label: 'Informes 5S',                                      link: 'https://web.laminaire.net/SirWeb/S.G.I/FRM/Informes_5s.aspx' }
      ]
    } 
   
  ]
}
,
 {
  title: 'Producción',
  icon: 'settings',
  menuSections: [
    {
      title: '',
      items: [
 { label: 'Tablero Power BI', link: 'https://app.powerbi.com/view?r=eyJrIjoiOWY0YTRkYWMtZWM2MC00MDAyLThlMWQtNDBiYzc0ZjE1OWJjIiwidCI6ImMyZGQ3ZDBjLTQ1MWMtNDA3Mi1iN2YwLWE1NWJkOGVlODUyOSIsImMiOjR9' },
        { label: 'Control de Piso', link: 'https://web.laminaire.net/SirWeb/Produccion/FRM/ControlPiso.aspx' },
        { label: 'Control Operacional', link: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Control_Operacional.aspx' },
        { label: 'Maestro Causas Tiempo Improduc.', link: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Maestro_Causas_Improductivo.aspx' },
        { label: 'Captura Producto en Proceso', link: 'https://web.laminaire.net/SirWeb/Produccion/FRM/CapturaProdProc_V2.aspx' },
        { label: 'Captura Producto Terminado', link: 'https://web.laminaire.net/SirWeb/Produccion/FRM/CapturaPT.aspx' },
        { label: 'Captura Producto Pintado', link: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Captura_Produc_Pintado.aspx' },
        { label: 'Captura Manual Prod. en Proceso', link: 'https://web.laminaire.net/SirWeb/Produccion/FRM/DetalleCap_Manual_V2.aspx' },
        { label: 'Captura Accesorios', link: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Captura_LamiAccesorios.aspx' },
        { label: 'Captura Cajas Tobogán', link: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Captura_Tobogan.aspx' },
        { label: 'Programa de Producción', link: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Informe_Programacion_Prod.aspx' },
        { label: 'Resumen Eficiciencias por Líneas', link: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Resumen_Eficiencias_Lineas.aspx' },
        { label: 'Tablero Control Prod. en Proceso', link: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Tablero_Control.aspx' },
        { label: 'Control de Pedidos', link: 'https://web.laminaire.net/SirWeb/Ofimatica/Frms/Estado_Pedidos.aspx' },
        { label: 'Maestro Líneas de Producción', link: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Maestro_Lineas_Capturas.aspx' },
        { label: 'Control Lotes Producción', link: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Control_Lotes_Prod.aspx' },
        { label: 'Reimprimir Etiquetas Cajas y Pallets', link: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Reimprimir_Etiquetas_Cajas.aspx' },
        { label: 'Ajuste Distribución', link: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Frm_Ajuste_Distribucion.aspx' },
          { label: 'Informe Distribución Planta', link: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Informe_Distribucion_Planta.aspx' },
            { label: 'Informe Capturas Prod. en Proceso', link: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Informe_Capturas_Prod_Proc.aspx' },
            { label: 'Informe Carga de Producción', link: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Carga_USP.aspx' },
            { label: 'Informe Entradas Prod. Terminado', link: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Informe_Entradas_PT.aspx' },
            { label: 'Informe Eficiencias por Líneas', link: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Informe_Eficiencias_Lineas.aspx' },
            { label: 'Informe Horario Operarios', link: 'https://web.laminaire.net/SirWeb/Produccion/FRM/InformeHorarioOperarios.aspx' },
            { label: 'Informe DDMO', link: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Informe_DDMO.aspx' },
            { label: 'Informe Capturas Pendientes', link: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Informe_Prod_Pend_Capturar.aspx' },
            { label: 'Informe Tiempos Improductivos', link: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Informe_Tiempo_Improductivo.aspx' },
            { label: 'Informe Inspección de Calidad', link: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Informe_Inspeccion_Calidad.aspx' },
            { label: 'Informe Usp Acum. Pedidos Pend.', link: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Info_Usp_Acum_Pedidos_Pend.aspx' },
            { label: 'Consulta Pend. Empaque', link: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Inf_Pedido_Pend_Empaque.aspx' },
        { label: 'Totales Entradas PT', link: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Totales_EU.aspx' },
        { label: 'Etiquetas de Corte Mecanizado', link: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Etiquetas_Mecanizado.aspx' },
        { label: 'Amazon', link: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Maestro_Codigos_Amazon.aspx' },
            { label: 'Easy', link: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Maestro_Codigos_Easy.aspx' },
            { label: 'HomeCenter', link: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Maestro_Codigos_Home.aspx' },
            { label: 'Store_On', link: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Maestro_Codigos_StoreOn.aspx' },
         { label: 'Gestión de Compromisos Pedidos', link: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Gestion_Compromisos_Pedidos.aspx' },
        { label: 'Maestro Motivos de Cambio', link: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Maestro_Motivos_Compr_Pedidos.aspx' },
        { label: 'Informe Compromisos de Pedidos', link: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Informe_Gestion_Compromisos_Pedidos.aspx' },
        { label: 'Seguimiento Program. Mecanizado', link: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Seguim_Prog_Mecan.aspx' },
        { label: 'Parámetros Pedidos Construcción', link: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Parametros_Construccion.aspx' },
        { label: 'Gestión Captura Productos', link: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Frm_Modificacion_Capturas.aspx' },
        { label: 'Control Láminas y Bobinas', link: 'https://web.laminaire.net/SirWeb/Logistica/Frm/Control_LaminasYBobinas.aspx' },
        { label: 'Maestro de Áreas', link: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Maestro_Areas.aspx' },
        { label: 'Control Variables Pintura', link: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Tablero_Ctrl_Var_Pint.aspx' },
        { label: 'División Fechas Producción', link: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Programacion_Fechas_Entrega.aspx' }
      ]
    }
 
  ]
},
  {
  title: 'Comercial',
  icon: 'sell',
  menuSections: [
    {
      title: ' ',
      items: [
         { label: 'Cotizaciones HVAC | STOCK EYP', link: 'https://web.laminaire.net/SirWeb/Ofimatica/Frms/Cotizaciones_Laminaire.aspx' },
        { label: 'Copiar Cotizaciones', link: 'https://web.laminaire.net/SirWeb/Ofimatica/Frms/Copiar_Cotizacion.aspx' },
        { label: 'Convertir Cotización a Pedido', link: 'https://web.laminaire.net/SirWeb/Ofimatica/Frms/Convertir_Cotizacion.aspx' },
        { label: 'Informe General de Cotizaciones', link: 'https://web.laminaire.net/SirWeb/Ofimatica/Frms/Informe_De_Cotizaciones.aspx' },
        { label: 'Cotizaciones Arquitectónicos', link: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Cotizaciones_Construccion_V2_1.aspx' },
        { label: 'Maestro de Modelos Arquitectónicos', link: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Maestro_Modelos_Arquitect.aspx' },
        { label: 'Informe Cotizaciones Arquitectónicos', link: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Informe_Cotiz_Arquitectonicos.aspx' },
        { label: 'Cotizaciones Equipart', link: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Cotizaciones_Equipart.aspx' },
        { label: 'Maestro Marcas Equipart', link: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Maestro_Marcas_equipart.aspx' },
        { label: 'Informe Cotizaciones Equipart', link: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Informe_Cotiz_Equipart.aspx' },
        { label: 'Cotizaciones Exportación', link: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Cotizaciones_Exportacion.aspx' },
        { label: 'Maestro de Clientes Exportación', link: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Clientes_Exportacion.aspx' },
        { label: 'Copiar Cotización Exportación', link: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Copiar_Cotiz_Export.aspx' },
        { label: 'Informe Cotización Exportación', link: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Informe_Cotiz_Exportacion.aspx' },
        { label: 'Convertir Cotización de Exportación', link: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Convertir_Cotiz_Export.aspx' },
        { label: 'Pedidos', link: 'https://web.laminaire.net/SirWeb/Ofimatica/Frms/Pedidos_Nuevo.aspx' },
        { label: 'Control de Cotizaciones EQUIPART', link: 'https://web.laminaire.net/SirWeb/Comercial/FRM/FrmCotizaciones.aspx' },
        { label: 'Calendario de Seguimiento', link: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Calendario_Seguimiento.aspx' },
        { label: 'Informe de Cotizaciones Ingeniería', link: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Informes_Cotizaciones.aspx' },
        { label: 'Informe de Cotizaciones Ventas', link: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Informe_Cotiz_Real.aspx' },
        { label: 'Frecuencia de Facturac-Cotizac', link: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Informe_Frecuencia_Fac_Cot.aspx' },
        { label: 'Ventas por Clientes', link: 'https://web.laminaire.net/SirWeb/Ofimatica/Frms/Ventas_Clientes_Rango_Fechas.aspx' },
        { label: 'Clientes que No Compraron', link: 'https://web.laminaire.net/SirWeb/Ofimatica/Frms/Clientes_No_Compraron.aspx' },
        { label: 'Cantidad de Pedidos', link: 'https://web.laminaire.net/SirWeb/Ofimatica/Frms/Pedidos_Mes_UEN.aspx' },
        { label: 'Informe de Clientes Nuevos', link: 'https://web.laminaire.net/SirWeb/Ofimatica/Frms/Informe_Clientes_Nuevos.aspx' },
        { label: 'Gestión de Clientes', link: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Gestion_Clientes.aspx' },
        { label: 'Pedidos Pendientes', link: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Pedidos_Pendientes.aspx' },
        { label: 'Criticidad Clientes SAGRILAFT', link: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Matriz_Criticidad.aspx' },
        { label: 'Matriz Criticidad Clientes OEA', link: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Matriz_Criticidad_OEA.aspx' },
        { label: 'Termómetro de Ventas', link: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Termometro_Ventas.aspx' },
        { label: 'Maestro Presupuesto de Ventas', link: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Presupuesto_Ventas.aspx' },
        { label: 'Campañas y Post Publicitarios', link: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Post_Publicitarios.aspx' },
        { label: 'Formato Promotores de Ventas', link: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Promotores_Ventas.aspx' },
        { label: 'Control de Souvenir', link: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Control_Suvenires.aspx' },
        { label: 'Consulta Documentos por Usuarios', link: 'https://web.laminaire.net/SirWeb/Logistica/Frm/Consultar_Documentos_Usuarios.aspx?proceso=COMERCIAL' },
        { label: 'Autorización de Pedidos', link: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Autorizaciones_Pedidos.aspx' },
        { label: 'Material Mercadeo', link: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Area_Seleccion_Mercadeo.aspx' },
        { label: 'Control de Muestras', link: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Control_Muestras.aspx' },
        { label: 'Generador de Códigos PT', link: 'https://web.laminaire.net/SirWeb/Ofimatica/Frms/Generador_Codigos_PT.aspx' },
        { label: 'Anular Pedidos', link: 'https://web.laminaire.net/SirWeb/Ofimatica/Frms/AnularPedidos.aspx' },
        { label: 'SIR Enterprise', link: 'https://web.laminaire.net/SirWeb/SIR_Enterprise_WEB/' }
      ]
    },
  
  ]
}
,
 {
  title: 'Ingeniería',
  icon: 'engineering',
  menuSections: [
    {
      title: '',
      items: [
              { label: 'Maestro Diseñadores', link: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Maestro_Diseñadores.aspx' },
        { label: 'Maestro de Marcas', link: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Maestro_Marcas.aspx' },
        { label: 'Ingreso de Cotizaciones', link: 'https://web.laminaire.net/S-irWeb/Comercial/FRM/FrmIngresoCot.aspx?Id=0' },
        { label: 'Informe Resumen de Cotizaciones', link: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Informe_Resumen_Cotiz_Por_Divis.aspx' },
        { label: 'Parámetros Códigos PT', link: 'https://web.laminaire.net/SirWeb/Ofimatica/Frms/Parametros_Codigos_PT.aspx' },
        { label: 'Maestro de Medidas', link: 'https://web.laminaire.net/SirWeb/Ofimatica/Frms/Maestro_Medidas.aspx' },
        { label: 'Vincular Grupos - Líneas PT', link: 'https://web.laminaire.net/SirWeb/Ofimatica/Frms/Vincular_Grupos_Lineas_Inv.aspx' },
        { label: 'Parámetros MP Arquitectónicos', link: 'https://web.laminaire.net/SirWeb/Ingenieria/FRM/Parametros_MP_Arquitectonicos.aspx' },
        { label: 'Proyectos de Ingeniería', link: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Proyectos_Ingenieria.aspx' },
        { label: 'Liberación Pedidos de Ingeniería', link: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Cambiar_Prioridad_Pedidos.aspx' },
        { label: 'Informe Pedidos Ing. Liberados', link: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Informe_Liberacion_Pedidos.aspx' },
        { label: 'Información Inicial', link: 'https://web.laminaire.net/SirWeb/Ingenieria/FRM/Informacion_Inicial.aspx' },
        { label: 'Proyectos Asignados', link: 'https://web.laminaire.net/SirWeb/Ingenieria/FRM/Proyectos_Asignados.aspx' },
        { label: 'Gestión de Proyectos', link: 'https://web.laminaire.net/SirWeb/Ingenieria/FRM/Gestion_Proyectos.aspx' },
        { label: 'Métricas Proyectos', link: 'https://web.laminaire.net/SirWeb/Ingenieria/FRM/Metricas_Proyecto.aspx' },
        { label: 'Biblioteca Ingeniería', link: 'https://web.laminaire.net/SirWeb/Ingenieria/FRM/Biblioteca_Ingenieria.aspx' },
        { label: 'Parámetros Especiales Referencias', link: 'https://web.laminaire.net/SirWeb/Ingenieria/FRM/Parametros_Especiales_Referencias.aspx' },
        { label: 'Informe Códigos sin Vigencia', link: 'https://web.laminaire.net/SirWeb/Ingenieria/FRM/Informe_Codigos_Sin_Vigencia.aspx' }
      ]
    }
  ]
}

  ];

 private dialogRef!: MatDialogRef<any>;

  constructor(
    private dialog: MatDialog,
    private router: Router
  ) {}

  openDialog(card: Card) {
    this.dialogRef = this.dialog.open(this.cardDialogTpl, {
      data: card,
      width: '1200px',
      maxWidth: '100vw',
      panelClass: 'custom-dialog-panel',
      disableClose: true,  // impide clic fuera o Esc
    });
  }

  /** Navega sin tocar el modal */
  onNavigate(url: string) {
    if (url.startsWith('http')) {
      window.open(url, '_blank', 'noopener');
    } else {
      this.router.navigateByUrl(url);
    }
    // ¡NO cerramos aquí!
  }

  /** Sólo esto cierra el diálogo */
  closeDialog() {
    this.dialogRef.close();
  }

  /** Divide el array en N columnas */
  public getColumns(items: MenuItem[], cols: number): MenuItem[][] {
    const res: MenuItem[][] = Array.from({ length: cols }, () => []);
    items.forEach((item, i) => res[i % cols].push(item));
    return res;
  }


}
