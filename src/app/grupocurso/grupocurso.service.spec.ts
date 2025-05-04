import { TestBed } from '@angular/core/testing';

import { GrupocursoService } from './grupocurso.service';

describe('GrupocursoService', () => {
  let service: GrupocursoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrupocursoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
