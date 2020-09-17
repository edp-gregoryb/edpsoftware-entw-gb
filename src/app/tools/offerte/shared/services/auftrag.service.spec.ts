import { TestBed, inject } from '@angular/core/testing';

import { AuftragService } from './auftrag.service';

describe('AuftragService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuftragService]
    });
  });

  it('should be created', inject([AuftragService], (service: AuftragService) => {
    expect(service).toBeTruthy();
  }));
});
