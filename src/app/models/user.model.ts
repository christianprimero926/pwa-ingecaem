export interface UserI {
  codeUser: string;
  id_area?: string;
  nit_plants?: string;
  rol: string;
  municipality?: string;
  name: string;
  lastname: string;
  typeId: string;
  _id: string;
  cellphone: string;
  adress: string;
  date_birth: Date;
  dateIn?: Date;
  dateOut?: Date;
  username: string;
  email: string;
  password: string;
  arl: string;
  compensation_office: string;
  avatar?: string;
  uid: string;
}

export interface RoleI {
  rol_id: string;
  rol_desc: string;
  uid: string;
}

export interface TypeId {
  _id: string;
  desc: string;
}
