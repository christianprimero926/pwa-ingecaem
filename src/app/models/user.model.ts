export interface UserI {
  name: string;
  email: string;
  uid: string;
  password: string;
  rol: number;
}

export interface RoleI {
  rol_id: number;
  rol_desc: string;
}
