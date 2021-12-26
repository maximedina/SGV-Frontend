/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CiudadModalComponent } from './ciudad-modal.component';

describe('CiudadModalComponent', () => {
  let component: CiudadModalComponent;
  let fixture: ComponentFixture<CiudadModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CiudadModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CiudadModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
