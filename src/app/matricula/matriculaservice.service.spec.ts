import { TestBed } from '@angular/core/testing';

import { MatriculaserviceService } from './matriculaservice.service';

describe('MatriculaserviceService', () => {
  let service: MatriculaserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatriculaserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
