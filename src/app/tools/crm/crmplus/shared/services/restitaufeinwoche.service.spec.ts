import { TestBed, inject } from '@angular/core/testing';

import { RestitaufeinwocheService } from './restitaufeinwoche.service';

describe('RestitaufeinwocheService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestitaufeinwocheService]
    });
  });

  it('should be created', inject([RestitaufeinwocheService], (service: RestitaufeinwocheService) => {
    expect(service).toBeTruthy();
  }));
});
