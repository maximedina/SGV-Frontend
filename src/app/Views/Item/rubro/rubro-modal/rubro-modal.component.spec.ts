/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RubroModalComponent } from './rubro-modal.component';

describe('RubroModalComponent', () => {
  let component: RubroModalComponent;
  let fixture: ComponentFixture<RubroModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RubroModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RubroModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
