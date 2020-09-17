import { TestBed, inject } from '@angular/core/testing';

import { RestitaufartabfrageService } from './restitaufartabfrage.service';

describe('RestitaufartabfrageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestitaufartabfrageService]
    });
  });

  it('should be created', inject([RestitaufartabfrageService], (service: RestitaufartabfrageService) => {
    expect(service).toBeTruthy();
  }));
});
