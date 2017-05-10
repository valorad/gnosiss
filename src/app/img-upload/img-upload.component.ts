import { Component, OnInit } from '@angular/core';

import { FileUploader } from 'ng2-file-upload';

import { GnosissUploader } from './gnosissUploader.class';

import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'gnosiss-img-upload',
  templateUrl: './img-upload.component.html',
  styleUrls: ['./img-upload.component.scss']
})
export class ImgUploadComponent implements OnInit {

  constructor( public snackBar: MdSnackBar ) { }

  ngOnInit() {
    this.imgUploader.uploader.onWhenAddingFileFailed = (item: any, filter: any, options: any) => {

      this.alertFailed(item.name);
    };

    this.thumbnailUploader.uploader.onWhenAddingFileFailed = (item: any, filter: any, options: any) => {

      this.alertFailed(item.name);
    };

    this.imgUploader.uploader.onAfterAddingFile = (fileItem: any) => {

      this.extractFileName(fileItem.file.name);
    };


  }

  private imgUploader: GnosissUploader = new GnosissUploader(
    {
      url: "/api/upload/img",
      queueLimit: "1"
    } 
  );

  private thumbnailUploader: GnosissUploader = new GnosissUploader(
    {
      url: "/api/upload/thumb",
      allowedMimeType:["image/jpeg", "image/png"]
    } 
  );

  private alertFailed: any = (item: string) => {
    this.openSnackBar(`${item} failed to add`, "Pity");
  };

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  private extractFileName: any = (filename: string) => {
    let strList = filename.split(".");
    this.rsImg.name = strList[0];
    let extension = "";
    for (let i = 1; i < strList.length; i++) {
      extension += strList[i];
      if (i < strList.length - 1) {
        extension += ".";
      }
    }
    this.rsImg.extension = extension;
  };

  private formData: any = () => {
    console.log(this.rsImg);

    if (this.imgUploader.uploader.queue.length <= 0) {
      this.openSnackBar(`You haven't specified an img to upload`, "Okay");
      return;
    }

    // upload data
    this.uploadImgThumbnails();

    // only after did


    // link thumbnail
    let thumbnails: [string] = [""];
      // clear array
    thumbnails.length = 0;

    for (let item of this.thumbnailUploader.uploader.queue) {
        item.onSuccess = (response:string, status:number, headers:any) => {
          console.log("Success");
          return {response, status, headers};
        }

        thumbnails.push(item.file.name);

    }

    // get name of this img
    this.thumbnails.name = this.rsImg.name;

    // assign value to local
    this.thumbnails.thumbnails = thumbnails;

    // post data to backend
  };

  private uploadImgThumbnails: any = () => {
    this.imgUploader.uploader.uploadAll();
    this.thumbnailUploader.uploader.uploadAll()
  };

  private rsImg: any = {
    name: "",
    extension: "",
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
        timeAcquired: "",
        timeEnd: ""
    },
    spatialInfo: {
        latitude: 0,
        longitude: 0
    }
  }

  private thumbnails: any = {
      name: "",
      thumbnails: [
        ""
      ]
  }
  
}
