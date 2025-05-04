import { TestBed } from '@angular/core/testing';

import { DetallematriculaserviceService } from './detallematriculaservice.service';

describe('DetallematriculaserviceService', () => {
  let service: DetallematriculaserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetallematriculaserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
