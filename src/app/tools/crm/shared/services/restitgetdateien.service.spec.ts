import { TestBed, inject } from '@angular/core/testing';

import { RestitgetdateienService } from './restitgetdateien.service';

describe('RestitgetdateienService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestitgetdateienService]
    });
  });

  it('should be created', inject([RestitgetdateienService], (service: RestitgetdateienService) => {
    expect(service).toBeTruthy();
  }));
});
