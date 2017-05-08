import { Component, OnInit } from '@angular/core';

import { FileUploader } from 'ng2-file-upload';

import { GnosissUploader } from './gnosissUploader.class';

@Component({
  selector: 'gnosiss-img-upload',
  templateUrl: './img-upload.component.html',
  styleUrls: ['./img-upload.component.scss']
})
export class ImgUploadComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.imgUploader.uploader.onWhenAddingFileFailed = () => {
      this.alertFailed();
    };
  }

  private imgUploader: GnosissUploader = new GnosissUploader(
    {
      url: "string",
      allowedMimeType:["application/gzip","application/tar+gzip", "application/tar"]
    } 
  );

  private thumbnailUploader = new GnosissUploader(
    {
      url: "string",
      allowedMimeType:["image/jpeg", "image/png"]
    } 
  );

  private alertFailed = () => {
    window.alert("failed to add");
    console.log("failed to add");
  };
  

}
