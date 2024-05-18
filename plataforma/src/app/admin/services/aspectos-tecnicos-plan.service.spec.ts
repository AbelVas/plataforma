import { TestBed } from '@angular/core/testing';

import { AspectosTecnicosPlanService } from './aspectos-tecnicos-plan.service';

describe('AspectosTecnicosPlanService', () => {
  let service: AspectosTecnicosPlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AspectosTecnicosPlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
