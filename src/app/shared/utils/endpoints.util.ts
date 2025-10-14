export const endpoint = {
  LOGIN: 'Auth/Login',

  MENU_BY_USER: 'Menu/MenuByUser',

  LIST_USERS: 'User',
  USER_SELECT: 'User/Select',
  USER_BY_ID: 'User/',
  USER_CREATE: 'User/Create',
  USER_CREATE_WITH_IMAGE: 'User/CreateWithImage',
  USER_UPDATE_WITH_IMAGE: 'User/UpdateWithImage', 
  USER_UPDATE: 'User/Update',
  USER_DELETE: 'User/Delete/',

  LIST_ROLES: 'Role',
  ROLE_SELECT: 'Role/Select',
  ROLE_BY_ID: 'Role/',
  ROLE_CREATE: 'Role/Create',
  ROLE_UPDATE: 'Role/Update',
  ROLE_DELETE: 'Role/Delete/',
  PERMISSION_BY_ROLE_ID: "Permission/PermissionByRoleId/",
  USER_WITH_ROLE_AND_PERMISSIONS: 'User/UserWithRoleAndPermissions/',

  LIST_USER_ROLE: 'UserRole',
  USER_ROLE_BY_ID: 'UserRole/',
  USER_ROLE_CREATE: 'UserRole/Create',
  USER_ROLE_UPDATE: 'UserRole/Update',
  USER_ROLE_DELETE: 'UserRole/Delete/',


LIST_CONSUMPTIONS: 'Consumption',
CONSUMPTION_BY_ID: 'Consumption/',
CONSUMPTION_CREATE: 'Consumption/Create',
CONSUMPTION_UPDATE: 'Consumption/Update',
CONSUMPTION_DELETE: 'Consumption/Delete/',

ACCESSORY_EQUIVALENCE: 'AccessoryEquivalence',
  LIST_ACCESSORY_EQUIVALENCE: 'AccessoryEquivalence',

  // CRUD
  ACCESSORY_EQUIVALENCE_BY_ID: 'AccessoryEquivalence/',
  ACCESSORY_EQUIVALENCE_CREATE: 'AccessoryEquivalence/Create',
  ACCESSORY_EQUIVALENCE_UPDATE: 'AccessoryEquivalence/Update',
  ACCESSORY_EQUIVALENCE_DELETE: 'AccessoryEquivalence/Delete/',

  // Utilidad: traer descripción desde MTMERCIA por código
  ACCESSORY_EQUIVALENCE_DESCRIPCION: 'AccessoryEquivalence/Descripcion/',
   ACCESSORY_EQUIVALENCE_SELECT: 'AccessoryEquivalence/Select',
};

// endpoints.util.ts
export const legacyEndpoint = {
  UPDATE_SIR_CREDENTIALS: 'ActualizarPasswordSirOfima', 
};
