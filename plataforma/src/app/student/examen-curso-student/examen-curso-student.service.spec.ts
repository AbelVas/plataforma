import { TestBed } from '@angular/core/testing';

import { ExamenCursoStudentService } from './examen-curso-student.service';

describe('ExamenCursoStudentService', () => {
  let service: ExamenCursoStudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamenCursoStudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
