import { TestBed, inject } from '@angular/core/testing';

import { ThumbnailService } from './thumbnail.service';

describe('ThumbnailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThumbnailService]
    });
  });

  it('should ...', inject([ThumbnailService], (service: ThumbnailService) => {
    expect(service).toBeTruthy();
  }));
});
