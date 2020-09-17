import { TestBed, inject } from '@angular/core/testing';

import { RestitaufeinytodateService } from './restitaufeinytodate.service';

describe('RestitaufeinytodateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestitaufeinytodateService]
    });
  });

  it('should be created', inject([RestitaufeinytodateService], (service: RestitaufeinytodateService) => {
    expect(service).toBeTruthy();
  }));
});
