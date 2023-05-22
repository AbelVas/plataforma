import { Component, OnInit } from '@angular/core';
import { PerfilTutorService } from '../../../service/perfil-tutor.service';
import  {DatePipe} from "@angular/common"
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-perfil-tutor',
  templateUrl: './edit-perfil-tutor.component.html',
  styleUrls: ['./edit-perfil-tutor.component.css']
})
export class EditPerfilTutorComponent implements OnInit {

  constructor( private perfilTutoresService:PerfilTutorService, private router:Router, private toastrService:ToastrService,private formBuilder:FormBuilder ) { }
  submitted = false;
  pipe = new DatePipe('en-US');
  classBadgeActive:any;
  estado:any;
  tutorIndividual:any=[{
  }];

  EditarTutorForm=this.formBuilder.group({
    nombre_tutor:new FormControl('',[Validators.required]),
    apellido_tutor:new FormControl('',[Validators.required]),
    usuario:new FormControl('',[Validators.required]),
    telefono1:new FormControl('',[Validators.required]),
    telefono2:new FormControl(''),
    telefono_casa:new FormControl('',[Validators.required]),
    direccion:new FormControl('',[Validators.required]),
    fecha_nacimiento:new FormControl('',[Validators.required]),
    correo1:new FormControl('',[Validators.required]),
    correo2:new FormControl(''),
  })


  ngOnInit(): void {
    this.perfilTutoresService.disparadorCopiarData.subscribe(data=>{
      this.tutorIndividual=Object.values(data);
      const fecha_nacimiento=this.tutorIndividual[0].fecha_nacimiento
      const split=fecha_nacimiento.split('/');
      const day=split[0];
      const mes=split[1];
      const ano=split[2];
      if(this.tutorIndividual[0].estado==1){
        this.classBadgeActive='badge bg-success';
        this.estado="Activo"
      }else{
        this.classBadgeActive='badge bg-danger';
        this.estado="Inactivo"
      }
      this.tutorIndividual[0].fecha_nacimiento=ano+'-'+mes+'-'+day;
    });
  }
  get f() { return this.EditarTutorForm.controls; }

  insertTutor(idTutor:string){
    this.submitted=true;
    if (this.EditarTutorForm.invalid) {
      this.toastrService.error(`Completar información restante`,'Error')
      return;
    }
    this.perfilTutoresService.updateTutor(this.EditarTutorForm.value,idTutor).subscribe(
      response=>{
        this.router.navigate(['/tutor/perfil']);
        if(this.tutorIndividual[0].estado==1){
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
