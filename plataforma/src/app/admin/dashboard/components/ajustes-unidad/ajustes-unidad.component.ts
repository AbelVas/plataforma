import { Component, OnInit } from '@angular/core';
import { BimestreService } from '../../../services/bimestres.service';
import { UnidadesService } from '../../../services/unidades.service';
import { EstadisticasDashboardService } from '../../../services/estadisticas-dashboard.service';
import { Observable } from 'rxjs';

// Definir las interfaces para las respuestas del servicio
interface EstadoResponse {
  noActivo: number;
  siActivo: number;
}

interface NotasResponse {
  noVer: number;
  ver: number;
}

@Component({
  selector: 'app-admin-ajustes-unidad-dashboard',
  templateUrl: './ajustes-unidad.component.html',
  styleUrls: ['./ajustes-unidad.component.css']
})
export class AjustesUnidadComponent implements OnInit {
  sppinerOn: boolean = true; // Unidades
  sppinerOn2: boolean = true; // Ver estado notas
  sppinerOn3: boolean = true; // Ingreso Alumnos, Profesores, Tutores
  sppinerOn4: boolean = true; // Estadísticas generales
  unidades: any = [];
  errorServicio: any = {};
  estadoFinalNotas = '';
  estadosUsuarios = [
    { tipo: 'Alumno', valor: '', label: 'Ingresos Alumnos' },
    { tipo: 'Profesor', valor: '', label: 'Ingresos Profesor' },
    { tipo: 'Tutor', valor: '', label: 'Ingresos Tutor' }
  ];
  totalNinos: any = '';
  totalNinas: any = '';
  codigoActivo: any = '';
  codigoInactivo: any = '';
  passDocenteCambiada: any = 0;
  passDocenteNoCambiada: any = 0;

  constructor(
    private servicioBimestre: BimestreService,
    private estadisticaService: EstadisticasDashboardService,
    private unidadesService: UnidadesService
  ) {}

  ngOnInit(): void {
    this.getUnidades();
    this.getNinosNinas();
    this.getCodigoActivoInactivo();
    this.getPassChangeDocentes();
    this.getEstadoVerNotas();
    this.getEstadoUsuarios(); // Obtener estados de alumnos, profesores y tutores
  }

  // Obtener unidades
  getUnidades(): void {
    this.servicioBimestre.getUnidades().subscribe(
      response => {
        this.unidades = response;
        this.errorServicio = '';
        this.sppinerOn = false;
      },
      error => {
        this.errorServicio = error;
        this.sppinerOn = false;
      }
    );
  }

  // Actualizar el estado de las unidades
  toggleEstado(event: any, idUnidad: string, estadoActual: number): void {
    const nuevoEstado = event.target.checked ? '1' : '0';
    this.servicioBimestre.updateUnidadesEstado(idUnidad, { estado: nuevoEstado }).subscribe(
      () => this.getUnidades(),
      error => {
        this.errorServicio = error;
      }
    );
  }

  // Obtener el estado de notas
  getEstadoVerNotas(): void {
    this.unidadesService.getNotasVer().subscribe(
      (res: any) => {
        this.estadoFinalNotas = res.noVer < res.ver ? '1' : '0';
        this.sppinerOn2 = false;
      },
      err => {
        console.log(err);
        this.sppinerOn2 = false;
      }
    );
  }

  // Cambiar el estado de las notas
  toggleEstadoNotas(event: any): void {
    this.estadoFinalNotas = event.target.checked ? '1' : '0';
    this.unidadesService.habilitarVerNotas(this.estadoFinalNotas).subscribe(
      () => this.getEstadoVerNotas(),
      error => {
        this.errorServicio = error;
      }
    );
  }

  // Obtener estados de alumnos, profesores y tutores
  getEstadoUsuarios(): void {
    this.getEstadoPorTipo('Alumno');
    this.getEstadoPorTipo('Profesor');
    this.getEstadoPorTipo('Tutor');
  }

  // Obtener el estado de un tipo específico de usuario (Alumno, Profesor, Tutor)
  getEstadoPorTipo(tipo: string): void {
    let getEstadoFn:any;

    // Seleccionar el servicio correcto basado en el tipo
    switch (tipo) {
      case 'Alumno':
        getEstadoFn = this.unidadesService.getEstadoAlumno();
        break;
      case 'Profesor':
        getEstadoFn = this.unidadesService.getEstadoProfesor();
        break;
      case 'Tutor':
        getEstadoFn = this.unidadesService.getEstadoTutor();
        break;
      default:
        return;
    }

    getEstadoFn.subscribe(
      (res: EstadoResponse) => {
        const valor = res.noActivo < res.siActivo ? '1' : '0';
        const usuario = this.estadosUsuarios.find(e => e.tipo === tipo);
        if (usuario) {
          usuario.valor = valor;
        }
        this.sppinerOn3 = false;
      },
      (err:any) => {
        console.log(err);
        this.sppinerOn3 = false;
      }
    );
  }

  // Cambiar el estado de un tipo específico de usuario (Alumno, Profesor, Tutor)
  toggleEstadoUsuario(event: any, tipo: string): void {
    const nuevoEstado = event.target.checked ? '1' : '0';
    let updateEstadoFn: Observable<any>;

    // Seleccionar el método correcto para actualizar el estado
    switch (tipo) {
      case 'Alumno':
        updateEstadoFn = this.unidadesService.updateEstadoAlumno(nuevoEstado);
        break;
      case 'Profesor':
        updateEstadoFn = this.unidadesService.updateEstadoProfesor(nuevoEstado);
        break;
      case 'Tutor':
        updateEstadoFn = this.unidadesService.updateEstadoTutor(nuevoEstado);
        break;
      default:
        return;
    }

    updateEstadoFn.subscribe(
      () => this.getEstadoPorTipo(tipo),
      error => {
        this.errorServicio = error;
      }
    );
  }

  // Obtener estadísticas generales (Niños y Niñas)
  getNinosNinas(): void {
    this.sppinerOn4 = true;
    this.estadisticaService.getTotalAlumnosHombres().subscribe(
      res => {
        this.totalNinos = res[0].nino;
        this.sppinerOn4 = false;
      },
      err => {
        console.log(err);
        this.sppinerOn4 = false;
      }
    );

    this.estadisticaService.getTotalAlumnosMujeres().subscribe(
      res => {
        this.totalNinas = res[0].nina;
        this.sppinerOn4 = false;
      },
      err => {
        console.log(err);
        this.sppinerOn4 = false;
      }
    );
  }

  // Obtener el estado de los códigos activos e inactivos
  getCodigoActivoInactivo(): void {
    this.sppinerOn4 = true;
    this.estadisticaService.getTotalCodigosUso().subscribe(
      res => {
        this.codigoActivo = res[0].activo;
        this.sppinerOn4 = false;
      },
      err => {
        console.log(err);
        this.sppinerOn4 = false;
      }
    );

    this.estadisticaService.getTotalCodigosNoUso().subscribe(
      res => {
        this.codigoInactivo = res[0].noActivo;
        this.sppinerOn4 = false;
      },
      err => {
        console.log(err);
        this.sppinerOn4 = false;
      }
    );
  }

  // Obtener el estado de cambio de contraseñas de los docentes
  getPassChangeDocentes(): void {
    this.sppinerOn4 = true;
    this.estadisticaService.getDocenteContrasenaCambiada().subscribe(
      res => {
        this.passDocenteCambiada = res[0].sicambio;
        this.passDocenteNoCambiada = res[0].nocambio;
        this.sppinerOn4 = false;
      },
      err => {
        console.log(err);
        this.sppinerOn4 = false;
      }
    );
  }
}
