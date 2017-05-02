import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { DataService } from './data.service';

@Injectable()
export class ThumbnailService {

  constructor(private dataService: DataService) { }

  fakeResponseUrl: string = "/assets/data/thumbnails.json";

  getAThumbnail(name: string): Observable<any> {
    return this.dataService.getRawData(this.fakeResponseUrl);
  }

}
