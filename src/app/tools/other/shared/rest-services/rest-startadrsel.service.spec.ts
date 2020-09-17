import { TestBed } from '@angular/core/testing';

import { RestStartadrselService } from './rest-startadrsel.service';

describe('RestStartadrselService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestStartadrselService = TestBed.get(RestStartadrselService);
    expect(service).toBeTruthy();
  });
});
