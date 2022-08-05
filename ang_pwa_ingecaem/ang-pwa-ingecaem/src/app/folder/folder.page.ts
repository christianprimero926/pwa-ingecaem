import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  public name: string;

  constructor(
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.folder = this.route.snapshot.paramMap.get('id') === 'Tasks' ? 'Tareas' : '' ;
    console.log(this.route.snapshot.paramMap.get('id') === 'Tasks' ? 'Tareas' : '' );
    // this.route.queryParams.subscribe(params => {
    //   this.name = params['name'];
    // });
    // console.log(this.route.queryParams);


  }

}
