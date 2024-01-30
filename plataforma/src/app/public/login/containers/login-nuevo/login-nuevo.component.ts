import { Component, OnInit } from '@angular/core';
import { FormsModule,FormBuilder, FormControl,Validators } from "@angular/forms";


@Component({
  selector: 'app-login-nuevo',
  templateUrl: './login-nuevo.component.html',
  styleUrls: ['./login-nuevo.component.css']
})
export class LoginNuevoComponent implements OnInit {

  loginForm=this.formBuilder.group({
    usuario:new FormControl('',[Validators.required]),
    pass:new FormControl('',[Validators.required])
  })

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
  }

  loginIn(){
  }
}
