import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { DataService } from './data.service';

@Injectable()
export class ThumbnailService {

  constructor(private dataService: DataService) { }

  fakeResponseUrl: string = "/assets/data/thumbnails.json";
  postUrl: string = "/api/upload/thumbnailInfo";

  getAThumbnail(name: string): Observable<any> {
    return this.dataService.getRawData(this.fakeResponseUrl);
  }

  postThumbnailInfo(thumbInfo: any) {
    return this.dataService.postJsonData(this.postUrl, thumbInfo);
  }

}
