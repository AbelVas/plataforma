import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-archivos-perfil-profesor',
  templateUrl: './archivos-perfil-profesor.component.html',
  styleUrls: ['./archivos-perfil-profesor.component.css']
})
export class ArchivosPerfilProfesorComponent implements OnInit {
  antecedentesPenales:any
  antecedentesPoliciacos:any
  RENAS:any

  //subir archivos dependencias plugin
  constructor() {


  }

  ngOnInit(): void {
  }

  renasUpload(){


  }

  penalesUpload(){

  }

  policialesUpload(){

  }
}
