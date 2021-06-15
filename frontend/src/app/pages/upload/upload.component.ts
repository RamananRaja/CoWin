import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { WebReqService } from '../../services/web-req.service';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  readonly SERVER_URL = "http://localhost:3000/";
  uploadedFile: any;
  processedData: any;
  temporaryData: any;

  constructor(private webreqservice: WebReqService) { }
  ngOnInit(): void {
  }

  onChangeUploadInput(event: any) {
    console.log(event.target.files);
    let newFile: File = {
      data: event.target.files[0],
      completed: false
    }
    this.temporaryData = newFile;
    console.log(this.temporaryData)
    this.convertToJson(newFile);
  }

  //
  convertToJson(newFile: File) {

    const formData: FormData = new FormData();
    formData.append('file', newFile.data);

    console.log(formData);
    console.log(newFile.data)
    this.webreqservice.convertToJson(formData).pipe(
      tap((e) => {

      }),
      map((event: any) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:

            break;
          case HttpEventType.Response:

            return event;
        }
      }),
      catchError((err: HttpErrorResponse) => {

        return of('update failed');
      })
    ).subscribe((res: any) => {
      if (res !== undefined && res.status === 501) {
        console.log(res.body);
      } else if (res !== undefined && res.status === 200) {
        if (res.body.success) {
          console.log(res.body);
          this.temporaryData.completed = true;
          this.processedData = res.body.data;
        } else {
          console.log(res.body);
        }
      } else {

      }
    });
  }



}
export interface File {
  data: any;
  completed: boolean;
}
