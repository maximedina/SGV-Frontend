/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AvisosService } from './avisos.service';

describe('Service: Avisos', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AvisosService]
    });
  });

  it('should ...', inject([AvisosService], (service: AvisosService) => {
    expect(service).toBeTruthy();
  }));
});
