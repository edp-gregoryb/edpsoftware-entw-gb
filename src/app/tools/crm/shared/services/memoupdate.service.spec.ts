/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MemoupdateService } from './memoupdate.service';

describe('MemoupdateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MemoupdateService]
    });
  });

  it('should ...', inject([MemoupdateService], (service: MemoupdateService) => {
    expect(service).toBeTruthy();
  }));
});
