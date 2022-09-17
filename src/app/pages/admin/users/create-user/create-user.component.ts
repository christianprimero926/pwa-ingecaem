import { Component, OnInit } from '@angular/core';
import { RoleI, UserI } from '../../../../models/user.model';
import { ROLES_COLLECTION, USER_COLLECTION } from '../../../../constants/collections.constants';
import * as ConstantsForms from '../../../../constants/forms.constants';
import * as Datatable from '../../../../constants/datatable.constants';
import * as Constants from '../../../../constants/interactions.constants';
import { InteractionsService } from '../../../../services/Interactions.service';
import { dataUserIn } from '../../../../constants/formsInput.constants';
import { FirestoreService } from '../../../../services/firestore.service';
import { AuthService } from '../../../../services/auth.service';
import { TABLE_STYLE_BOOTSTRAP } from '../../../../constants/generic.constants';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { listTypeId } from '../../../../constants/catalogs.constants';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

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
  dataIn = dataUserIn;
  catalogTypeId = listTypeId;
  roles = [];
  users = [];
  showPicker = false;
  createUserForm: FormGroup;
  emailRegex = `([a-zA-Z0-9_.]{1}[a-zA-Z0-9_.]*)((@[a-zA-Z]{2}[a-zA-Z]*)[\\\.]([a-zA-Z]{2}|[a-zA-Z]{3}))`;
  username = '';

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
    private formBuilder : FormBuilder
  ) {}

  // setToday() {
  //   this.formattedString = format(parseISO(format(new Date(), 'yyyy-MM-dd')), 'MMM d, yyyy');
  // }

  // dateChanged(value) {
  //   this.dateValue = value;
  //   this.formattedString = format(parseISO(value), 'MMM d, yyyy');
  //   this.showPicker = false;
  // }

  loadUsers() {

  }

  ngOnInit() {
    this.dataIn.userName = this.dataIn.name.charAt(0).toLowerCase() +
                          this.dataIn.lastname
                          .substring(0, this.dataIn.lastname.indexOf(" "))
                          .toLowerCase();
    this.getListOfRoles();
    this.createUserForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
			password: ['', Validators.required]
    });
  }

  createNewUser() {
    console.log(this.dataIn);
    return;
    this.authService.register(this.dataIn).then(res => {
      const id = this.firestoreService.generateId();
      this.interaction.showLoading(Constants.LOADING_SAVE);
      this.firestoreService.createDoc(this.dataIn, USER_COLLECTION, id).then(() => {
        this.interaction.dismissLoading();
        this.interaction.successToast(Constants.SUCCESSFULL_SAVE);
      });
    });

    // this.firestoreService.getCollection<UserI>(USER_COLLECTION).pipe(take(1)).subscribe(res => {
    //   const id = this.firestoreService.generateId();
    //   this.interaction.showLoading(Constants.LOADING_SAVE);
    //   this.firestoreService.createDoc(this.dataIn, USER_COLLECTION, id).then(() => {
    //     this.interaction.dismissLoading();
    //     this.interaction.presentToast(Constants.SUCCESSFULL_SAVE);
    //   });
    // });
  }

  getListOfUsers() {
    return this.firestoreService.getCollection<UserI>(USER_COLLECTION).subscribe(res => {
      let user = [];
      res.forEach(value => {
        user.push({
          "codeUser": value.code_user,
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



}
