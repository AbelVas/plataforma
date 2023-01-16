import { Component, OnInit } from '@angular/core';
import { PerfilTutorService } from '../../services/perfil-tutor.service';
import  {DatePipe} from "@angular/common"
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-perfil-tutor',
  templateUrl: './edit-perfil-tutor.component.html',
  styleUrls: ['./edit-perfil-tutor.component.css']
})
export class EditPerfilTutorComponent implements OnInit {

  constructor( private perfilTutoresService:PerfilTutorService, private router:Router, private toastrService:ToastrService ) { }

  pipe = new DatePipe('en-US');
  classBadgeActive:any;
  estado:any;
  tutorIndividual:any=[{
  }];

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

  insertTutor(idTutor:string){
    this.perfilTutoresService.updateTutor(this.tutorIndividual[0],idTutor).subscribe(
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
