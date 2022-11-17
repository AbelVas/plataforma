import { Component, OnInit } from '@angular/core';
import { PerfilProfesorService } from '../../services/perfil-profesor.service';
import { PerfilProfesorComponent } from '../../perfil-profesor.component';

@Component({
  selector: 'app-edit-perfil-profesor',
  templateUrl: './edit-perfil-profesor.component.html',
  styleUrls: ['./edit-perfil-profesor.component.css']
})
export class EditPerfilProfesorComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {
  }

}
