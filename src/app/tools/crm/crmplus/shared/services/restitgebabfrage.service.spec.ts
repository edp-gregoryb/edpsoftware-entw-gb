import { TestBed, inject } from '@angular/core/testing';

import { RestitgebabfrageService } from './restitgebabfrage.service';

describe('RestitgebabfrageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestitgebabfrageService]
    });
  });

  it('should be created', inject([RestitgebabfrageService], (service: RestitgebabfrageService) => {
    expect(service).toBeTruthy();
  }));
});
