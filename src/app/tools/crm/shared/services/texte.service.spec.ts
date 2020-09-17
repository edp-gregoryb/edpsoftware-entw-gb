/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TexteService } from './texte.service';

describe('TexteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TexteService]
    });
  });

  it('should ...', inject([TexteService], (service: TexteService) => {
    expect(service).toBeTruthy();
  }));
});
