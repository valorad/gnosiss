import { Component, OnInit } from '@angular/core';

import { ImgQueryService } from '../_gnosiss_services/img-query.service';

@Component({
  selector: 'app-img-detail',
  templateUrl: './img-detail.component.html',
  styleUrls: ['./img-detail.component.scss']
})
export class ImgDetailComponent implements OnInit {

  constructor(private imgQueryService: ImgQueryService) { }

  ngOnInit() {
    this.imgQueryService.getMetImgs("the_name_from_url").subscribe(
      (resImg) => {
        if (resImg != null) {
          this.image = resImg;
          this.timeElapsed = this.calcTimeElapsed(this.image['dateInfo']['timeAcquired'], this.image['dateInfo']['timeEnd']);
        }
      }
    );
  }

  image: object = {
    name: "",
    extension: "",
    path: "",
    basicInfo: {
        satellite: "",
        dataType: "",
        sensor: "",
        time: "",
        stripeNo: 0,
        rowNo: 0,
        SEA: 0,
        azimuth: 0,
        observatory: ""
    },
    dateInfo: {
        timeAcquired: null,
        timeEnd: null
    },
    spatialInfo: {
        latitude: 0,
        longitude: 0
    }
  }

  timeElapsed: number = 0;

  calcTimeElapsed(startDate: Date, endDate: Date = null) {
    let today = new Date();
    let oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
    let oneSecond = 1000;

    let TimeElapsed: number;

    if (endDate === null) {
      endDate = today;
    }

    return TimeElapsed = Math.round(Math.abs((endDate.getTime() - startDate.getTime())/(oneSecond)));;
  }

}

