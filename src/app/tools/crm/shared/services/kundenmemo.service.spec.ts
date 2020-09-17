/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { KundenmemoService } from './kundenmemo.service';

describe('KundenmemoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KundenmemoService]
    });
  });

  it('should ...', inject([KundenmemoService], (service: KundenmemoService) => {
    expect(service).toBeTruthy();
  }));
});
