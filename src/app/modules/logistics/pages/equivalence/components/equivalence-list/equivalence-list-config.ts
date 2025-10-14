import { TableColumns } from '@app/shared/models/reusables/list-table.interface';
import { GenericButton } from '@app/shared/models/reusables/generic-button.interface';
import { SplitButton } from '@app/shared/models/reusables/split-button.interface';
import { GenericValidators } from '@app/shared/utils/generic-validators.util';
import { SPLIT_BUTTON_ACTIONS } from '@app/shared/utils/global-constants.util';
import { AccessoryEquivalenceResponse } from '../models/equivalence-response.interface';
// Filtros de búsqueda (numFilter)
export enum EquivalenceFilters {
  ByCodigoPT = 1,
  ByCodigoMP = 2,
  ByDescripcion = 3,
}

const tableColumns: TableColumns<AccessoryEquivalenceResponse>[] = [
  {
    label: 'Código PT',
    cssLabel: ['font-bold', 'text-sm', 'text-am-main-blue-dark'],
    property: 'codigoPT',
    cssProperty: ['text-xs', 'font-bold', 'whitespace-normal', 'max-w-120'],
    type: 'text',
    sticky: false,
    sort: true,
    sortProperty: 'codigoPT',
    visible: true,
    download: true,
  },
  {
    label: 'Descripción PT',
    cssLabel: ['font-bold', 'text-sm', 'text-am-main-blue-dark'],
    property: 'descripcionPT',
    cssProperty: ['text-xs', 'whitespace-normal', 'max-w-160'],
    type: 'text',
    sticky: false,
    sort: false,
    sortProperty: '',
    visible: true,
    download: true,
  },
  {
    label: 'Código MP',
    cssLabel: ['font-bold', 'text-sm', 'text-am-main-blue-dark'],
    property: 'codigoMP',
    cssProperty: ['text-xs', 'font-bold', 'whitespace-normal', 'max-w-120'],
    type: 'text',
    sticky: false,
    sort: true,
    sortProperty: 'codigoMP',
    visible: true,
    download: true,
  },
  {
    label: 'Descripción MP',
    cssLabel: ['font-bold', 'text-sm', 'text-am-main-blue-dark'],
    property: 'descripcionMP',
    cssProperty: ['text-xs', 'whitespace-normal', 'max-w-160'],
    type: 'text',
    sticky: false,
    sort: false,
    sortProperty: '',
    visible: true,
    download: true,
  },
  {
    label: 'Costo',
    cssLabel: ['font-bold', 'text-sm', 'text-am-main-blue-dark'],
    property: 'costo',
    cssProperty: ['text-xs', 'font-bold', 'text-right', 'max-w-80'],
    type: 'number',
    sticky: false,
    sort: true,
    sortProperty: 'costo',
    visible: true,
    download: true,
  },
  {
    label: 'Fecha de creación',
    cssLabel: ['font-bold', 'text-sm', 'text-am-main-blue-dark'],
    property: 'fechaCreacion',
    cssProperty: ['text-xs', 'uppercase', 'whitespace-normal', 'max-w-120'],
    type: 'datetime',
    sticky: false,
    sort: true,
    sortProperty: 'fechaCreacion',
    visible: true,
    download: true,
  },
  {
    label: '',
    cssLabel: [],
    property: 'icEdit',
    cssProperty: [],
    type: 'icon',
    sticky: true,
    sort: false,
    sortProperty: '',
    visible: true,
    action: 'edit',
  },
  {
    label: '',
    cssLabel: [],
    property: 'icDelete',
    cssProperty: [],
    type: 'icon',
    sticky: true,
    sort: false,
    sortProperty: '',
    visible: true,
    action: 'delete',
  },
];

const actionButtonEquivalence: GenericButton = {
  label: 'Nueva equivalencia',
  icon: 'add',
  tooltip: 'Crear nueva equivalencia',
};

const searchOptions = [
  {
    label: 'Código PT',
    value: EquivalenceFilters.ByCodigoPT,
    placeholder: 'Buscar por Código PT',
    validation: [GenericValidators.defaultDescription],
    validation_desc: 'Filtra por código de producto terminado.',
    icon: 'search',
  },
  {
    label: 'Código MP',
    value: EquivalenceFilters.ByCodigoMP,
    placeholder: 'Buscar por Código MP',
    validation: [GenericValidators.defaultDescription],
    validation_desc: 'Filtra por código de materia prima.',
    icon: 'category',
  },
  {
    label: 'Descripción',
    value: EquivalenceFilters.ByDescripcion,
    placeholder: 'Buscar por descripción',
    validation: [GenericValidators.defaultDescription],
    validation_desc: 'Filtra por descripción de PT o MP.',
    icon: 'description',
  },
];

const filterButtons: SplitButton[] = [
  {
    type: 'button',
    icon: 'refresh',
    label: 'Actualizar listado',
    value: SPLIT_BUTTON_ACTIONS.ACTUALIZAR_DATOS,
  },
  {
    type: 'action',
    id: 'Refrescar',
    icon: 'restart_alt',
    label: 'Refrescar filtros',
    value: SPLIT_BUTTON_ACTIONS.REFRESCAR_FILTROS,
    classes: {
      icon: 'text-am-main-blue-dark text-md',
    },
  },
];

const initFilters = {
  numFilter: 0,
  textFilter: '',
  startDate: '',
  endDate: '',
  refresh: false,
};

const filters = { ...initFilters };

export const componentEquivalenceSetting = {
  tableColumns,
  actionButtonEquivalence,
  searchOptions,
  filterButtons,
  initFilters,
  filters,
  initialSort: 'Id',
  initialSortDir: 'desc',
  getInputs: '',
  filename: 'lista-equivalencias',
};
