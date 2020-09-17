import { TestBed, inject } from '@angular/core/testing';

import { OpendocumentsService } from './opendocuments.service';

describe('OpendocumentsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpendocumentsService]
    });
  });

  it('should be created', inject([OpendocumentsService], (service: OpendocumentsService) => {
    expect(service).toBeTruthy();
  }));
});
