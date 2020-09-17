import { TestBed, inject } from '@angular/core/testing';

import { AbschlussService } from './abschluss.service';

describe('AbschlussService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AbschlussService]
    });
  });

  it('should be created', inject([AbschlussService], (service: AbschlussService) => {
    expect(service).toBeTruthy();
  }));
});
