import { TestBed, inject } from '@angular/core/testing';

import { UmsatzvermittlerService } from './umsatzvermittler.service';

describe('UmsatzvermittlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UmsatzvermittlerService]
    });
  });

  it('should be created', inject([UmsatzvermittlerService], (service: UmsatzvermittlerService) => {
    expect(service).toBeTruthy();
  }));
});
