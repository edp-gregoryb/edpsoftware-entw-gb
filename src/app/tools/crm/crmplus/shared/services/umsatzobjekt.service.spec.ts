import { TestBed, inject } from '@angular/core/testing';

import { UmsatzobjektService } from './umsatzobjekt.service';

describe('UmsatzobjektService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UmsatzobjektService]
    });
  });

  it('should be created', inject([UmsatzobjektService], (service: UmsatzobjektService) => {
    expect(service).toBeTruthy();
  }));
});
