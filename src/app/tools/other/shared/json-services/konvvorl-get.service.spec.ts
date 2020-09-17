import { TestBed } from '@angular/core/testing';

import { KonvvorlGetService } from './konvvorl-get.service';

describe('KonvvorlGetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KonvvorlGetService = TestBed.get(KonvvorlGetService);
    expect(service).toBeTruthy();
  });
});
