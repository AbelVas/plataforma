import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenCursoStudentComponent } from './examen-curso-student.component';

describe('ExamenCursoStudentComponent', () => {
  let component: ExamenCursoStudentComponent;
  let fixture: ComponentFixture<ExamenCursoStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamenCursoStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamenCursoStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
