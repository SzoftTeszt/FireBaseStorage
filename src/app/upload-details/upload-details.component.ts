import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UploadFileService } from '../upload-file.service';
import { FileUpload } from '../file-upload';

@Component({
  selector: 'app-upload-details',
  templateUrl: './upload-details.component.html',
  styleUrls: ['./upload-details.component.css']
})
export class UploadDetailsComponent {
  @Input() file!:FileUpload;
  @Output() openPdf: EventEmitter<any> = new EventEmitter();

  open(event:any){
    this.openPdf.emit(event)
  }
  constructor (private uploadFileService: UploadFileService){}

  deleteFile(fileUpLoad:FileUpload){
    this.uploadFileService.deleteFiles(fileUpLoad);
  }
}
