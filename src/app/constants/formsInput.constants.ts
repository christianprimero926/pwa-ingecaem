import { UserI, RoleI } from '../models/user.model';

export let
  dataUserIn: UserI = {
    name: '',
    lastname: '',
    phone_number: '',
    address: '',
    date_birth: new Date,
    typeId: '',
    _id: '',
    department: '',
    municipality: '',
    arl: '',
    compensation_office: '',
    code_user: '',
    userName: '',
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
