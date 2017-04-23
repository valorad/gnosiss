import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http'
import { Observable } from 'rxjs/Observable';

import { DataService } from './data.service';

@Injectable()
export class ImgQueryService {

  constructor(private dataService: DataService) { }

  dataUrl: string = "/assets/data/imgInfo.json";
  fakeResponseUrl: string = "/assets/data/img-fakeResponse.json";

  

  getMetImgs(query: Object): Observable<any> {
    return this.dataService.getRawData(this.fakeResponseUrl);
  }

  formQueryURL(query: Object): string {
    let params = new URLSearchParams();
    for(let key in query) {
      params.set(key, query[key]) 
    }
    return params.toString();
  }

}
