import { MenuFilterTable } from '@app/shared/models/reusables/filter-menu-states.interface';
import { GenericButton } from '@app/shared/models/reusables/generic-button.interface';
import { TableColumns } from '@app/shared/models/reusables/list-table.interface';
import { SplitButton } from '@app/shared/models/reusables/split-button.interface';
import { GenericValidators } from '@app/shared/utils/generic-validators.util';
import {
    RoleFilters,
    SPLIT_BUTTON_ACTIONS,
    STATUS
} from '@app/shared/utils/global-constants.util';
import { RoleResponse } from '../models/role-response.interface';

const tableColumns: TableColumns<RoleResponse>[] = [

  {
    label: 'Rol',
    cssLabel: ['font-bold', 'text-sm', 'text-am-main-blue-dark'],
    property: 'name',
    cssProperty: ['text-xs', 'font-bold', 'whitespace-normal', 'max-w-120'],
    type: 'text',
    sticky: false,
    sort: true,
    sortProperty: 'name',
    visible: true,
    download: true,
  },
  {
    label: 'Información',
    cssLabel: ['font-bold', 'text-sm', 'text-am-main-blue-dark'],
    property: 'description',
    cssProperty: ['text-xs', 'font-bold', 'whitespace-normal', 'max-w-120'],
    type: 'text',
    sticky: false,
    sort: true,
    sortProperty: 'description',
    visible: true,
    download: true,
  },
  {
    label: 'Fecha de creación',
    cssLabel: ['font-bold', 'text-sm', 'text-am-main-blue-dark'],
    property: 'auditCreateDate',
    cssProperty: [
      'text-xs',
      'uppercase',
      'font-bold',
      'whitespace-normal',
      'max-w-120',
    ],
    type: 'datetime',
    sticky: false,
    sort: true,
    visible: true,
    download: true,
  },
  {
    label: 'Estado',
    cssLabel: [
      'font-bold',
      'text-sm',
      'text-am-main-blue-dark',
      'mat-sort-header-text-center',
    ],
    property: 'stateDescription',
    cssProperty: [],
    type: 'simpleBadge',
    sticky: false,
    sort: false,
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

const actionButtonRole: GenericButton = {
  label: 'Crear rol',
  icon: 'add',
  tooltip: 'Crear nuevo rol',
};

const searchOptions = [
  {
    label: 'Rol',
    value: RoleFilters.ByName,
    placeholder: 'Buscar por rol',
    validation: [GenericValidators.defaultDescription],
    validation_desc: 'Permite búsqueda por las primeras tres letras.',
    icon: 'tune',
  },
  {
    label: 'Información',
    value: RoleFilters.ByDescription,
    placeholder: 'Buscar por información',
    validation: [GenericValidators.defaultDescription],
    validation_desc: 'Permite búsqueda por las primeras tres letras.',
    icon: 'tune',
  },
];

const menuItems: MenuFilterTable = {
  label: 'Estados',
  icon: 'filter_list',
  tooltip: 'Estados',
  menuItems: [
    {
      label: 'Enabled',
      icon: 'label',
      cssIcon: ['text-am-main-custom4-dark'],
      value: STATUS.ENABLED,
    },
    {
      label: 'Disabled',
      icon: 'label',
      cssIcon: ['text-am-gray-light'],
      value: STATUS.DISABLED,
    },
  ],
};

const filterButtons: SplitButton[] = [
  {
    type: 'button',
    icon: 'refresh',
    label: 'Actualizar listado',
    value: SPLIT_BUTTON_ACTIONS.ACTUALIZAR_DATOS,
  },
  {
    type: 'action',
    id: 'Pendiente',
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
  stateFilter: STATUS.ENABLED + '-' + STATUS.DISABLED,
  startDate: '',
  endDate: '',
  refresh: false,
};

const filters = {
  numFilter: 0,
  textFilter: '',
  stateFilter: STATUS.ENABLED + '-' + STATUS.DISABLED,
  startDate: '',
  endDate: '',
  refresh: false,
};

export const componentRoleSetting = {
  tableColumns,
  actionButtonRole,
  searchOptions,
  menuItems,
  filterButtons,
  initFilters,
  filters,
  initialSort: 'Id',
  initalSortDir: 'desc',
  getInputs: '',
  filename: 'lista-de-roles',
};
