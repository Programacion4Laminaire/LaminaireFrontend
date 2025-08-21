export interface UserCreateRequest {
  identification: string;
  userName:string;
  birthDate:string;
  firstName:string;
  lastName: string;
  email:string;
  password:string;
  state: number;
}

export interface UserUpdateRequest {
  userId: number;
  identification: string;
  userName:string;
  birthDate:string;
  firstName:string;
  lastName: string;
  email:string;
  password:string;
  state: number;
}
