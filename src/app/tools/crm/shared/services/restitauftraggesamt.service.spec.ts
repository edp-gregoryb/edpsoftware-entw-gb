import { TestBed } from '@angular/core/testing';

import { RestitauftraggesamtService } from './restitauftraggesamt.service';

describe('RestitauftraggesamtService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestitauftraggesamtService = TestBed.get(RestitauftraggesamtService);
    expect(service).toBeTruthy();
  });
});
