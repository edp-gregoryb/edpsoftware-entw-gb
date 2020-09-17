import { TestBed, inject } from '@angular/core/testing';

import { RestsygetdefaultService } from './restsygetdefault.service';

describe('RestsygetdefaultService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestsygetdefaultService]
    });
  });

  it('should be created', inject([RestsygetdefaultService], (service: RestsygetdefaultService) => {
    expect(service).toBeTruthy();
  }));
});
