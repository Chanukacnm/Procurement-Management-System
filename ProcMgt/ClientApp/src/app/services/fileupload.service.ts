import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Uploadfile } from '../models/uploadfile';

@Injectable({
  providedIn: 'root'
})
export class FileuploadService {

  constructor(private http: HttpClient) { }

  fileUploading(formData): any {
    return this.http.post('https://localhost:44353/api/FileUpload/upload', formData, {
      reportProgress: true,
      observe: 'events'
    })

  }


  getuploadImage(objFileupload: Uploadfile): any {
    var data = JSON.stringify(objFileupload);

    return this.http.post("https://localhost:44353/api/FileUpload/getuploadImage/{id}", data, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  updateFileupload(objFileupload: Uploadfile): any {
    var data = JSON.stringify(objFileupload);

    return this.http.post("https://localhost:44353/api/FileUpload/UpadteFileUpload/{id}", data, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

}
