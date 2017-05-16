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
  //selectedSatellite: string;
  satellites = [
    {value: 'LANDSAT8', viewValue: 'LandSat8 OLI_TRIS'},
  ]
  /*  Satellite end  */

  /*  place start  */
  //selectedPlace: string;
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
    satellite: '',
    fromDate: '',
    toDate: '',
    place: ''
  }

  queryPos: Object = {
    latitude: '30.0000000',
    longitde: '150.0000000'
  }

  public fetchImgs: ((string)=>Promise<any>) = (query) => {
    return new Promise((resolve, reject)=> {
      this.imgQueryService.getMetImgs(query).subscribe(
        (resImages: any) => {
          if (resImages != null) {
            resolve(resImages);
          }
        }
      );
    });
  };

  public fetchThumb: ((imgName: any)=>Promise<any>) = (imgName) => {
    return new Promise((resolve, reject) => {
        this.thumbnailService.getAThumbnail(imgName.name).subscribe(
          (resThumb) => {
            resolve(resThumb[0].thumbnail[0]);
          }
        );
    });
  };

  private assembleThumb: ((any)=> any) = async (imgs) => {
    for (let img of imgs) {
      img.thumbnail = await this.fetchThumb(img.name);
    }
    return imgs;
  };

  async showMetImages(query) {

    // step 1: fetch result
    let imgs = await this.fetchImgs(query);

    // step 2: attach thumbnails
    imgs = await this.assembleThumb(imgs);

    // step 3: assign value back
    this.foundImg = imgs;

  }

  /* img query settings end */

}
