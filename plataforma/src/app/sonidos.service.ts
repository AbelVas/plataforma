import { Injectable } from '@angular/core';
import { Howl } from 'howler';

@Injectable({
  providedIn: 'root'
})
export class SonidosService {

  private notificationSound: Howl;


  constructor() {
    this.notificationSound = new Howl({
      src: ['assets/sonidos/notificacion/notificaciones-1.mp3'] // Ruta del archivo de sonido de notificación
    });
  }

  playNotificationSound() {
    this.notificationSound.play();
  }

}
