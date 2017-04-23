import { TestBed, inject } from '@angular/core/testing';

import { ImgQueryService } from './img-query.service';

describe('ImgQueryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImgQueryService]
    });
  });

  it('should ...', inject([ImgQueryService], (service: ImgQueryService) => {
    expect(service).toBeTruthy();
  }));
});
