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
  listen(eventName: string): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data: any) => {
        subscriber.next(data);
      });
    });
  }

  // Método para emitir un evento al servidor
  emit(eventName: string, data: any): void {
    this.socket.emit(eventName, data);
  }
}
