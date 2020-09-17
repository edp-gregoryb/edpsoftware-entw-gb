import { TestBed, inject } from '@angular/core/testing';

import { AuftragbestService } from './auftragbest.service';

describe('AuftragbestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuftragbestService]
    });
  });

  it('should be created', inject([AuftragbestService], (service: AuftragbestService) => {
    expect(service).toBeTruthy();
  }));
});
