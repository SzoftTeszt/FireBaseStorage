import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FirebaseStorage';
  src="https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  constructor (private ms:NgbModal){}
  public open (modal:any){
    this.ms.open(modal);
  }
  openPdf(event:any){
    console.log("Event",event)
    this.src=event.url;
    this.src="https://firebasestorage.googleapis.com/v0/b/file-f2ca5.appspot.com/o/upload%2FKaticaSQL_Feladat.pdf?alt=media&token=2ddcd967-d599-456c-88db-ce00784166e6";
    console.log(this.src);
  }
}
