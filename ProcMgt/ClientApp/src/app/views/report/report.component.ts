import { Component, OnInit  } from '@angular/core';
import { ReportMethodService } from '../../services/reportingmethod.service';
import { ButtonRenderer } from '../renderer/button-renderer/button-renderer.component';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Report } from '../../models/report';
import * as moment from 'moment';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
}) 
export class ReportComponent implements OnInit{

  private frameworkComponents;
  private context;
  private allRequestHistory;
  public show: boolean = false;
  private ApprovedHistory;
  public show2: boolean = false;
  private GrnHistory;
  private GrnHistrylist: any;
  public show3: boolean = false;
  public show4: boolean = true;
  public show5: boolean = false;
  public show6: boolean = false;
  private reconciliationHistory;

  private objReport: Report;

  private FromDate: string;
  private ToDate: string;

  private supplierArray: any[];  //rajitha


  constructor(private reportingmethodService: ReportMethodService, private httpClient: HttpClient) {
    this.context = { componentParent: this };
    this.frameworkComponents = {
      buttonRenderer: ButtonRenderer
    }
  }

  ngOnInit() {
    this.objReport = new Report();
    this.objReport.fromDate = (moment().format("YYYY-MM-01"));
    this.objReport.toDate = (moment().format("YYYY-MM-DD"));
    this.FromDate = this.objReport.fromDate;
    this.ToDate = this.objReport.toDate;
    //console.log((moment().format("YYYY-MM-DD")));
    console.log("aaa=>",(moment().startOf('month').format("YYYY-MM-DD")));
    console.log("zzz=>", (moment().endOf('month').format("YYYY-MM-DD")));

    

  }

  selectReport(event: any) {
    if ((<HTMLInputElement>document.getElementById("reportType")).value == "ReconHist") {
      this.show4 = false;
      this.show5 = true;
      this.show = false;
      this.show2 = false;
      this.show3 = false;
      
    }
    else {
      this.show4 = true;
      this.show5 = false;
    }
  }


  testReport() {


    // *********** working pdf download **********
    //this.reportingmethodService.testReportGetPDF();
    //if () {

    //}
    
    //console.log("ffff=>", (<HTMLInputElement>document.getElementById("reportType")).value);
    console.log(this.objReport);
    this.FromDate = this.objReport.fromDate;
    this.ToDate = this.objReport.toDate;
    if ((<HTMLInputElement>document.getElementById("reportType")).value == "RqstHist") {

      //this.reportingmethodService.testReportGetPDF()
      //  .subscribe(response => {

      //    if (response) {

      //      this.allRequestHistory = response;
      //    }
      //  }, err => {
      //    alert('in-Error');
      //  });

      this.reportingmethodService.ReportPDF(this.objReport)
        .subscribe(response => {
          if (response) {

            this.allRequestHistory = response;
            console.log("vvvv=>", this.allRequestHistory);
            this.show = true;
            this.show2 = false;
            this.show3 = false;
            this.show6 = false;
          }
        }, err => {
          alert('in-Error');
        });
    }
    else if ((<HTMLInputElement>document.getElementById("reportType")).value == "ApprHist") {


      this.reportingmethodService.ReportApprovedHistory(this.objReport)
        .subscribe(response => {
          if (response) {

            this.ApprovedHistory = response;
            console.log("qqqq=>", this.ApprovedHistory);
            this.show = false;
            this.show2 = true;
            this.show3 = false;
            this.show6 = false;
          }
        }, err => {
          alert('in-Error');
        });

    }
    else if ((<HTMLInputElement>document.getElementById("reportType")).value == "GRNHist") {
      this.reportingmethodService.GRNReportHistory(this.objReport)
        .subscribe(response => {
          if (response) {

            this.GrnHistory = response;
            console.log("qqqq=>", this.GrnHistory);
            this.show = false;
            this.show2 = false;
            this.show3 = true;
            this.show6 = false;
            this.GrnHistrylist = [];
            for (var i = 0; i < this.GrnHistory.length; i++) {
              this.GrnHistrylist = this.GrnHistory[i];
              //console.log("zzzz=>", this.GrnHistrylist['recivedDate']);
              //console.log("dddd=>", moment(this.GrnHistrylist['recivedDate']).format('YYYY-MM-DD'));

              this.GrnHistrylist['recivedDate'] = moment(this.GrnHistrylist['recivedDate']).format('YYYY-MM-DD');

            }

            //console.log("ssss=>", this.GrnHistrylist);
          }
        }, err => {
          alert('in-Error3');
        });

    }
    else if ((<HTMLInputElement>document.getElementById("reportType")).value == "ReconHist") {

      var datemonth = ((<HTMLInputElement>document.getElementById("monthyear")).value);

      if (datemonth == "") {
        alert("Please Select Month!");
        return false;
      }

      this.objReport.fromDate = (moment(datemonth).startOf('month').format("YYYY-MM-DD"));
      this.objReport.toDate = (moment(datemonth).endOf('month').format("YYYY-MM-DD"));

      console.log("mmmm=>", this.objReport);
      this.FromDate = this.objReport.fromDate;
      this.ToDate = this.objReport.toDate;

      this.reportingmethodService.ReconciliationHistory(this.objReport)
        .subscribe(response => {
          if (response) {

            this.reconciliationHistory = response;

            console.log("qqqq=>", this.reconciliationHistory);

            this.show = false;
            this.show2 = false;
            this.show3 = false;
            this.show6 = true;

          }
        }, err => {
          alert('in-Error4');
          this.show = false;
          this.show2 = false;
          this.show3 = false;
          this.show6 = true;
        });


    }
      //rajitha

  
      //end


    //  .subscribe(Response => {

    //    debugger;
    //      alert('Gen Rpt Successful');
    //      var result = Response;



    //  }, err => {
    //      alert('Gen Rpt Unsuccessful ');
    //  });

    //this.httpClient
    //  .fetch(url, { method, body, headers })
    //  .then(response => response.blob())
    //  .then(blob => URL.createObjectURL(blob))
    //  .then(url => {
    //    window.open(url, '_blank');
    //    URL.revokeObjectURL(url);
    //  });

    //fetch("https://localhost:44353/api/PaymentMethod/RenderReport", {
    //  method: 'POST'
    //})
    //  .then(response => response.blob())
    //  .then(blob => URL.createObjectURL(blob))
    //  .then(url => {
    //    window.open(url, '_blank');
    //  });

  }
  //rajitha
  TestPoreport() {

    var fromDate = ((<HTMLInputElement>document.getElementById("dtFromdate")).value);
    var toDate = ((<HTMLInputElement>document.getElementById("dtTodate")).value);
    if (fromDate == "") {
      alert("Please Select fromdate!");
      return false;
    }
    if (toDate == "") {
      alert("Please Select todate!");
      return false;
    }

    this.objReport.fromDate = fromDate;
    this.objReport.toDate = toDate;

    console.log("mmmm=>", this.objReport);
    this.FromDate = this.objReport.fromDate;
    this.ToDate = this.objReport.toDate;

    this.reportingmethodService.AllSuppliersID(this.objReport)
      .subscribe(response => {

        console.log('POreport=====================');
        console.log(response);
        this.supplierArray = response;


      });

  }
  
  //TestPONumbers() {








  //}


  //end




  //reportServer: string = 'http://lp003/ReportServer';
  //reportUrl: string = 'Reports/report/testRpt1';
  //showParameters: string = "true";
  //parameters: any = {
  //  "SampleStringParameter": null,
  //  "SampleBooleanParameter": false,
  //  "SampleDateTimeParameter": "9/1/2017",
  //  "SampleIntParameter": 1,
  //  "SampleFloatParameter": "123.1234",
  //  "SampleMultipleStringParameter": ["Parameter1", "Parameter2"]
  //};
  //language: string = "en-us";
  //width: number = 100;
  //height: number = 100;
  //toolbar: string = "true";


}
