import { TestBed } from '@angular/core/testing';

import { RestAbozustellungenService } from './rest-abozustellungen.service';

describe('RestAbozustellungenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestAbozustellungenService = TestBed.get(RestAbozustellungenService);
    expect(service).toBeTruthy();
  });
});
