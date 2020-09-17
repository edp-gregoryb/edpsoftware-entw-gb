import { TestBed, inject } from '@angular/core/testing';

import { RestitobjkeyabfrageService } from './restitobjkeyabfrage.service';

describe('RestitobjkeyabfrageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestitobjkeyabfrageService]
    });
  });

  it('should be created', inject([RestitobjkeyabfrageService], (service: RestitobjkeyabfrageService) => {
    expect(service).toBeTruthy();
  }));
});
