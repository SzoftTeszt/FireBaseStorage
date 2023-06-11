import { Component, Output, EventEmitter } from '@angular/core';
import { UploadFileService } from '../upload-file.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-upload-list',
  templateUrl: './upload-list.component.html',
  styleUrls: ['./upload-list.component.css']
})
export class UploadListComponent {
  fileUploads: any;

  @Output() openPdf: EventEmitter<any> = new EventEmitter();

  open(event:any){
    this.openPdf.emit(event)
  }

  constructor (private uploadFileService: UploadFileService){
    this.uploadFileService.getAllFiles().snapshotChanges().pipe(
      map( ch => ch.map(c=> ({key: c.payload.key, ...c.payload.val() })))
    ).subscribe(
      (f)=>{this.fileUploads=f; console.log("Files:",this.fileUploads)}
    )
  }
}
