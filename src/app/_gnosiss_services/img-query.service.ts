import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';

import { DataService } from './data.service';

@Injectable()
export class ImgQueryService {

  constructor(private dataService: DataService) { }

  dataUrl: string = "/assets/data/imgInfo.json";
  fakeResponseUrl: string = "/assets/data/img-fakeResponse.json";

  

  getMetImgs(query: Object): Observable<any> {
    return this.dataService.getCookedData(this.fakeResponseUrl, this.finalizeImgInfo);
  }

  formQueryURL(query: Object): string {
    let params = new URLSearchParams();
    for(let key in query) {
      params.set(key, query[key]) 
    }
    return params.toString();
  }

  finalizeImgInfo(res: Response) {
    let img = res.json() || {};
    img.dateInfo.timeAcquired = (
             img.dateInfo.timeAcquired === "" ? null : new Date(img.dateInfo.timeAcquired)
    );
    img.dateInfo.timeEnd = (
             img.dateInfo.timeEnd === "" ? null : new Date(img.dateInfo.timeEnd)
    );
    return img;
  }

}
