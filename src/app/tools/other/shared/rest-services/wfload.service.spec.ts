import { TestBed } from '@angular/core/testing';

import { WfloadService } from './wfload.service';

describe('WfloadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WfloadService = TestBed.get(WfloadService);
    expect(service).toBeTruthy();
  });
});
