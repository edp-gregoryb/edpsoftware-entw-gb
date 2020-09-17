import { TestBed, inject } from '@angular/core/testing';

import { VorerfassungService } from './vorerfassung.service';

describe('VorerfassungService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VorerfassungService]
    });
  });

  it('should be created', inject([VorerfassungService], (service: VorerfassungService) => {
    expect(service).toBeTruthy();
  }));
});
