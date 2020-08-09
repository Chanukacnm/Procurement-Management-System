import { Injectable } from '@angular/core';
import { Status } from '../models/status';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataGridTable } from '../models/datagridtable';

//import { saveAs } from 'file-saver';
import { map } from "rxjs/operators";
import { Subject } from 'rxjs';
import { HttpEventType} from '@angular/common/http';
import { Report } from '../models/report';

@Injectable({
  providedIn: 'root'
})
export class ReportMethodService {

  constructor(private http: HttpClient) {
    
  }

  testReportGetPDF() {
    

    //return this.http.get("https://localhost:44353/api/PaymentMethod/RenderReport", {
    //  headers: new HttpHeaders({
    //    "Content-Type": "application/json"
    //  })
    //});



    // ******* Working Download file ************* //
    //var file = "abc.jpg";

    //let fileName = file;
    //let checkFileType = fileName.split('.').pop();
    //var fileType;
    //if (checkFileType == "txt") {
    //  fileType = "text/plain";
    //}
    //if (checkFileType == "pdf") {
    //  fileType = "application/pdf";
    //}
    //if (checkFileType == "doc") {
    //  fileType = "application/vnd.ms-word";
    //}
    //if (checkFileType == "docx") {
    //  fileType = "application/vnd.ms-word";
    //}
    //if (checkFileType == "xls") {
    //  fileType = "application/vnd.ms-excel";
    //}
    //if (checkFileType == "png") {
    //  fileType = "image/png";
    //}
    //if (checkFileType == "jpg") {
    //  fileType = "image/jpeg";
    //}
    //if (checkFileType == "jpeg") {
    //  fileType = "image/jpeg";
    //}
    //if (checkFileType == "gif") {
    //  fileType = "image/gif";
    //}
    //if (checkFileType == "csv") {
    //  fileType = "text/csv";
    //}

    //this.DownloadFile(fileName, fileType)
    //  .subscribe(
    //    success => {
    //      saveAs(success, fileName);
    //      //debugger;
    //      //var url = URL.createObjectURL(success);
    //      //window.open(url, '_blank')
    //    },
    //    err => {
    //      alert("Server error while downloading file.");
    //    }
    //  );

        // ******* END :  Working Download file ************* //



    return this.http.get("https://localhost:44353/api/Report/GetDataRequestHistoryRpt", {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });


  }

  ReportPDF(objReport: Report): any {
    var data = JSON.stringify(objReport);
    return this.http.post("https://localhost:44353/api/Report/GetDataRequestHistoryReport", data, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  ReportApprovedHistory(objReport: Report): any {
    var data = JSON.stringify(objReport);
    return this.http.post("https://localhost:44353/api/Report/GetDataApprovedHistoryReport", data, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  //rajitha ------------------------------------------------------------

  AllSuppliersID(objReport: Report): any {
    var data = JSON.stringify(objReport);
    return this.http.post("https://localhost:44353/api/Report/GetAllSuppliers", data, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  SuppliersPONumber(objReport: Report): any {
    var data = JSON.stringify(objReport);
    return this.http.post("https://localhost:44353/api/Report/GetAllSuppliers", data, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }


 // end----------------------------------------------------------------------------------


  GRNReportHistory(objReport: Report): any {
    var data = JSON.stringify(objReport);
    return this.http.post("https://localhost:44353/api/Report/GetDataGRNdHistoryReport", data, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  ReconciliationHistory(objReport: Report): any {
    var data = JSON.stringify(objReport);
    return this.http.post("https://localhost:44353/api/Report/GetDataReconciliationHistoryReport", data, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  } 


  DownloadFile(filePath: string, fileType: string): Observable<any> {

    let fileExtension = fileType;
    let input = filePath;

    return this.http.get("https://localhost:44353/api/PaymentMethod/RenderReport" + "?fileName=" + input, {
      responseType: 'blob',
      observe: 'response'
    })
      .pipe(
        map((res: any) => {
          return new Blob([res.body], { type: fileExtension });
        })
      );
  }
  



}
