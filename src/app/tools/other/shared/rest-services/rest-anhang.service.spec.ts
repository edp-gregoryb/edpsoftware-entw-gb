import { TestBed } from '@angular/core/testing';

import { RestAnhangService } from './rest-anhang.service';

describe('RestAnhangService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestAnhangService = TestBed.get(RestAnhangService);
    expect(service).toBeTruthy();
  });
});
