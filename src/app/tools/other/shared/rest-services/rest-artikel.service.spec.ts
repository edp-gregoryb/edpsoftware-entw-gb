import { TestBed, inject } from '@angular/core/testing';

import { RestArtikelService } from './rest-artikel.service';

describe('RestArtikelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestArtikelService]
    });
  });

  it('should be created', inject([RestArtikelService], (service: RestArtikelService) => {
    expect(service).toBeTruthy();
  }));
});
