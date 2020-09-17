import { TestBed, inject } from '@angular/core/testing';

import { RestitosdynabfrageService } from './restitosdynabfrage.service';

describe('RestitosdynabfrageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestitosdynabfrageService]
    });
  });

  it('should be created', inject([RestitosdynabfrageService], (service: RestitosdynabfrageService) => {
    expect(service).toBeTruthy();
  }));
});
