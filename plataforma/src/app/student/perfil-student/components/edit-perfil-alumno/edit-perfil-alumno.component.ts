import { Component, OnInit } from '@angular/core';
import { PerfilAlumnoService } from '../../services/perfil-alumno.service';
import  {DatePipe} from "@angular/common"
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-perfil-alumno',
  templateUrl: './edit-perfil-alumno.component.html',
  styleUrls: ['./edit-perfil-alumno.component.css']
})
export class EditPerfilAlumnoComponent implements OnInit {

  constructor(private perfilAlumnosService:PerfilAlumnoService, private router:Router, private toastrService:ToastrService) { }

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
    delete this.alumnoIndividual[0].idGrado
    delete this.alumnoIndividual[0].nombre_grado
    delete this.alumnoIndividual[0].idSeccion
    delete this.alumnoIndividual[0].seccion
    delete this.alumnoIndividual[0].codigo
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
        this.toastrService.success(`Pefil Actualizado`,'Realizado')
      },
      error=>{
        console.log(error)
        this.toastrService.error(`Perfil no Actualizado`,'Error')
      }
    )
  }

}
