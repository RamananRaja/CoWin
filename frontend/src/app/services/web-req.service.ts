import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class WebReqService {

  constructor(private http: HttpClient) { }

  readonly ROOT_URL = 'http://localhost:3000'

  convertToJson(formData: FormData): Observable<any> {
    console.log(formData);
    return this.filePost<any>(`/xlsxToJSON`, formData);
  }

  filePost<FormData>(uri: string, data: FormData): Observable<any> {
    return this.http.post<any>(`${this.ROOT_URL}/${uri}`, data, {
      headers: {

      },
      reportProgress: true,
      observe: 'events'
    });
  }
  /*
  submitData(processedData: any) {
    console.log(`${this.ROOT_URL}/submitData`);
    return this.http.post(`${this.ROOT_URL}/submitData`, processedData);
  }*/

  saveData(data: any) {
    console.log(`${this.ROOT_URL}/saveData`)
    return this.http.post(`${this.ROOT_URL}/saveData`, { data });
  }
}
