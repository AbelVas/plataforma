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
  constructor(private elementRef: ElementRef,  public  _router: Router, private webSocketService:WebSocketService) { }

  ngOnInit() {

    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);
    //aaquí se esuchan los eventos del server con socket.io
    this.webSocketService.listen('test-event').subscribe((data)=>{
      console.log(data)
    })

  }
}
