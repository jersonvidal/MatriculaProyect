import { TestBed } from '@angular/core/testing';

import { HorariogrupoService } from './horariogrupo.service';

describe('HorariogrupoService', () => {
  let service: HorariogrupoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HorariogrupoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
