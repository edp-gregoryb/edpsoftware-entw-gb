import { TestBed, inject } from '@angular/core/testing';

import { FisfiledownkundeService } from './fisfiledownkunde.service';

describe('FisfiledownkundeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FisfiledownkundeService]
    });
  });

  it('should ...', inject([FisfiledownkundeService], (service: FisfiledownkundeService) => {
    expect(service).toBeTruthy();
  }));
});
