import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManejoDeErroresService {

  constructor() { }

  handleHttpError(error: HttpErrorResponse) {
    let errorMessage = 'Error desconocido';

    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = this.getServerErrorMessage(error);
    }

    return throwError(errorMessage);
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
    let errorMessage = 'Error en la Petición';

    // Verificar si el error contiene un cuerpo y un mensaje de error
    if (error.error && error.error.error) {
      errorMessage = error.error.error; // Utiliza el mensaje de error enviado desde el servidor
    } else {
      // Error genérico
      errorMessage = error.message || errorMessage;
    }

    return errorMessage;
  }
}
