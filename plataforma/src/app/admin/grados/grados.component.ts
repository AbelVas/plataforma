import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-grados',
  templateUrl: './grados.component.html',
  styleUrls: ['./grados.component.css']
})
export class GradosComponent implements OnInit {
  idGrado:string=''
  rutaParaVerElRetorno:any='';
  constructor(private activedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    const params=this.activedRoute.snapshot.params;
    if(params['data']!=null){
      this.rutaParaVerElRetorno=params['data']
    }
  }
}
