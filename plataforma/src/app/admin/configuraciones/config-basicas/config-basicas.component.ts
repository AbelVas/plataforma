import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-config-basicas',
  templateUrl: './config-basicas.component.html',
  styleUrls: ['./config-basicas.component.css']
})
export class ConfigBasicasComponent implements OnInit {
  classAlerta:string=''
  mensajeAlerta:string=''
  icon=''
  intervalo:any
  @ViewChild('CerrarAlerta') closeAlert: any;
  constructor() { }

  ngOnInit(): void {
  }
  getAlertaPropiedades(e:any){
    this.classAlerta=e.classAlerta
    this.mensajeAlerta=e.mensajeAlerta
    this.icon=e.icon
    this.cerrarAlerta()
  }
  cerrarAlerta(){
    this.intervalo=setInterval(() => {//
      this.closeAlert.nativeElement.click();
      this.classAlerta='toast hide'
    }, 5000);
  }
}
