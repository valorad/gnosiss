import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class DataService {

  constructor(private http: Http) { }

  getRawData(url: string): any {
    let data = this.http.get(url).map(
      this.extractData
    )
    .catch(this.throwException);

    return data;
  }

  throwException(error: Response) {
    console.error(error);
    return Observable.throw(error || "Server Error");
  }

  extractData(res: Response) {
    let data = res.json() || [];
    return data;
  }

  getCookedData(url: string, extractMethod: (value: Response, index: number) => {}) {
    let data = this.http.get(url).map(
      extractMethod
    )
    return data;
  }

}