import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  URL=environment.url
  private socket: Socket

  constructor() {
    this.socket = io(`${this.URL}`); // Reemplaza 'http://tu-servidor:puerto' con la URL de tu servidor y el puerto
  }
  // Método para escuchar un evento específico
  escucharEvento(evento: string, callback: (datos: any) => void): void {
    this.socket.on(evento, callback);
  }


  // Método para emitir un evento al servidor
  emitirEvento(evento: string, datos: any): void {
    this.socket.emit(evento, datos);
  }
}
