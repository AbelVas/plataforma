import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-foro-curso-profesor',
  templateUrl: './foro-curso-profesor.component.html',
  styleUrls: ['./foro-curso-profesor.component.css']
})
export class ForoCursoProfesorComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }
  PreguntaIncial = this.formBuilder.group({
    titulo: '',
    descripcion: '',
    enlace: false,
    urlEnlace: ''
  });
  ngOnInit(): void {
  }


  PreguntaInicial() {
    console.log(this.PreguntaIncial.value);
    // Aquí puedes enviar los datos a donde los necesites, por ejemplo, a través de un servicio
  }
}
