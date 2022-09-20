import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../services/firestore.service';
import * as Datatable from '../../../constants/datatable.constants';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { TABLE_STYLE_BOOTSTRAP } from '../../../constants/generic.constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  tableStyle = TABLE_STYLE_BOOTSTRAP;
  activities = [];
  dataTable = Datatable;
  ColumnMode = ColumnMode;

  constructor(private firestoreService: FirestoreService,) { }

  ngOnInit() {
  }

  getListOfActivities() {
    return this.firestoreService.getCollection('acti').subscribe(res => {
      let activity = [];
      res.forEach(value => {
        activity.push({ "rolId": value })
      });
      this.activities = activity;
    })
  }

}
