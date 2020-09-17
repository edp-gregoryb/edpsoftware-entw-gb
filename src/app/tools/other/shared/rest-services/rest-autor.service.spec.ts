import { TestBed } from '@angular/core/testing';

import { RestAutorService } from './rest-autor.service';

describe('RestAutorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestAutorService = TestBed.get(RestAutorService);
    expect(service).toBeTruthy();
  });
});
