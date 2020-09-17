import { TestBed, inject } from '@angular/core/testing';

import { RestCrystalGetPdfService } from './rest-crystal-get-pdf.service';

describe('RestCrystalGetPdfService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestCrystalGetPdfService]
    });
  });

  it('should be created', inject([RestCrystalGetPdfService], (service: RestCrystalGetPdfService) => {
    expect(service).toBeTruthy();
  }));
});
