/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProcommonService } from './procommon.service';

describe('ProcommonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProcommonService]
    });
  });

  it('should ...', inject([ProcommonService], (service: ProcommonService) => {
    expect(service).toBeTruthy();
  }));
});
