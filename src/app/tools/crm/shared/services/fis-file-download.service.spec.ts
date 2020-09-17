import { TestBed, inject } from '@angular/core/testing';

import { FisFileDownloadService } from './fis-file-download.service';

describe('FisFileDownloadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FisFileDownloadService]
    });
  });

  it('should ...', inject([FisFileDownloadService], (service: FisFileDownloadService) => {
    expect(service).toBeTruthy();
  }));
});
