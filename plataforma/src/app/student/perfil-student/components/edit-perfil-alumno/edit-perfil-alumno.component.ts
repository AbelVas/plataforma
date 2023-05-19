import { Component, OnInit } from '@angular/core';
import { PerfilAlumnoService } from '../../../services/perfil-alumno.service';
import  {DatePipe} from "@angular/common"
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-perfil-alumno',
  templateUrl: './edit-perfil-alumno.component.html',
  styleUrls: ['./edit-perfil-alumno.component.css']
})
export class EditPerfilAlumnoComponent implements OnInit {

  constructor(private perfilAlumnosService:PerfilAlumnoService, private router:Router, private toastrService:ToastrService, private formBuilder:FormBuilder) { }
  submitted=false;
  classBadgeActive:any;
  estado:any;
  alumnoIndividual:any=[{
  }];

      //Formulario editar Alumno
      EditarAlumnoForm=this.formBuilder.group({
        nombres_alumno:new FormControl('',[Validators.required]),
        apellidos_alumno:new FormControl('',[Validators.required]),
        usuario:new FormControl('',[Validators.required]),
      })

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
  //esto es para validar que un campo no se vaya vacio si es importante
  get f() { return this.EditarAlumnoForm.controls; }

  insertAlumno(idAlumno:string){
    this.submitted=true;
    if (this.EditarAlumnoForm.invalid) {
      this.toastrService.error(`Falta información`,'Error')
      return;
    }
    this.perfilAlumnosService.updateAlumno(this.EditarAlumnoForm.value,idAlumno).subscribe(
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
