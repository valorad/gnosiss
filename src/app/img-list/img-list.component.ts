import { Component, OnInit } from '@angular/core';

import { ImgQueryService } from '../_gnosiss_services/img-query.service';
import { ThumbnailService } from '../_gnosiss_services/thumbnail.service';

interface IPicker {
  shown: boolean
}

@Component({
  selector: 'app-img-list',
  templateUrl: './img-list.component.html',
  styleUrls: ['./img-list.component.scss']
})
export class ImgListComponent implements OnInit {

  constructor(
    private imgQueryService: ImgQueryService,
    private thumbnailService: ThumbnailService
  ) {

  }

  ngOnInit() {
  }

  /*  Satellite start  */
  selectedSatellite: string;
  satellites = [
    {value: 'landsat8', viewValue: 'LandSat8 OLI_TRIS'},
  ]
  /*  Satellite end  */

  /*  place start  */
  selectedPlace: string;
  places = [
    {value: 'chengdu', viewValue: 'Cheng Du'},
  ]
  /*  place end  */


  /* DatePicker settings start */

  modalShown: boolean = false;

  dtf: IPicker = {
    shown: false
  };

  dtt: IPicker = {
    shown: false
  };

  togglePicker(picker: IPicker) {
    picker.shown = !picker.shown;
    this.modalShown = !this.modalShown;
  }

  closeAllPickers() {
    this.dtf.shown = false;
    this.dtt.shown = false;
    this.modalShown = false;
  }

  /* DatePicker settings end */

  /* img query settings start */

  foundImg: Array<object> = [];

  
  queryPlace: Object = {
    fromDate: '',
    toDate: '',
    place: 'chengdu'
  }

  queryPos: Object = {
    latitude: '30.0000000',
    longitde: '150.0000000'
  }

  showMetImages(query) {

    let imgsWithThumbnails;

    let formImgList: Promise<any> = new Promise(
      (resolve, reject) => {
        // step 1: fetch result
        this.imgQueryService.getMetImgs(query).subscribe(
          (resImages: any) => {
            if (resImages != null) {
              imgsWithThumbnails = resImages;
              resolve(imgsWithThumbnails);
            }
          }
        );
      }
    );

    formImgList
    .then((imgsWithThumbnails) => {
      // step 2: attach thubnails
      //console.log(imgsWithThumbnails);
      for(let img of imgsWithThumbnails) {
        this.thumbnailService.getAThumbnail(img.name).subscribe(
          (resThumb) => {
            img.thumbnail = resThumb[0].thumbnails[0];
          }
        );
      }
    })
    .then(()=> {
      // step 3: assign value back
      console.log(imgsWithThumbnails);
      this.foundImg = imgsWithThumbnails;
    })
    ;

  }

  /* img query settings end */

}
