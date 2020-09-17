import { TestBed } from '@angular/core/testing';

import { RestAboobjektService } from './rest-aboobjekt.service';

describe('RestAboobjektService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestAboobjektService = TestBed.get(RestAboobjektService);
    expect(service).toBeTruthy();
  });
});
