import { TestBed } from '@angular/core/testing';

import { RestgetplzortService } from './restgetplzort.service';

describe('RestgetplzortService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestgetplzortService = TestBed.get(RestgetplzortService);
    expect(service).toBeTruthy();
  });
});
