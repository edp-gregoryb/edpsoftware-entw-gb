import { TestBed } from '@angular/core/testing';

import { RestKommentarAnhangService } from './rest-kommentar-anhang.service';

describe('RestKommentarAnhangService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestKommentarAnhangService = TestBed.get(RestKommentarAnhangService);
    expect(service).toBeTruthy();
  });
});
