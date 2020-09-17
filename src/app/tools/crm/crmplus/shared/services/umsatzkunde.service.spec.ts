import { TestBed, inject } from '@angular/core/testing';

import { UmsatzkundeService } from './umsatzkunde.service';

describe('UmsatzkundeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UmsatzkundeService]
    });
  });

  it('should be created', inject([UmsatzkundeService], (service: UmsatzkundeService) => {
    expect(service).toBeTruthy();
  }));
});
