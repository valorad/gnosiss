import { Component, OnInit } from '@angular/core';


interface IPicker {
  shown: boolean
}

@Component({
  selector: 'app-img-list',
  templateUrl: './img-list.component.html',
  styleUrls: ['./img-list.component.scss']
})
export class ImgListComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {
  }

  /* DatePicker settings start */

  dateFrom: any;
  dateTo: any;


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



}
