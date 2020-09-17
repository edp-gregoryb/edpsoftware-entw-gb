import { TestBed, inject } from '@angular/core/testing';

import { FakturaService } from './faktura.service';

describe('FakturaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FakturaService]
    });
  });

  it('should be created', inject([FakturaService], (service: FakturaService) => {
    expect(service).toBeTruthy();
  }));
});
