import { TestBed } from '@angular/core/testing';

import { RestgetadrhauptService } from './restgetadrhaupt.service';

describe('RestgetadrhauptService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestgetadrhauptService = TestBed.get(RestgetadrhauptService);
    expect(service).toBeTruthy();
  });
});
