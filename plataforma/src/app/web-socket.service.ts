import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
// socket.io
import {io,Socket} from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  socket:any;
  URL=environment.url
  readonly uri:string=this.URL


  constructor() {
    this.socket=io(this.uri);
  }



  listen(eventName:any){
    return new Observable((subscriber)=>{
      this.socket.on(eventName,(data: any)=>{
        subscriber.next(data)
      })
    })
  }

  emit(eventName:any,data:any){
    this.socket.emit(eventName,data)
  }
}
