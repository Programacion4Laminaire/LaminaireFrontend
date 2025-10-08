import { MenuFilterTable } from '@app/shared/models/reusables/filter-menu-states.interface';
import { GenericButton } from '@app/shared/models/reusables/generic-button.interface';
import { TableColumns } from '@app/shared/models/reusables/list-table.interface';
import { SplitButton } from '@app/shared/models/reusables/split-button.interface';
import { GenericValidators } from '@app/shared/utils/generic-validators.util';
import { SPLIT_BUTTON_ACTIONS } from '@app/shared/utils/global-constants.util';
import { ConsumptionResponse } from '../../models/consumption-response.interface';
import { ResourceType } from '../../models/consumption-request.interface';

export type TabKey = 'ENERGY' | 'GAS' | 'WATER';

export const tabMeta: Record<TabKey, { label: string; icon: string; unitHint: string }> = {
  ENERGY: { label: 'Energía', icon: 'bolt', unitHint: 'kWh' },
  GAS:    { label: 'Gas',     icon: 'local_fire_department', unitHint: 'm³'  },
  WATER:  { label: 'Agua',    icon: 'water_drop', unitHint: 'm³'  },
};

export const buildColumns = (): TableColumns<ConsumptionResponse>[] => ([
  {
    label: 'Recurso',
    cssLabel: ['font-bold','text-sm','text-am-main-blue-dark'],
    property: 'resourceType',
    cssProperty: ['text-xs','font-bold','whitespace-normal','max-w-120'],
    type: 'text',
    sticky: false, sort: true, sortProperty: 'resourceType', visible: true, download: true,
  },
   {
  label: 'Sede',
  cssLabel: ['font-bold','text-sm','text-am-main-blue-dark'],
  property: 'sede',
  cssProperty: ['text-xs','font-bold','whitespace-normal','max-w-120'],
  type: 'text',
  sticky: false, sort: true, sortProperty: 'sede', visible: true, download: true,
},
  {
    label: 'Lectura',
    cssLabel: ['font-bold','text-sm','text-am-main-blue-dark'],
    property: 'value',
    cssProperty: ['text-xs','font-bold'],
    type: 'text', sticky: false, sort: true, sortProperty: 'value', visible: true, download: true,
  },
  {
  label: 'Consumo Diario',
  cssLabel: ['font-bold','text-sm','text-am-main-blue-dark'],
  property: 'dailyConsumption',
  cssProperty: ['text-xs','font-bold'],
  type: 'text',sticky: false, sort: true, visible: true, download: true,
},

  {
    label: 'Unidad',
    cssLabel: ['font-bold','text-sm','text-am-main-blue-dark'],
    property: 'unit',
    cssProperty: ['text-xs','font-bold'],
    type: 'text', sticky: false, sort: true, sortProperty: 'unit', visible: true, download: true,
  },
  {
    label: 'Fecha lectura',
    cssLabel: ['font-bold','text-sm','text-am-main-blue-dark'],
    property: 'readingDate',
    cssProperty: ['text-xs','uppercase','font-bold','whitespace-normal','max-w-120'],
    type: 'date', sticky: false, sort: true, sortProperty: 'readingDate', visible: true, download: true,
  },
  {
    label: 'Notas',
    cssLabel: ['font-bold','text-sm','text-am-main-blue-dark'],
    property: 'note',
    cssProperty: ['text-xs','whitespace-normal','max-w-160'],
    type: 'text', sticky: false, sort: false, visible: true, download: true,
  },
 

  {
    label: 'Creado',
    cssLabel: ['font-bold','text-sm','text-am-main-blue-dark'],
    property: 'auditCreateDate',
    cssProperty: ['text-xs','uppercase','font-bold','whitespace-normal','max-w-120'],
    type: 'datetime', sticky: false, sort: true, sortProperty: 'auditCreateDate', visible: true, download: true,
  },
  /*{ label: '', cssLabel: [], property: 'icEdit',   cssProperty: [], type: 'icon', sticky: true, sort: false, visible: true, action: 'edit'   },*/
  { label: '', cssLabel: [], property: 'icDelete', cssProperty: [], type: 'icon', sticky: true, sort: false, visible: true, action: 'delete' },
]);

export const actionButton: GenericButton = {
  label: 'Registrar consumo',
  icon: 'add',
  tooltip: 'Crear nuevo registro de consumo',
};

// Solo texto (busca en Note)
export const searchOptions = [
  {
    label: 'Notas',
    value: 1,
    placeholder: 'Buscar en notas…',
    validation: [GenericValidators.defaultDescription],
    validation_desc: 'Búsqueda por coincidencia',
    icon: 'tune',
  },
];

export const filterButtons: SplitButton[] = [
  { type: 'button', icon: 'refresh', label: 'Limpiar Fechas', value: SPLIT_BUTTON_ACTIONS.REFRESCAR_FILTROS },
  { type: 'action', id: 'resetFilters',  icon: 'restart_alt', label: 'Actualizar Listado', value: SPLIT_BUTTON_ACTIONS.ACTUALIZAR_DATOS,
    classes: { icon: 'text-am-main-blue-dark text-md' } },

];
export const initFilters = {
  resourceType: 'ENERGY' as ResourceType,
  numFilter: 0,
  textFilter: '',
  startDate: '',   // si quieres seguir filtrando por auditoría
  endDate: '',
  refresh: false,
};

export const filters = { ...initFilters };

export const componentConsumptionSetting = {
  tableColumns: buildColumns(),
  actionButton,
  searchOptions,
  // menuItems eliminado (ya no hay estado)
  filterButtons,
  initFilters,
  filters,
  initialSort: 'readingDate',
  initalSortDir: 'desc',
  getInputs: '',
  // filename: 'lista-de-consumos',
};
