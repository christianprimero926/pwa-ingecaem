import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPagesMenuGen = [
    { title: 'Registro de Horas', url: '/folder/TimeReg', icon: 'calendar' },


  ]


  public appPagesOper = [
    { title: 'Tareas', url: '/folder/Tasks', icon: 'documents' },
  ];
  public appPagesSISO = [
    { title: 'Tareas', url: '/folder/Tasks', icon: 'documents-outline' },
    { title: 'Registro de Horas', url: '/folder/TimeReg', icon: 'calendar-outline' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
