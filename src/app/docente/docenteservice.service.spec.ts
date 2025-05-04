import { TestBed } from '@angular/core/testing';

import {DocenteServiceService} from './docenteservice.service';

describe('DocenteserviceService', () => {
  let service: DocenteServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocenteServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
