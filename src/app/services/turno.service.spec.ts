/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TurnoService } from './turno.service';

describe('Service: Turno', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TurnoService]
    });
  });

  it('should ...', inject([TurnoService], (service: TurnoService) => {
    expect(service).toBeTruthy();
  }));
});
