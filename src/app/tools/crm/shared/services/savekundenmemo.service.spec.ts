/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SavekundenmemoService } from './savekundenmemo.service';

describe('SavekundenmemoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SavekundenmemoService]
    });
  });

  it('should ...', inject([SavekundenmemoService], (service: SavekundenmemoService) => {
    expect(service).toBeTruthy();
  }));
});
