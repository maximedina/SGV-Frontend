import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CajaCerrarComponent } from './caja-cerrar.component';

describe('CajaCerrarComponent', () => {
  let component: CajaCerrarComponent;
  let fixture: ComponentFixture<CajaCerrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CajaCerrarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CajaCerrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
