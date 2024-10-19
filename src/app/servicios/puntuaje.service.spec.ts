import { TestBed } from '@angular/core/testing';

import { PuntuajeService } from './puntuaje.service';

describe('PuntuajeService', () => {
  let service: PuntuajeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PuntuajeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
