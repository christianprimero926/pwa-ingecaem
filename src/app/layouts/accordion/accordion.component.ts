import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent implements OnInit {
  @Input() item: any;
  public itemChecked;
  // @Input()

  options = [
    {
      id: '2.1.1',
      title: 'Activado',
      radio: true,
    },
    {
      id: '2.1.2',
      title: 'Desactivado',
      radio: true,
    },
    {
      id: '2.1.3',
      title: 'Automatico',
      radio: true,
      alias: 'automatic_dark_theme',
    }
  ];

  constructor() {
    // this.itemChecked = '2.1.3';
    // console.log(this.itemChecked);
   }

  ngOnInit() {}

  selectEvent(alias) {
    console.log('hola');
    switch (alias) {
      case 'logout':
        // this.logout();
        break;
      case 'automatic_dark_theme':
        // this.toggleTheme(event);
        console.log('hola');
        break;
      default:
        break;
    }
  }

}
