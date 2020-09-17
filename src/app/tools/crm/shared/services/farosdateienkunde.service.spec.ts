import { TestBed, inject } from '@angular/core/testing';

import { FarosdateienkundeService } from './farosdateienkunde.service';

describe('FarosdateienkundeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FarosdateienkundeService]
    });
  });

  it('should ...', inject([FarosdateienkundeService], (service: FarosdateienkundeService) => {
    expect(service).toBeTruthy();
  }));
});
