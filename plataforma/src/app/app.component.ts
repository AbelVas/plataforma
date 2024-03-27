import { Component ,ElementRef, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { WebSocketService } from './web-socket.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'admindashboard';
  constructor(private elementRef: ElementRef,  public  _router: Router,private socketService: WebSocketService) { }

  ngOnInit(): void {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);
    //coso del socket
       // Escuchar eventos desde el servidor
       this.socketService.listen('evento-desde-servidor').subscribe((data) => {
        console.log('Evento recibido desde el servidor:', data);
        // Aquí puedes manejar la lógica correspondiente al evento recibido
      });
    }

    enviarEventoAlServidor(): void {
      this.socketService.emit('evento-desde-cliente', { mensaje: 'Hola desde Angular' });
    }
  }

