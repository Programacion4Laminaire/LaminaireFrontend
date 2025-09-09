import { Routes } from '@angular/router';
import { LayoutComponent } from '@app/shared/layout/layout.component';
import { authGuard } from './modules/core/guards/auth.guard';

const childrenRoutes: Routes = [
    {
     path: 'sir-laminaire',
   loadComponent: () =>
      import('./pages/sir-laminaire/sir-laminaire.component').then(
        (c) => c.SirLaminaireComponent
     ),
   },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./modules/identity/pages/profile/profile.component').then(
        (c) => c.ProfileComponent
      ),
  },
  {
    path: 'users',
    loadComponent: () =>
      import(
        './modules/identity/pages/user/components/user-list/user-list.component'
      ).then((c) => c.UserListComponent),
  },
  {
    path: 'roles',
    loadComponent: () =>
      import(
        './modules/identity/pages/role/components/role-list/role-list.component'
      ).then((c) => c.RoleListComponent),
  },
  {
    path: 'roles/crear',
    loadComponent: () =>
      import(
        './modules/identity/pages/role/components/role-management/role-management.component'
      ).then((c) => c.RoleManagementComponent),
  },
  {
    path: 'roles/editar/:roleId',
    loadComponent: () =>
      import(
        './modules/identity/pages/role/components/role-management/role-management.component'
      ).then((c) => c.RoleManagementComponent),
  },
  {
    path: 'role-users',
    loadComponent: () =>
      import(
        './modules/identity/pages/user-role/components/user-role-list/user-role-list.component'
      ).then((c) => c.UserRoleListComponent),
  },
  {
    path: 'product',
    loadComponent: () =>
      import(
        './modules/engineering/pages/product/product-form/product-form.component'
      ).then((c) => c.ProductFormComponent),
  },
];

export const routes: Routes = [
  // ruta inicial
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  // auth público
  {
    path: 'login',
    loadComponent: () =>
      import(
        './modules/identity/pages/auth/components/login/login.component'
      ).then((c) => c.LoginComponent),
  },
  {
    path: 'reset-password',
    loadComponent: () =>
      import(
        './modules/identity/pages/auth/components/reset-password/reset-password.component'
      ).then((c) => c.ResetPasswordComponent),
  },



// 🔹 RUTAS EXTERNAS — CEO
{
  path: 'ceo-analisis-financiero-empresas-colombia',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/D_Estrategico/Frms/Informes_Analisis_Competencia.aspx' }
},
{
  path: 'ceo-plan-estrategico',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/D_Estrategico/Frms/Plan_Estrategico.aspx' }
},
{
  path: 'ceo-proyectos',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/D_Estrategico/Frms/Proyectos.aspx' }
},
{
  path: 'ceo-administracion-de-actas',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Actas/Frm_Actas_V2.aspx' }
},
{
  path: 'ceo-plan-mensual-de-ejecucion',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/D_Estrategico/Frms/Plan_Mensual_Ejecucion.aspx' }
},
{
  path: 'ceo-ideas-innovadoras',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/D_Estrategico/Frms/Ideas_Innovadoras.aspx' }
},
{
  path: 'ceo-administrador-ideas-innovadoras',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/D_Estrategico/Frms/Administrador_Ideas_Innovadoras.aspx' }
},
{
  path: 'ceo-matriz-de-riesgos-legales',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/D_Estrategico/Frms/Matriz_Requisitos_Legales_Nuevo.aspx' }
},
{
  path: 'ceo-gestion-documental',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/D_Estrategico/Frms/Gestion_Documental.aspx' }
},
{
  path: 'ceo-gobierno-corporativo',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/D_Estrategico/Frms/Gobierno_Corporativo.aspx' }
},
{
  path: 'ceo-documentacion-ceo',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/D_Estrategico/Frms/documentacion_directores.aspx?parametro=11' }
},
{
  path: 'ceo-plan-de-autodesarrollo',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/D_Estrategico/Frms/Plan_Autodesarrollo_Competencias_Gerenciales.aspx' }
},

// 🔹 RUTAS EXTERNAS — GERENCIA
{
  path: 'gerencia-analisis-financiero-empresas-colombia',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/D_Estrategico/Frms/Informes_Analisis_Competencia.aspx' }
},
{
  path: 'gerencia-plan-estrategico',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/D_Estrategico/Frms/Plan_Estrategico.aspx' }
},
{
  path: 'gerencia-proyectos',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/D_Estrategico/Frms/Proyectos.aspx' }
},
{
  path: 'gerencia-administracion-de-actas',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Actas/Frm_Actas_V2.aspx' }
},
{
  path: 'gerencia-plan-mensual-de-ejecucion',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/D_Estrategico/Frms/Plan_Mensual_Ejecucion.aspx' }
},
{
  path: 'gerencia-ideas-innovadoras',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/D_Estrategico/Frms/Ideas_Innovadoras.aspx' }
},
{
  path: 'gerencia-administrador-ideas-innovadoras',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/D_Estrategico/Frms/Administrador_Ideas_Innovadoras.aspx' }
},
{
  path: 'gerencia-matriz-de-riesgos-legales',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/D_Estrategico/Frms/Matriz_Requisitos_Legales_Nuevo.aspx' }
},
{
  path: 'gerencia-gestion-documental',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/D_Estrategico/Frms/Gestion_Documental.aspx' }
},
{
  path: 'gerencia-gobierno-corporativo',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/D_Estrategico/Frms/Gobierno_Corporativo.aspx' }
},
{
  path: 'gerencia-documentacion-ceo',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/D_Estrategico/Frms/documentacion_directores.aspx?parametro=11' }
},
{
  path: 'gerencia-plan-de-autodesarrollo',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/D_Estrategico/Frms/Plan_Autodesarrollo_Competencias_Gerenciales.aspx' }
},

// 🔹 RUTAS EXTERNAS — FINANCIERA
{
  path: 'financiera-informe-resumen-bodegas-cmv',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Financiera/Frm/Costo_Mercancia_Vendida.aspx' }
},
{
  path: 'financiera-verificacion-de-trm',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Financiera/Frm/Verificacion_TRM.aspx' }
},
{
  path: 'financiera-comisiones',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Financiera/Frm/Comisiones.aspx' }
},
{
  path: 'financiera-cuentas-y-c-costos-proveedores',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Financiera/Frm/Ctas_CC_Proveedores.aspx' }
},
{
  path: 'financiera-control-de-gastos',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Financiera/Frm/Gastos.aspx' }
},
{
  path: 'financiera-ingresos-operacionales',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Ofimatica/Frms/Maestro_General_Ventas.aspx' }
},
{
  path: 'financiera-flujo-de-caja',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Financiera/Frm/Flujo_Caja.aspx' }
},
{
  path: 'financiera-consulta-documentos-por-usuarios',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Logistica/Frm/Consultar_Documentos_Usuarios.aspx?proceso=FINANCIERA' }
},
{
  path: 'financiera-documentacion-financiera',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Financiera/Frm/Documentacion_Financiera.aspx' }
},
{
  path: 'financiera-solicitud-de-notas-credito',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Financiera/Frm/Solicitud_Notas_Credito.aspx' }
},
{
  path: 'financiera-integracion-de-nomina',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Financiera/Frm/Integracion_Nomina.aspx' }
},
{
  path: 'financiera-compras-tc',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Financiera/Frm/Integracion_Fac_Compras.aspx' }
},
{
  path: 'financiera-cierre-cmv',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Financiera/Frm/CIERRE_CMV.aspx' }
},
{
  path: 'financiera-ventas-laminaire',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Financiera/Frm/VENTAS_LAMINAIRE.aspx' }
},
{
  path: 'financiera-estado-de-resultados',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Financiera/Frm/Informe_Simetrica.aspx' }
},
{
  path: 'financiera-balance-general',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Financiera/Frm/Info_Estado_Financiero.aspx' }
},
{
  path: 'financiera-parametros',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Financiera/Frm/Parametros_Simetrica.aspx' }
},

// 🔹 RUTAS EXTERNAS — TI | BI
{
  path: 'ti-bi-tablero-power-bi',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://app.powerbi.com/view?r=eyJrIjoiOGNkMjQwMzEtYzc2Mi00NDA4LWEwZWQtMmZiYjM3YjVlOTlhIiwidCI6IjVmYzZkYWUyLTg1NmMtNDUyNC05MGVjLWQ4N2IxNjE5ZjE1OSJ9' }
},
{
  path: 'ti-bi-solicitudes-a-sistemas',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Solicitudes_Sistemas/Frms/Solicitudes_Sistemas.aspx' }
},
{
  path: 'ti-bi-informe-encuestas',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Solicitudes_Sistemas/Frms/Informe_Encuestas_TI.aspx' }
},
{
  path: 'ti-bi-ficha-tecnica-activos-informaticos',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Solicitudes_Sistemas/Frms/Ficha_Tecnica_Activos.aspx' }
},
{
  path: 'ti-bi-documentacion-ti-bi',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Solicitudes_Sistemas/Frms/Repositorio_IN.aspx' }
},
{
  path: 'ti-bi-matriz-perfilacion-de-usuarios',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Solicitudes_Sistemas/Frms/Matriz_Perfilacion.aspx' }
},
{
  path: 'ti-bi-permisos-carpetas-comunes',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Solicitudes_Sistemas/Frms/Permisos_Comunes.aspx' }
},
{
  path: 'ti-bi-informe-activos-informaticos',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Solicitudes_Sistemas/Frms/Informe_Activos_Inf.aspx' }
},
{
  path: 'ti-bi-informe-solicitudes-por-usuarios',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Solicitudes_Sistemas/Frms/Informe_Solicitudes_por_Empleados.aspx' }
},
{
  path: 'ti-bi-maestro-de-usuarios',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Maestros/Frms/Usuarios.aspx' }
},
{
  path: 'ti-bi-administrador-de-encuestas',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Solicitudes_Sistemas/Frms/Admin_Encuestas.aspx' }
},
{
  path: 'ti-bi-solicitud-recursos-informaticos',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Solicitudes_Sistemas/Frms/Solicitud_Recursos_Inf.aspx' }
},
{
  path: 'ti-bi-politicas-sir',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Solicitudes_Sistemas/Frms/Maestro_Politicas.aspx' }
},

// 🔹 RUTAS EXTERNAS — LOGÍSTICA
{
  path: 'logistica-evaluacion-de-proveedores',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Solicitudes_ControlDoc/Frms/Evaluacion_Proveedores.aspx' }
},
{
  path: 'logistica-srm-gestion-de-proveedores',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Logistica/Frm/Gestion_Proveedores.aspx' }
},
{
  path: 'logistica-oc-proveedores-pedidos-equipart',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Logistica/Frm/OC_Proveedores_Disfrio.aspx' }
},
{
  path: 'logistica-estado-ordenes-de-compra',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Logistica/Frm/Informe_Estado_OC.aspx' }
},
{
  path: 'logistica-partidas-arancelarias-por-contenedor',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Logistica/Frm/Partidas_Arancelarias_Contenedores.aspx' }
},
{
  path: 'logistica-control-importaciones-y-anticipos',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Logistica/Frm/Control_Impo_Anticipos.aspx' }
},
{
  path: 'logistica-bloqueo-de-mp-por-faltante',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Logistica/Frm/Bloqueo_MP.aspx' }
},
{
  path: 'logistica-seguimiento-cot-arquitectonicos',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Logistica/Frm/Gestion_MP_Arquitectonicos.aspx' }
},
{
  path: 'logistica-modificacion-salidas-s3',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Logistica/Frm/Frm_Modificacion_Salidas_S3.aspx' }
},
{
  path: 'logistica-conteos-fisicos',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Logistica/Frm/Conteo_fisico.aspx' }
},
{
  path: 'logistica-estadisticas-de-inventario-mp',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Logistica/Frm/Control_Estadist_Invent.aspx' }
},
{
  path: 'logistica-estadisticas-inventario-equipart',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Logistica/Frm/Control_Estad_Inv_Disfrio.aspx' }
},
{
  path: 'logistica-lista-precios-stock-equipart',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Logistica/Frm/Lista_Precios_Stock.aspx' }
},
{
  path: 'logistica-lista-stock-laminaire',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Logistica/Frm/Lista_Stock_Laminaire.aspx' }
},
{
  path: 'logistica-lista-stock-grandes-superficies',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Logistica/Frm/Stock_Grandes_Superficies.aspx' }
},
{
  path: 'logistica-traslado-de-pedidos',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Logistica/Frm/Traslado_Pedidos.aspx' }
},
{
  path: 'logistica-control-de-cajas',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Logistica/Frm/Control_Cajas.aspx' }
},
{
  path: 'logistica-descripciones-minimas',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Logistica/Frm/Descripciones_Minimas.aspx' }
},
{
  path: 'logistica-wms-gestion-de-almacenamiento',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Logistica/Frm/WMS.aspx' }
},
{
  path: 'logistica-wms-bodegas-de-aluminio',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Logistica/Frm/WMS_Perfileria.aspx' }
},
{
  path: 'logistica-wms-girardota',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Logistica/Frm/WMS_GIRARDOTA.aspx' }
},
{
  path: 'logistica-administrar-bodegas',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Logistica/Frm/Administrar_Bodegas.aspx' }
},
{
  path: 'logistica-cargar-masivo-guias-pedidos',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Logistica/Frm/Masivo_Guias_Pedidos.aspx' }
},
{
  path: 'logistica-control-pintura',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Logistica/Frm/Control_Pintura.aspx' }
},
{
  path: 'logistica-consulta-de-documentos',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Logistica/Frm/Consulta_Documentos.aspx' }
},
{
  path: 'logistica-informes',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Logistica/Frm/vigencia_costos.aspx' }
},
{
  path: 'logistica-documentos-logistica',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Logistica/Frm/Repositorio_Logistica.aspx' }
},

// 🔹 RUTAS EXTERNAS — MANTENIMIENTO
{
  path: 'mantenimiento-solicitudes-de-mantenimiento',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Solicitudes_Mmto/Frms/Solicitudes_Mmto.aspx' }
},
{
  path: 'mantenimiento-contenedor-solicitudes-de-mtto',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Solicitudes_Mmto/Frms/Contenedor_Mtto.aspx' }
},
{
  path: 'mantenimiento-seguimiento-solicitudes-de-mtto',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Solicitudes_Mmto/Frms/Solicitudes_X_Usuario.aspx' }
},
{
  path: 'mantenimiento-ficha-tecnica-activos-mtto',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Solicitudes_Mmto/Frms/Ficha_Tecnica_Mtto.aspx' }
},
{
  path: 'mantenimiento-bitacora-operacion-mantenimiento-medellin',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Solicitudes_Mmto/Frms/Bitacora_Operacion_Mtto.aspx' }
},
{
  path: 'mantenimiento-bitacora-operacion-mantenimiento-girardota',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Solicitudes_Mmto/Frms/Bitacora_Mtto_Girardota.aspx' }
},
{
  path: 'mantenimiento-plan-mantenimiento-preventivo',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Solicitudes_Mmto/Frms/Plan_Mtto.aspx' }
},
{
  path: 'mantenimiento-informes-contenedor-mantenimiento',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Solicitudes_Mmto/Frms/Informes_Contenedor.aspx' }
},
{
  path: 'mantenimiento-informe-de-encuestas',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Solicitudes_Mmto/Frms/Informes_Encuestas.aspx' }
},
{
  path: 'mantenimiento-pronostico-mantenimiento-preventivo',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Solicitudes_Mmto/Frms/Pronostico_mtto_prev.aspx' }
},
{
  path: 'mantenimiento-adelantar-mantenimiento-preventivo',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Solicitudes_Mmto/Frms/Adelantar_Mtto_Prevent.aspx' }
},

// 🔹 RUTAS EXTERNAS — TALENTO HUMANO
{
  path: 'tal-humano-comprob-de-pago-anteriores-a-2024',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Comprobantes_Pago/Frms/Frm_Comprobante.aspx' }
},
{
  path: 'tal-humano-certificado-laboral',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/Frm_Certificado_Laboral.aspx' }
},
{
  path: 'tal-humano-ficha-del-empleado',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/Frm_Ficha_Talento_V2.aspx' }
},
{
  path: 'tal-humano-informe-ficha-del-empleado',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/Frm_Informe_Ficha_Talento.aspx' }
},
{
  path: 'tal-humano-perfil-del-cargo',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/Frm_Perfil_Cargo_V2.aspx' }
},
{
  path: 'tal-humano-competencias',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/Frm_Competencias.aspx' }
},
{
  path: 'tal-humano-proced-instruct-politicas-form',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/Frm_Maestros_Pc.aspx' }
},
{
  path: 'tal-humano-resp-seg-resp-sg-sst-res-amb',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/Frm_Maestros_Pc_2.aspx' }
},
{
  path: 'tal-humano-valores-corporativos',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/Frm_Maestros_Valores_Corp.aspx' }
},
{
  path: 'tal-humano-informes-control-de-acceso',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/ReporteControlAcceso.aspx' }
},
{
  path: 'tal-humano-solicitud-de-vacaciones',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/Control_Vacaciones_Empleados.aspx' }
},
{
  path: 'tal-humano-calendario-de-reuniones',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/Calendario_Reuniones.aspx' }
},
{
  path: 'tal-humano-control-plan-de-bienestar',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/Frm_Pasaportes.aspx' }
},
{
  path: 'tal-humano-informes-plan-de-bienestar',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/Informes_Pasaporte.aspx' }
},
{
  path: 'tal-humano-gestion-del-conocimiento',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/Frm_Control_Capacitaciones.aspx' }
},
{
  path: 'tal-humano-informes-gestion-conocimiento',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/Frm_Informes_Control_Capacitaciones.aspx' }
},
{
  path: 'tal-humano-informes-detallado-gc',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/Frm_Informes_Capacit_Detallado.aspx' }
},
{
  path: 'tal-humano-evaluaciones-de-360',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/Frm_Evaluaciones_360.aspx' }
},
{
  path: 'tal-humano-informes-evaluaciones-de-360',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/Informes_Evaluacion_360.aspx' }
},
{
  path: 'tal-humano-maestro-evaluaciones-de-360',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/Maestros_Evaluaciones_360.aspx' }
},
{
  path: 'tal-humano-revision-de-aspectos',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/Revision_Aspectos.aspx' }
},
{
  path: 'tal-humano-analisis-de-causas',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/Analisis_Causas_Evaluac_360.aspx' }
},
{
  path: 'tal-humano-control-de-empleados',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/Control_Empleados_Activos_V2.aspx' }
},
{
  path: 'tal-humano-empleados-ctrl-acceso-vs-ofima',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/Frm_Control_Empleados.aspx' }
},
{
  path: 'tal-humano-informe-control-de-empleados',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/Frm_Informes_Control_Empleados.aspx' }
},
{
  path: 'tal-humano-plan-general-de-capacitaciones',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/FrmPlanGeneralCapacitcionesaspx.aspx' }
},
{
  path: 'tal-humano-maestro-plan-gral-capacitaciones',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/Frm_MestroPlanGeneral_Capacita.aspx' }
},
{
  path: 'tal-humano-plan-de-entrenamiento',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/Plan_Entrenamiento.aspx' }
},
{
  path: 'tal-humano-rifa-canasta-laminaire',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/Rifa.aspx' }
},
{
  path: 'tal-humano-rifa-general',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/RifaGeneral.aspx' }
},
{
  path: 'tal-humano-registro-disponibilidad-empleados',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/Frm_Registro_Disponibilidad_Empleados.aspx' }
},
{
  path: 'tal-humano-consulta-disponibilidad-empleados',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/Frm_Consulta_Disponibilidad_Empleados.aspx' }
},
{
  path: 'tal-humano-control-de-dotacion',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/Frm_Control_Dotacion.aspx' }
},
{
  path: 'tal-humano-dctos-firmados-electronicamente',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/Dctos_Firmados_Electr.aspx' }
},
{
  path: 'tal-humano-encuesta-retiro-empleados',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Solicitudes_Gh/Frms/Formulario_Retiro_Empleados.aspx' }
},

// 🔹 RUTAS EXTERNAS — S.G.I.
{
  path: 'sgi-informe-ega',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/S.G.I/FRM/Informe_EGA.aspx' }
},
{
  path: 'sgi-mejoramiento-continuo',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/S.G.I/FRM/GestionMejoramiento_continuo.aspx' }
},
{
  path: 'sgi-informe-mejoramiento-continuo',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/S.G.I/FRM/Info_Gestion_Mejoramiento_Continuo.aspx' }
},
{
  path: 'sgi-documentacion',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/S.G.I/FRM/Documentacion_SGI.aspx' }
},
{
  path: 'sgi-informe-documentacion',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/S.G.I/FRM/Informes_Documentacion_SGI.aspx' }
},
{
  path: 'sgi-sg-sst',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/S.G.I/FRM/Control_SG-SST.aspx' }
},
{
  path: 'sgi-informe-visitantes',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/S.G.I/FRM/Informe_Visitantes.aspx' }
},
{
  path: 'sgi-control-acceso',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/S.G.I/FRM/Control_Acceso.aspx' }
},
{
  path: 'sgi-extintores',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/S.G.I/FRM/Control_Extintores.aspx' }
},
{
  path: 'sgi-matriz-riesgos',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/S.G.I/FRM/Matriz_Riesgos.aspx' }
},
{
  path: 'sgi-captura-lavado-manos',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/S.G.I/FRM/Control_Lavado_Manos.aspx' }
},
{
  path: 'sgi-informe-lavado-manos',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/S.G.I/FRM/Informe_Lavado_Manos.aspx' }
},
{
  path: 'sgi-dofa',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/S.G.I/FRM/Contexto_Int_Ext_DOFA.aspx' }
},
{
  path: 'sgi-control-retal',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/S.G.I/FRM/Control_Retal.aspx' }
},
{
  path: 'sgi-control-retal-mecanizado',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/S.G.I/FRM/Control_Retal_Mecanizado.aspx' }
},
{
  path: 'sgi-monitoreo-precio-retal',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/S.G.I/FRM/Monitoreo_Precios_Retal.aspx' }
},
{
  path: 'sgi-indice-produccion-laminas',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/S.G.I/FRM/Indice_Lamina.aspx' }
},
{
  path: 'sgi-gestion-ausentismos',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/S.G.I/FRM/Gestion_Ausentismos.aspx' }
},
{
  path: 'sgi-informe-ausentismo',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/S.G.I/FRM/Informes_Ausentismo.aspx' }
},
{
  path: 'sgi-maestro-inspectores',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/S.G.I/FRM/Registro_Inspectores.aspx' }
},
{
  path: 'sgi-banco-preguntas',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/S.G.I/FRM/Banco_Preguntas.aspx' }
},
{
  path: 'sgi-encuesta-5s',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/S.G.I/FRM/Encuestas_5S.aspx' }
},
{
  path: 'sgi-gestion-mejoras',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/S.G.I/FRM/Mejoras_5S.aspx' }
},
{
  path: 'sgi-informes-5s',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/S.G.I/FRM/Informes_5s.aspx' }
},

// 🔹 RUTAS EXTERNAS — PRODUCCIÓN
{
  path: 'produccion-tablero-power-bi',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://app.powerbi.com/view?r=eyJrIjoiOWY0YTRkYWMtZWM2MC00MDAyLThlMWQtNDBiYzc0ZjE1OWJjIiwidCI6ImMyZGQ3ZDBjLTQ1MWMtNDA3Mi1iN2YwLWE1NWJkOGVlODUyOSIsImMiOjR9' }
},
{
  path: 'produccion-control-de-piso',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Produccion/FRM/ControlPiso.aspx' }
},
{
  path: 'produccion-control-operacional',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Control_Operacional.aspx' }
},
{
  path: 'produccion-maestro-causas-tiempo-improduc',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Maestro_Causas_Improductivo.aspx' }
},
{
  path: 'produccion-captura-producto-en-proceso',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Produccion/FRM/CapturaProdProc_V2.aspx' }
},
{
  path: 'produccion-captura-producto-terminado',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Produccion/FRM/CapturaPT.aspx' }
},
{
  path: 'produccion-captura-producto-pintado',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Captura_Produc_Pintado.aspx' }
},
{
  path: 'produccion-captura-manual-prod-en-proceso',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Produccion/FRM/DetalleCap_Manual_V2.aspx' }
},
{
  path: 'produccion-captura-accesorios',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Captura_LamiAccesorios.aspx' }
},
{
  path: 'produccion-captura-cajas-tobogan',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Captura_Tobogan.aspx' }
},
{
  path: 'produccion-programa-de-produccion',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Informe_Programacion_Prod.aspx' }
},
{
  path: 'produccion-resumen-eficiencias-por-lineas',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Resumen_Eficiencias_Lineas.aspx' }
},
{
  path: 'produccion-tablero-control-prod-en-proceso',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Tablero_Control.aspx' }
},
{
  path: 'produccion-control-de-pedidos',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Ofimatica/Frms/Estado_Pedidos.aspx' }
},
{
  path: 'produccion-maestro-lineas-de-produccion',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Maestro_Lineas_Capturas.aspx' }
},
{
  path: 'produccion-control-lotes-produccion',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Control_Lotes_Prod.aspx' }
},
{
  path: 'produccion-reimprimir-etiquetas-cajas-y-pallets',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Reimprimir_Etiquetas_Cajas.aspx' }
},
{
  path: 'produccion-ajuste-distribucion',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Frm_Ajuste_Distribucion.aspx' }
},
{
  path: 'produccion-informe-distribucion-planta',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Informe_Distribucion_Planta.aspx' }
},
{
  path: 'produccion-informe-capturas-prod-en-proceso',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Informe_Capturas_Prod_Proc.aspx' }
},
{
  path: 'produccion-informe-carga-de-produccion',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Carga_USP.aspx' }
},
{
  path: 'produccion-informe-entradas-prod-terminado',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Informe_Entradas_PT.aspx' }
},
{
  path: 'produccion-informe-eficiencias-por-lineas',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Informe_Eficiencias_Lineas.aspx' }
},
{
  path: 'produccion-informe-horario-operarios',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Produccion/FRM/InformeHorarioOperarios.aspx' }
},
{
  path: 'produccion-informe-ddmo',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Informe_DDMO.aspx' }
},
{
  path: 'produccion-informe-capturas-pendientes',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Informe_Prod_Pend_Capturar.aspx' }
},
{
  path: 'produccion-informe-tiempos-improductivos',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Informe_Tiempo_Improductivo.aspx' }
},
{
  path: 'produccion-informe-inspeccion-de-calidad',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Informe_Inspeccion_Calidad.aspx' }
},
{
  path: 'produccion-informe-usp-acum-pedidos-pend',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Info_Usp_Acum_Pedidos_Pend.aspx' }
},
{
  path: 'produccion-consulta-pend-empaque',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Inf_Pedido_Pend_Empaque.aspx' }
},
{
  path: 'produccion-totales-entradas-pt',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Totales_EU.aspx' }
},
{
  path: 'produccion-etiquetas-de-corte-mecanizado',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Etiquetas_Mecanizado.aspx' }
},
{
  path: 'produccion-amazon',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Maestro_Codigos_Amazon.aspx' }
},
{
  path: 'produccion-easy',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Maestro_Codigos_Easy.aspx' }
},
{
  path: 'produccion-homecenter',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Maestro_Codigos_Home.aspx' }
},
{
  path: 'produccion-store-on',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Maestro_Codigos_StoreOn.aspx' }
},
{
  path: 'produccion-gestion-de-compromisos-pedidos',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Gestion_Compromisos_Pedidos.aspx' }
},
{
  path: 'produccion-maestro-motivos-de-cambio',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Maestro_Motivos_Compr_Pedidos.aspx' }
},
{
  path: 'produccion-informe-compromisos-de-pedidos',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Informe_Gestion_Compromisos_Pedidos.aspx' }
},
{
  path: 'produccion-seguim-prog-mecanizado',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Seguim_Prog_Mecan.aspx' }
},
{
  path: 'produccion-parametros-pedidos-construccion',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Parametros_Construccion.aspx' }
},
{
  path: 'produccion-gestion-captura-productos',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Frm_Modificacion_Capturas.aspx' }
},
{
  path: 'produccion-control-laminas-y-bobinas',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Logistica/Frm/Control_LaminasYBobinas.aspx' }
},
{
  path: 'produccion-maestro-de-areas',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Maestro_Areas.aspx' }
},
{
  path: 'produccion-control-variables-pintura',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Tablero_Ctrl_Var_Pint.aspx' }
},
{
  path: 'produccion-division-fechas-produccion',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Produccion/FRM/Programacion_Fechas_Entrega.aspx' }
},

// 🔹 RUTAS EXTERNAS — COMERCIAL
{
  path: 'comercial-cotizaciones-hvac-stock-eyp',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Ofimatica/Frms/Cotizaciones_Laminaire.aspx' }
},
{
  path: 'comercial-copiar-cotizaciones',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Ofimatica/Frms/Copiar_Cotizacion.aspx' }
},
{
  path: 'comercial-convertir-cotizacion-a-pedido',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Ofimatica/Frms/Convertir_Cotizacion.aspx' }
},
{
  path: 'comercial-informe-general-de-cotizaciones',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Ofimatica/Frms/Informe_De_Cotizaciones.aspx' }
},
{
  path: 'comercial-cotizaciones-arquitectonicos',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Cotizaciones_Construccion_V2_1.aspx' }
},
{
  path: 'comercial-maestro-de-modelos-arquitectonicos',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Maestro_Modelos_Arquitect.aspx' }
},
{
  path: 'comercial-informe-cotizaciones-arquitectonicos',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Informe_Cotiz_Arquitectonicos.aspx' }
},
{
  path: 'comercial-cotizaciones-equipart',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Cotizaciones_Equipart.aspx' }
},
{
  path: 'comercial-maestro-marcas-equipart',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Maestro_Marcas_equipart.aspx' }
},
{
  path: 'comercial-informe-cotizaciones-equipart',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Informe_Cotiz_Equipart.aspx' }
},
{
  path: 'comercial-cotizaciones-exportacion',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Cotizaciones_Exportacion.aspx' }
},
{
  path: 'comercial-maestro-de-clientes-exportacion',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Clientes_Exportacion.aspx' }
},
{
  path: 'comercial-copiar-cotizacion-exportacion',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Copiar_Cotiz_Export.aspx' }
},
{
  path: 'comercial-informe-cotizacion-exportacion',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Informe_Cotiz_Exportacion.aspx' }
},
{
  path: 'comercial-convertir-cotizacion-de-exportacion',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Convertir_Cotiz_Export.aspx' }
},
{
  path: 'comercial-pedidos',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Ofimatica/Frms/Pedidos_Nuevo.aspx' }
},
{
  path: 'comercial-control-de-cotizaciones-equipart',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Comercial/FRM/FrmCotizaciones.aspx' }
},
{
  path: 'comercial-calendario-de-seguimiento',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Calendario_Seguimiento.aspx' }
},
{
  path: 'comercial-informe-de-cotizaciones-ingenieria',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Informes_Cotizaciones.aspx' }
},
{
  path: 'comercial-informe-de-cotizaciones-ventas',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Informe_Cotiz_Real.aspx' }
},
{
  path: 'comercial-frecuencia-de-facturac-cotizac',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Informe_Frecuencia_Fac_Cot.aspx' }
},
{
  path: 'comercial-ventas-por-clientes',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Ofimatica/Frms/Ventas_Clientes_Rango_Fechas.aspx' }
},
{
  path: 'comercial-clientes-que-no-compraron',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Ofimatica/Frms/Clientes_No_Compraron.aspx' }
},
{
  path: 'comercial-cantidad-de-pedidos',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Ofimatica/Frms/Pedidos_Mes_UEN.aspx' }
},
{
  path: 'comercial-informe-de-clientes-nuevos',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Ofimatica/Frms/Informe_Clientes_Nuevos.aspx' }
},
{
  path: 'comercial-gestion-de-clientes',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Gestion_Clientes.aspx' }
},
{
  path: 'comercial-pedidos-pendientes',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Pedidos_Pendientes.aspx' }
},
{
  path: 'comercial-criticidad-clientes-sagrilaft',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Matriz_Criticidad.aspx' }
},
{
  path: 'comercial-matriz-criticidad-clientes-oea',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Matriz_Criticidad_OEA.aspx' }
},
{
  path: 'comercial-termometro-de-ventas',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Termometro_Ventas.aspx' }
},
{
  path: 'comercial-maestro-presupuesto-de-ventas',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Presupuesto_Ventas.aspx' }
},
{
  path: 'comercial-campanas-y-post-publicitarios',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Post_Publicitarios.aspx' }
},
{
  path: 'comercial-formato-promotores-de-ventas',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Promotores_Ventas.aspx' }
},
{
  path: 'comercial-control-de-souvenir',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Control_Suvenires.aspx' }
},
{
  path: 'comercial-consulta-documentos-por-usuarios',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Logistica/Frm/Consultar_Documentos_Usuarios.aspx?proceso=COMERCIAL' }
},
{
  path: 'comercial-autorizacion-de-pedidos',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Autorizaciones_Pedidos.aspx' }
},
{
  path: 'comercial-material-mercadeo',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Area_Seleccion_Mercadeo.aspx' }
},
{
  path: 'comercial-control-de-muestras',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Control_Muestras.aspx' }
},
{
  path: 'comercial-generador-de-codigos-pt',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Ofimatica/Frms/Generador_Codigos_PT.aspx' }
},
{
  path: 'comercial-anular-pedidos',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Ofimatica/Frms/AnularPedidos.aspx' }
},
{
  path: 'comercial-sir-enterprise',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/SIR_Enterprise_WEB/' }
},

// 🔹 RUTAS EXTERNAS — INGENIERÍA
{
  path: 'ingenieria-maestro-disenadores',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Maestro_Diseñadores.aspx' }
},
{
  path: 'ingenieria-maestro-de-marcas',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Maestro_Marcas.aspx' }
},
{
  path: 'ingenieria-ingreso-de-cotizaciones',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/S-irWeb/Comercial/FRM/FrmIngresoCot.aspx?Id=0' }
},
{
  path: 'ingenieria-informe-resumen-de-cotizaciones',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Informe_Resumen_Cotiz_Por_Divis.aspx' }
},
{
  path: 'ingenieria-parametros-codigos-pt',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Ofimatica/Frms/Parametros_Codigos_PT.aspx' }
},
{
  path: 'ingenieria-maestro-de-medidas',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Ofimatica/Frms/Maestro_Medidas.aspx' }
},
{
  path: 'ingenieria-vincular-grupos-lineas-pt',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Ofimatica/Frms/Vincular_Grupos_Lineas_Inv.aspx' }
},
{
  path: 'ingenieria-parametros-mp-arquitectonicos',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Ingenieria/FRM/Parametros_MP_Arquitectonicos.aspx' }
},
{
  path: 'ingenieria-proyectos-de-ingenieria',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Proyectos_Ingenieria.aspx' }
},
{
  path: 'ingenieria-liberacion-pedidos-de-ingenieria',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Cambiar_Prioridad_Pedidos.aspx' }
},
{
  path: 'ingenieria-informe-pedidos-ing-liberados',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Comercial/FRM/Informe_Liberacion_Pedidos.aspx' }
},
{
  path: 'ingenieria-informacion-inicial',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Ingenieria/FRM/Informacion_Inicial.aspx' }
},
{
  path: 'ingenieria-proyectos-asignados',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Ingenieria/FRM/Proyectos_Asignados.aspx' }
},
{
  path: 'ingenieria-gestion-de-proyectos',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Ingenieria/FRM/Gestion_Proyectos.aspx' }
},
{
  path: 'ingenieria-metricas-proyectos',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Ingenieria/FRM/Metricas_Proyecto.aspx' }
},
{
  path: 'ingenieria-biblioteca-ingenieria',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Ingenieria/FRM/Biblioteca_Ingenieria.aspx' }
},
{
  path: 'ingenieria-parametros-especiales-referencias',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Ingenieria/FRM/Parametros_Especiales_Referencias.aspx' }
},
{
  path: 'ingenieria-informe-codigos-sin-vigencia',
  loadComponent: () => import('./modules/core/components/external-redirect/external-redirect.component').then(c => c.ExternalRedirectComponent),
  data: { externalUrl: 'https://web.laminaire.net/SirWeb/Ingenieria/FRM/Informe_Codigos_Sin_Vigencia.aspx' }
},


  // 🔹 RUTAS INTERNAS bajo el layout (protegidas)
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: childrenRoutes,
  },

  // fallback
  {
    path: '**',
    redirectTo: 'home',
  },
];
