import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import {  AngularFireStorage } from '@angular/fire/compat/storage';
import { FileUpload } from './file-upload';
import { finalize, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  path="/upload";
  // fileUploads:any;
  constructor(
    private db: AngularFireDatabase, 
    private storage:AngularFireStorage
    ) { }

    // isExist(fileUpLoad:FileUpload){
    //   this.getAllFiles().snapshotChanges().pipe(
    //     map( ch => ch.map(c=> ({key: c.payload.key, ...c.payload.val() })))
    //   ).subscribe(
    //     (f)=>{
    //       this.fileUploads=f;
    //       if (!this.fileUploads) return false;
    //       return (this.fileUploads.find((value:FileUpload)=>{
    //         console.log("v",value.name);
    //         console.log("f",fileUpLoad.file.name);
    //         value.name == fileUpLoad.file.name
    //       }) )        
    //     }
    //   )     
    //   // console.log(this.fileUploads);
    //   // console.log("Tipus",typeof(this.fileUploads))
     
    // }

    pushFileToStorage(fileUpLoad:FileUpload)
    {
      const filePath= `${this.path}/${fileUpLoad.file.name}`;
      const storageRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath,fileUpLoad.file);
  
      
        uploadTask.snapshotChanges().pipe(
          finalize(
            ()=>{
              storageRef.getDownloadURL().subscribe(
                (donwloadUrl)=>{
                  fileUpLoad.url=donwloadUrl;
                  fileUpLoad.name= fileUpLoad.file.name;
                  this.db.list(this.path).push(fileUpLoad)
                }
              )
            }
          )
        ).subscribe();      
        return uploadTask.percentageChanges();
      
     
    }

    getAllFiles(): AngularFireList<FileUpload>{
      return this.db.list(this.path)
    }
   
    deleteFiles(file:FileUpload){
      this.deleteFileDatabase(file.key).then(
        ()=>{
          this.deleteFileStorage(file.name);
        }
      )
      .catch((e)=>console.log(e));   
    }

    private deleteFileDatabase(key:string){
      return this.db.list(this.path).remove(key);
    }
    private deleteFileStorage(name:string){
      this.storage.ref(this.path).child(name).delete();
    }
}
