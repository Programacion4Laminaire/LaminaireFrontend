export interface UserRoleResponse {
  userRoleId: number;
  userName: string;
  user: string;
  role: string;
  state: string;
  stateDescription: any;
  auditCreateDate: string;
  icEdit: string;
  icDelete: string;
}

export interface UserRoleByIdResponse {
  userRoleId: number;
  userId: number;
  roleId: number;
  state: string;
}
