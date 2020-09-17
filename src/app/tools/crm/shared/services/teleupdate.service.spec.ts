/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TeleupdateService } from './teleupdate.service';

describe('TeleupdateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeleupdateService]
    });
  });

  it('should ...', inject([TeleupdateService], (service: TeleupdateService) => {
    expect(service).toBeTruthy();
  }));
});
