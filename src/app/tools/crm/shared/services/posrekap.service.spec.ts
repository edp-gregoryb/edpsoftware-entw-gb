import { TestBed, inject } from '@angular/core/testing';

import { PosrekapService } from './posrekap.service';

describe('PosrekapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PosrekapService]
    });
  });

  it('should ...', inject([PosrekapService], (service: PosrekapService) => {
    expect(service).toBeTruthy();
  }));
});
