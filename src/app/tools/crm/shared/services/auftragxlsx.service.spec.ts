import { TestBed, inject } from '@angular/core/testing';

import { AuftragxlsxService } from './auftragxlsx.service';

describe('AuftragxlsxService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuftragxlsxService]
    });
  });

  it('should be created', inject([AuftragxlsxService], (service: AuftragxlsxService) => {
    expect(service).toBeTruthy();
  }));
});
