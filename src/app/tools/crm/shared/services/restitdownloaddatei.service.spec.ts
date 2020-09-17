import { TestBed, inject } from '@angular/core/testing';

import { RestitdownloaddateiService } from './restitdownloaddatei.service';

describe('RestitdownloaddateiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestitdownloaddateiService]
    });
  });

  it('should be created', inject([RestitdownloaddateiService], (service: RestitdownloaddateiService) => {
    expect(service).toBeTruthy();
  }));
});
