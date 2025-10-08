import { MenuFilterTable } from '@app/shared/models/reusables/filter-menu-states.interface';
import { GenericButton } from '@app/shared/models/reusables/generic-button.interface';
import { TableColumns } from '@app/shared/models/reusables/list-table.interface';
import { SplitButton } from '@app/shared/models/reusables/split-button.interface';
import { GenericValidators } from '@app/shared/utils/generic-validators.util';
import {
  SPLIT_BUTTON_ACTIONS,
  STATUS,
  UsersFilters,
} from '@app/shared/utils/global-constants.util';
import { UserResponse } from '../../models/user-response.interface';

const tableColumns: TableColumns<UserResponse>[] = [
{
    label: 'Identificacion',
    cssLabel: ['font-bold', 'text-sm', 'text-am-main-blue-dark'],
    property: 'identification',
    cssProperty: ['text-xs', 'font-bold', 'whitespace-normal', 'max-w-120'],
    type: 'text',
    sticky: false,
    sort: true,
    sortProperty: 'identification',
    visible: true,
    download: true,
  },
  {
    label: 'Nombre',
    cssLabel: ['font-bold', 'text-sm', 'text-am-main-blue-dark'],
    property: 'fullName',
    cssProperty: ['text-xs', 'font-bold', 'whitespace-normal', 'max-w-120'],
    type: 'text',
    sticky: false,
    sort: true,
    sortProperty: 'firstname',
    visible: true,
    download: true,
  },
  {
    label: 'Fecha de nacimiento',
    cssLabel: ['font-bold', 'text-sm', 'text-am-main-blue-dark'],
    property: 'birthDate',
    cssProperty: [
      'text-xs',
      'uppercase',
      'font-bold',
      'whitespace-normal',
      'max-w-120',
    ],
    type: 'date',
    
    sticky: false,
    sort: true,
    visible: true,
    download: true,
  },
   // → Nueva columna UserName
  {
    label: 'Usuario',
    cssLabel: ['font-bold', 'text-sm', 'text-am-main-blue-dark'],
    property: 'userName',
    cssProperty: ['text-xs', 'font-bold', 'whitespace-normal', 'max-w-120'],
    type: 'text',
    sticky: false,
    sort: true,
    sortProperty: 'userName',
    visible: true,
    download: true,
  },
  {
    label: 'Email',
    cssLabel: ['font-bold', 'text-sm', 'text-am-main-blue-dark'],
    property: 'email',
    cssProperty: ['text-xs', 'font-bold', 'whitespace-normal', 'max-w-120'],
    type: 'text',
    sticky: false,
    sort: true,
    sortProperty: 'email',
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
    label: 'Estado', // COLUMNA DE MI TABLA USUARIOS
    cssLabel: ['font-bold', 'text-sm', 'text-am-main-blue-dark'],
    property: 'stateDescription',
    cssProperty: ['text-xs', 'font-bold', 'whitespace-normal', 'max-w-120'],
    type: 'simpleBadge',
    sticky: false,
    sort: true,
    sortProperty: 'state',
    visible: true,
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

const actionButtonUser: GenericButton = {
  label: 'Crear usuario',
  icon: 'add',
  tooltip: 'Crear nuevo usuario',
};

const searchOptions = [
  {
    label: 'Nombre completo',
    value: UsersFilters.ByFullName,  // 👈 1
    placeholder: 'Buscar por nombre completo',
    validation: [GenericValidators.defaultDescription],
    validation_desc: 'Busca por nombre y apellido.',
    icon: 'person_search',
  },
  {
    label: 'Identificación',
    value: UsersFilters.ByIdentification, // 👈 2
    placeholder: 'Buscar por identificación',
    validation: [GenericValidators.defaultDescription],
    validation_desc: 'Busca por número de identificación.',
    icon: 'badge',
  },
  {
    label: 'Usuario',
    value: UsersFilters.ByUsername, // 👈 3 nuevo
    placeholder: 'Buscar por nombre de usuario',
    validation: [GenericValidators.defaultDescription],
    validation_desc: 'Busca por username.',
    icon: 'account_circle',
  },
];


const menuItems: MenuFilterTable = {
  label: 'Estados',
  icon: 'filter_list',
  tooltip: 'Estados',
  menuItems: [
    {
      label: 'Activo',
      icon: 'label',
      cssIcon: ['text-am-main-custom4-dark'],
      value: STATUS.ENABLED,
    },
    {
      label: 'Inactivo',
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

export const componentUserSetting = {
  tableColumns,
  actionButtonUser,
  searchOptions,
  menuItems,
  filterButtons,
  initFilters,
  filters,
  initialSort: 'Id',
  initalSortDir: 'desc',
  getInputs: '',
  filename: 'lista-de-usuarios',
};
