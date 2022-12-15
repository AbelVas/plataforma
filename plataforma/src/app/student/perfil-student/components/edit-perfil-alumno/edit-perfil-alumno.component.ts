import { Component, OnInit } from '@angular/core';
import { PerfilAlumnoService } from '../../services/perfil-alumno.service';
import  {DatePipe} from "@angular/common"
import { Router } from "@angular/router";

@Component({
  selector: 'app-edit-perfil-alumno',
  templateUrl: './edit-perfil-alumno.component.html',
  styleUrls: ['./edit-perfil-alumno.component.css']
})
export class EditPerfilAlumnoComponent implements OnInit {

  constructor(private perfilAlumnosService:PerfilAlumnoService, private router:Router) { }

  classBadgeActive:any;
  estado:any;
  alumnoIndividual:any=[{
  }];

  ngOnInit(): void {
    this.perfilAlumnosService.disparadorCopiarData.subscribe(data=>{
      this.alumnoIndividual=Object.values(data);
      if(this.alumnoIndividual[0].activo==1){
        this.classBadgeActive='badge bg-success';
        this.estado="Activo"
      }else{
        this.classBadgeActive='badge bg-danger';
        this.estado="Inactivo"
      }
      this.alumnoIndividual[0];
    });
  }

  insertAlumno(idAlumno:string){
    this.perfilAlumnosService.updateAlumno(this.alumnoIndividual[0],idAlumno).subscribe(
      response=>{
        this.router.navigate(['/student/perfil']);
        if(this.alumnoIndividual[0].activo==1){
          this.classBadgeActive='badge bg-success';
          this.estado="Activo"
        }else{
          this.classBadgeActive='badge bg-danger';
          this.estado="Inactivo"
        }
      },
      error=>{
        console.log(error)
      }
    )
  }

}
