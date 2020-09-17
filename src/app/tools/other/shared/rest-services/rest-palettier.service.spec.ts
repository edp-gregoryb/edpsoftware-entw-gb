import { TestBed } from '@angular/core/testing';

import { RestPalettierService } from './rest-palettier.service';

describe('RestPalettierService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestPalettierService = TestBed.get(RestPalettierService);
    expect(service).toBeTruthy();
  });
});
