import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ManejoDeErroresService } from 'src/app/manejo-de-errores.service';

@Injectable({
  providedIn: 'root'
})
export class ForoCursoProfesorService {
  URL=environment.url
  constructor(private errorHandler: ManejoDeErroresService) { }
}
