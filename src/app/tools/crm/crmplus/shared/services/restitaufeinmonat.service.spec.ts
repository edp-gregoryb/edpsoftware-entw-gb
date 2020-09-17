import { TestBed, inject } from '@angular/core/testing';

import { RestitaufeinmonatService } from './restitaufeinmonat.service';

describe('RestitaufeinmonatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestitaufeinmonatService]
    });
  });

  it('should be created', inject([RestitaufeinmonatService], (service: RestitaufeinmonatService) => {
    expect(service).toBeTruthy();
  }));
});
