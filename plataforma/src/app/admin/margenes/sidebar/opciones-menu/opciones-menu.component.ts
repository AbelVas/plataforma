import { Component, OnInit } from '@angular/core';
import { OpcionesAdminMenuService } from 'src/app/admin/services/opciones-admin-menu.service';
import { WebSocketService } from 'src/app/web-socket.service';

@Component({
  selector: 'app-admin-opciones-menu',
  templateUrl: './opciones-menu.component.html',
  styleUrls: ['./opciones-menu.component.css']
})
export class OpcionesMenuComponent implements OnInit {

  opcionesSidebarGet:any=[];

  constructor(private sideBarService:OpcionesAdminMenuService,private socketService:WebSocketService) { }

  ngOnInit(): void {
    this.getSidebarOptionsMenu()
  }
  getSidebarOptionsMenu(){
    this.sideBarService.getOpcionesSideBarAdmin().subscribe(
      res=>{
        this.opcionesSidebarGet=res
      },
      err=>{
        console.log(err)
      }
    )
  }
}
