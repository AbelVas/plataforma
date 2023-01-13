import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit , Input} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() cnavbar1:string='';
  @Input() ctexto2:string='';

  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
  }
  sidebarToggle()
  {
    //toggle sidebar function
    this.document.body.classList.toggle('toggle-sidebar');
  }

}
