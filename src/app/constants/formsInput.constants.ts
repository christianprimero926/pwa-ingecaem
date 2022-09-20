import { UserI, RoleI } from '../models/user.model';

export let
  dataUserIn: UserI = {
    name: '',
    lastname: '',
    cellphone: '',
    adress: '',
    date_birth: new Date,
    typeId: '',
    _id: '',
    municipality: '',
    arl: '',
    compensation_office: '',
    codeUser: '',
    username: '',
    rol: '',
    dateIn: new Date(),
    email: '',
    password: '',
    uid: '',
  },
  dataRolIn: RoleI = {
    rol_id: '',
    rol_desc: '',
    uid: ''
  };
