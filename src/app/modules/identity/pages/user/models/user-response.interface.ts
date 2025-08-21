export interface UserResponse {
  userId: number;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  userName: string;
  identification: string;
  birthDate: string;             // formato ISO (ej: "1991-05-05T00:00:00")
  profileImagePath: string;      // ruta a la imagen (para mostrar en tabla)
  state: string;
  stateDescription: any;
  auditCreateDate: string;
  icEdit: string;
  icDelete: string;

    avatar?: {
    text: string;
    image: string;
  };

}

export interface UserByIdResponse {
  userId: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  identification: string;
  birthDate: string;             // formato ISO (ej: "1991-05-05")
  profileImagePath: string;      // ruta para previsualizar imagen
  state: string;
}

