import { TestBed, inject } from '@angular/core/testing';

import { FisvlaboallService } from './fisvlaboall.service';

describe('FisvlaboallService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FisvlaboallService]
    });
  });

  it('should be created', inject([FisvlaboallService], (service: FisvlaboallService) => {
    expect(service).toBeTruthy();
  }));
});
