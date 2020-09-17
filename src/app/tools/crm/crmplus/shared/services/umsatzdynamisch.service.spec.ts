import { TestBed, inject } from '@angular/core/testing';

import { UmsatzdynamischService } from './umsatzdynamisch.service';

describe('UmsatzdynamischService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UmsatzdynamischService]
    });
  });

  it('should be created', inject([UmsatzdynamischService], (service: UmsatzdynamischService) => {
    expect(service).toBeTruthy();
  }));
});
