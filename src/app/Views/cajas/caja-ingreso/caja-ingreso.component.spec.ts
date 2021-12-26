import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CajaIngresoComponent } from './caja-ingreso.component';

describe('CajaIngresoComponent', () => {
  let component: CajaIngresoComponent;
  let fixture: ComponentFixture<CajaIngresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CajaIngresoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CajaIngresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
