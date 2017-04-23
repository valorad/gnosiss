import { Component, OnInit } from '@angular/core';
import { ImgQueryService } from '../_gnosiss_services/img-query.service';


interface IPicker {
  shown: boolean
}

@Component({
  selector: 'app-img-list',
  templateUrl: './img-list.component.html',
  styleUrls: ['./img-list.component.scss']
})
export class ImgListComponent implements OnInit {

  constructor(private imgQueryService: ImgQueryService) {

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
    this.imgQueryService.getMetImgs(query).subscribe(
      (resImages) => {
        if (resImages != null) {
          this.foundImg.push(resImages);
        }
      }
    );
  }

  /* img query settings end */

}
