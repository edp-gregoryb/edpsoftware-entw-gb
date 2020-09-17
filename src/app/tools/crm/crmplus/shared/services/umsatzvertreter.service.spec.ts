import { TestBed, inject } from '@angular/core/testing';

import { UmsatzvertreterService } from './umsatzvertreter.service';

describe('UmsatzvertreterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UmsatzvertreterService]
    });
  });

  it('should be created', inject([UmsatzvertreterService], (service: UmsatzvertreterService) => {
    expect(service).toBeTruthy();
  }));
});
