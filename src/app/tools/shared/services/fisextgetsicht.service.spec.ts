import { TestBed, inject } from '@angular/core/testing';

import { FisextgetsichtService } from './fisextgetsicht.service';

describe('FisextgetsichtService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FisextgetsichtService]
    });
  });

  it('should be created', inject([FisextgetsichtService], (service: FisextgetsichtService) => {
    expect(service).toBeTruthy();
  }));
});
