import { TestBed } from '@angular/core/testing';

import { RestGetcodeService } from './rest-getcode.service';

describe('RestGetcodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestGetcodeService = TestBed.get(RestGetcodeService);
    expect(service).toBeTruthy();
  });
});
