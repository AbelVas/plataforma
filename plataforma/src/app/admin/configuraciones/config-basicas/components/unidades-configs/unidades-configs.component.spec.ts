import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadesConfigsComponent } from './unidades-configs.component';

describe('UnidadesConfigsComponent', () => {
  let component: UnidadesConfigsComponent;
  let fixture: ComponentFixture<UnidadesConfigsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnidadesConfigsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnidadesConfigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
