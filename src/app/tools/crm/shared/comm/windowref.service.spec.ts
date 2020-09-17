/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WindowrefService } from './windowref.service';

describe('WindowrefService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WindowrefService]
    });
  });

  it('should ...', inject([WindowrefService], (service: WindowrefService) => {
    expect(service).toBeTruthy();
  }));
});
