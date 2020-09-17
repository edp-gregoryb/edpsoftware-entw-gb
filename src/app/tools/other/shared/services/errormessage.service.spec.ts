import { TestBed } from '@angular/core/testing';

import { ErrormessageService } from './errormessage.service';

describe('ErrormessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ErrormessageService = TestBed.get(ErrormessageService);
    expect(service).toBeTruthy();
  });
});
