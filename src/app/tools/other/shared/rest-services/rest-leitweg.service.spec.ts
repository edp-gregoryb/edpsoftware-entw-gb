import { TestBed } from '@angular/core/testing';

import { RestLeitwegService } from './rest-leitweg.service';

describe('RestLeitwegService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestLeitwegService = TestBed.get(RestLeitwegService);
    expect(service).toBeTruthy();
  });
});
