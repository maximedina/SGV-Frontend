import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticaCreateComponent } from './practica-create.component';

describe('PracticaCreateComponent', () => {
  let component: PracticaCreateComponent;
  let fixture: ComponentFixture<PracticaCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PracticaCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
