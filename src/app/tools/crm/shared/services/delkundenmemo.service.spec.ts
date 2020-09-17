/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DelkundenmemoService } from './delkundenmemo.service';

describe('DelkundenmemoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DelkundenmemoService]
    });
  });

  it('should ...', inject([DelkundenmemoService], (service: DelkundenmemoService) => {
    expect(service).toBeTruthy();
  }));
});
