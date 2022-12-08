import { Component, OnInit } from '@angular/core';
import { ListarGradosXJornadaService } from 'src/app/admin/services/listar-grados-x-jornada.service';
import { JornadasService } from 'src/app/admin/configuraciones/config-basicas/services/jornadas.service';

@Component({
  selector: 'app-admin-grados-jornadas-tabs-dashboard',
  templateUrl: './grados-jornadas-tabs.component.html',
  styleUrls: ['./grados-jornadas-tabs.component.css']
})
export class GradosJornadasTabsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
