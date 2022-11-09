import { Component,ElementRef,OnInit } from "@angular/core";

@Component({
  selector: 'app-index-admin',
  templateUrl: './index-admin.html',
  styleUrls: ['./index-admin.component.scss']
})

export class IndexAdminComponent implements OnInit{

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {

    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);
  }

}
