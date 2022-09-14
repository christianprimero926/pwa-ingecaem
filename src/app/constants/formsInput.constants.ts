import { UserI, RoleI } from '../models/user.model';

export let
  dataUserIn: UserI = {
    code_user: '',
    rol: '',
    name: '',
    lastname: '',
    typeId: '',
    _id: '',
    phone_number: '',
    address: '',
    date_birth: new Date,
    dateIn: new Date(),
    userName: '',
    email: '',
    password: '',
    arl: '',
    compensation_office: '',
    uid: '',
  },
  dataRolIn: RoleI = {
    rol_id: '',
    rol_desc: '',
    uid: ''
  };
