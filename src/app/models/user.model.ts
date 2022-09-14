export interface UserI {
  code_user: string;
  id_area?: string;
  nit_plants?: string;
  rol: string;
  id_municipality?: string;
  name: string;
  lastname: string;
  typeId: string;
  _id: string;
  phone_number: string;
  address: string;
  date_birth: Date;
  dateIn?: Date;
  dateOut?: Date;
  userName: string;
  email: string;
  password: string;
  arl: string;
  compensation_office: string;
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
