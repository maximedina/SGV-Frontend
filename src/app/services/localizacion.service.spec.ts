/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LocalizacionService } from './localizacion.service';

describe('Service: Localizacion', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalizacionService]
    });
  });

  it('should ...', inject([LocalizacionService], (service: LocalizacionService) => {
    expect(service).toBeTruthy();
  }));
});
