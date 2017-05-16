import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { DataService } from './data.service';

@Injectable()
export class ImgQueryService {

  constructor(private dataService: DataService) { }

  dataUrl: string = "/assets/data/imgInfo.json";
  //fakeResponseUrl: string = "/assets/data/img-fakeResponse.json";
  queryImgUrl: string = '/api/img/q';
  aImgUrl: string = '/api/img/name';
  postUrl: string = "/api/upload/imgInfo";

  public getTheImg: ((string)=> Observable<any>) = (name) => {
    return this.dataService.getCookedData(`${this.aImgUrl}/${name}`, this.finalizeImgInfo);
  };

  getMetImgs(query: Object): Observable<any> {
    let queryUrl = this.formQueryURL(query);
    return this.dataService.getCookedData(`${ this.queryImgUrl }/?${ queryUrl }`, this.finalizeImgInfo);
  }

  formQueryURL(query: any): string {
    let params = new URLSearchParams();
    for(let key in query) {
      params.set(key, query[key]) 
    }
    return params.toString();
  }

  finalizeImgInfo(res: Response) {
    let imgs = res.json() || [];
    for (let img of imgs) {
      img.dateInfo.timeAcquired = (
              img.dateInfo.timeAcquired === "" ? null : new Date(img.dateInfo.timeAcquired)
      );
      img.dateInfo.timeEnd = (
              img.dateInfo.timeEnd === "" ? null : new Date(img.dateInfo.timeEnd)
      );
    }
    return imgs;
  }

  postImgInfo(imgInfo: any) {
    return this.dataService.postJsonData(this.postUrl, imgInfo);
  }



}
