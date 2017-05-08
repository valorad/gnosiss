import { FileUploader } from 'ng2-file-upload';

export class GnosissUploader {

  constructor(_config?: any) {
    if (_config) {
      this.uploader = new FileUploader(_config);
    }
  }

  public uploader: FileUploader;
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;
 
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
 
  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

}