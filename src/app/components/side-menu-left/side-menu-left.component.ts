import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-menu-left',
  templateUrl: './side-menu-left.component.html',
  styleUrls: ['./side-menu-left.component.scss'],
})
export class SideMenuLeftComponent implements OnInit {
  @Input() uid: string;

  constructor() { }

  ngOnInit() {}

}
