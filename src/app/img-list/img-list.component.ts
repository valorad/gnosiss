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
    {value: 'Landsat8', viewValue: 'LandSat8 OLI_TRIS'},
  ]
  /*  Satellite end  */

  /*  place start  */
  places = [
    {value: 'Beijing', viewValue: '北京'},
    {value: 'Shijiazhuang', viewValue: '石家庄'},
    {value: 'Taiyuan', viewValue: '太原'},
    {value: 'Baoji', viewValue: '宝鸡'},
    {value: 'Chengdu', viewValue: '成都'},
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

  
  queryPlace: object = {
    satellite: '',
    fromDate: '',
    toDate: '',
    place: ''
  }

  queryPos: object = {
    location: [150.0000000, 30.0000000],
    hWidth: "0.955050",
    hHeight: "0.863465",
    fromDate: '',
    toDate: ''
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

  async showMetImages(query: any) {

    // step 1: fetch result
    let imgs: any = await this.fetchImgs(query);

    // step 2: attach thumbnails
    imgs = await this.assembleThumb(imgs);

    // step 3: assign value back
    this.foundImg = imgs;

  }

  /* img query settings end */

}
