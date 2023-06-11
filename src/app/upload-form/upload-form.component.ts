import { Component } from '@angular/core';
import { FileUpload } from '../file-upload';
import { UploadFileService } from '../upload-file.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent {
  selectedFiles?: FileList;
  currentFile!: FileUpload;
  percentage =0;
  fileUploads:any;
  errorMessage="";
  showError=false;

  constructor (private uploadFileService: UploadFileService){
    this.uploadFileService.getAllFiles().snapshotChanges().pipe(
      map( ch => ch.map(c=> ({key: c.payload.key, ...c.payload.val() })))
    ).subscribe(
      (f)=>{
        this.fileUploads=f; 
    })
  }

  selectFile(event:any){
    this.selectedFiles = event.target.files;
    this.percentage=0;
    this.showError=false;
    console.log(this.selectedFiles);
  }

  upload(){
    const file=this.selectedFiles?.item(0);
    this.selectedFiles=undefined;

    if (file)
    {
      this.currentFile = new FileUpload(file);
          console.log(this.findElement(this.currentFile))    
          if (!this.findElement(this.currentFile))
          {

            console.log("Feltöltés");
            this.uploadFileService.pushFileToStorage(this.currentFile)
            .subscribe(
            {
                 next: (p)=> {this.percentage= Math.round(p?p:0); this.showError=false},
                error: (e)=> console.log(e)
               }
            )
          }
          else {
            console.log("Nincs feltöltés");
            this.showError=true;
            this.errorMessage="A fálj már fel van töltve!"
          }      
     }         
    } 
      
     
  


  findElement(file:FileUpload):boolean{
   return (this.fileUploads.find((value:FileUpload)=>{  
      // console.log("value",value.name);         
      // console.log("current",this.currentFile?.file.name);
      console.log("találat", value.name == this.currentFile?.file.name)         
      return value.name == this.currentFile?.file.name
    }) )
  
  }

}
