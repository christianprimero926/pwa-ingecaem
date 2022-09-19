import { Component, OnInit } from '@angular/core';
import { RoleI, UserI } from '../../../../models/user.model';
import { ROLES_COLLECTION, USER_COLLECTION } from '../../../../constants/collections.constants';
import * as ConstantsForms from '../../../../constants/forms.constants';
import * as Datatable from '../../../../constants/datatable.constants';
import * as Constants from '../../../../constants/interactions.constants';
import { InteractionsService } from '../../../../services/Interactions.service';
import { FirestoreService } from '../../../../services/firestore.service';
import { AuthService } from '../../../../services/auth.service';
import { TABLE_STYLE_BOOTSTRAP } from '../../../../constants/generic.constants';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { listTypeId } from '../../../../constants/catalogs.constants';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../../services/User.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  tableStyle = TABLE_STYLE_BOOTSTRAP;
  InputForms = ConstantsForms;
  dataTable = Datatable;
  ColumnMode = ColumnMode;
  catalogTypeId = listTypeId;
  roles = [];
  users = [];
  showPicker = false;
  phoneRegEx = "3[0-9]{2}[-][0-9]{7}";
  paswordRegEx = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,10}$";
  userCodeRegEx = "^(?=.[0-9]).{4}$"
  createUserForm: FormGroup;
  newUsername = '';
  automaticPassword = '';

  customAlertOptions = {
    header: 'Pizza Toppings',
    subHeader: 'Select your favorite topping',
    message: 'Choose only one',
    translucent: true,
  };

  constructor(
    private firestoreService: FirestoreService,
    private interaction: InteractionsService,
    private authService: AuthService,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) { }

  loadUsers() {

  }

  generatePass() {
    this.automaticPassword = this.userService.generatePassword();
    this.createUserForm.patchValue({
      password: this.automaticPassword
    });
    return this.automaticPassword;
  }

  ngOnInit() {
    this.createUserForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      cellphone: ['', [Validators.required, Validators.pattern(this.phoneRegEx)]],
      adress: ['', [Validators.required]],
      date_birth: ['', [Validators.required]],
      typeId: ['', [Validators.required]],
      _id: ['', [Validators.required]],
      municipality: [''],
      arl: [''],
      compensation_office: [''],
      codeUser: ['', [Validators.required, Validators.pattern(this.userCodeRegEx)]],
      username: ['', [Validators.required]],
      rol: ['', [Validators.required]],
      dateIn: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(this.paswordRegEx)]],
      avatar: [''],
      id_area: [''],
      nit_plants: [''],
      dateOut: [''],
      uid: ['']
    });
    this.getListOfRoles();
    this.generatePass();
  }

  async createNewUser() {
    await this.interaction.showLoading(Constants.LOADING_SAVE);
    this.authService.register(this.createUserForm.value).then(res => {
      this.interaction.dismissLoading();
      this.interaction.successToast(Constants.SUCCESSFULL_SAVE);
    });
  }

  getListOfUsers() {
    return this.firestoreService.getCollection<UserI>(USER_COLLECTION).subscribe(res => {
      let user = [];
      res.forEach(value => {
        user.push({
          "codeUser": value.codeUser,
          "rol": value.rol,
          "name": value.name,
          "lastname": value.lastname,
          "typeId": value.typeId,
          "idUser": value._id,
          "phoneNumber": value.phone_number,
          "address": value.address,
          "dateBirth": value.date_birth,
          "dateIn": value.dateIn,
          "userName": value.userName,
          "email": value.email,
          "password": value.password,
          "arl": value.arl,
          "compensationOffice": value.compensation_office,
          "uid": value.uid
        })
      });
      this.users = user;
    })

  }

  getListOfRoles() {
    this.firestoreService.getCollection<RoleI>(ROLES_COLLECTION).subscribe(res => {
      this.roles = res;
    })
  }

  validateField(field, type) {
    let message = '';
    switch (type) {
      case "blank":
        message = "El campo " + field.toLowerCase() + " no puede estar vacio.";
        break;
      case "invalid":
        message = "Ingresa un " + field.toLowerCase() + " válido.";
        break;
      case "phone":
        message = "Por favor, introduzca un " + field.toLowerCase() + " de 10 dígitos.";
        break;
      default:
        break;
    }
    return message;
  }

  createUserName(name, lastname) {
    this.newUsername = name.charAt(0).toLowerCase() + lastname.substring(0, lastname.indexOf(" ")).toLowerCase();
    this.createUserForm.patchValue({
      username: this.newUsername,
      email: this.newUsername + "@gmail.com"
    });
    return;
  }

  get name() {
    return this.createUserForm.get('name');
  }

  get lastname() {
    return this.createUserForm.get('lastname');
  }

  get cellphone() {
    return this.createUserForm.get('cellphone');
  }

  get adress() {
    return this.createUserForm.get('adress');
  }

  get date_birth() {
    return this.createUserForm.get('date_birth');
  }

  get typeId() {
    return this.createUserForm.get('typeId');
  }

  get _id() {
    return this.createUserForm.get('_id');
  }

  get codeUser() {
    return this.createUserForm.get('codeUser');
  }

  get username() {
    return this.createUserForm.get('username');
  }

  get rol() {
    return this.createUserForm.get('rol');
  }

  get dateIn() {
    return this.createUserForm.get('dateIn');
  }

  get email() {
    return this.createUserForm.get('email');
  }

  get password() {
    return this.createUserForm.get('password');
  }

}
