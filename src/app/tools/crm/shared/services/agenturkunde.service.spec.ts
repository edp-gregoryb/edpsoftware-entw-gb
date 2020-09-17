/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AgenturkundeService } from './agenturkunde.service';

describe('AgenturkundeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AgenturkundeService]
    });
  });

  it('should ...', inject([AgenturkundeService], (service: AgenturkundeService) => {
    expect(service).toBeTruthy();
  }));
});
