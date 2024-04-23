import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {
    URL = environment.url;
    private socket: Socket;

    constructor() {
        this.socket = io(`${this.URL}`);
    }
    // Método para escuchar un evento específico
    escucharEvento(evento: string): Observable<any> {
        return new Observable((observer) => {
            this.socket.on(evento, (data: any) => {
                observer.next(data);
            });
        });
    }
    // Método para emitir un evento al servidor
    emitirEvento(evento: string, datos: any): void {
        this.socket.emit(evento, datos);
    }
}
