/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MainsearchService } from './mainsearch.service';

describe('MainsearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MainsearchService]
    });
  });

  it('should ...', inject([MainsearchService], (service: MainsearchService) => {
    expect(service).toBeTruthy();
  }));
});
