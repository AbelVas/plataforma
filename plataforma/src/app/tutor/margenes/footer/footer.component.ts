import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  @Input() cnavbar2:string='';
  @Input() ctexto2:string='';
  @Input() cfondo1:string='';

  constructor() { }

  ngOnInit(): void {
  }
  scrollTop(){
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
  });
  }

}
