import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { Model } from '../../models/model';
import { ItemtypeService } from '../../services/itemtype.service';
import { MakeService } from '../../services/make.service';
import { ModelService } from '../../services/model.service';
import { StatusService } from '../../services/status.service';
import { ButtonRenderer } from '../renderer/button-renderer/button-renderer.component';
import { DeleteButtonRenderer } from '../renderer/button-renderer/deletebutton-renderer.component';
import { DeletepopupComponent } from '../deletepopup/deletepopup.component';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material'
import { MatDialogModule } from '@angular/material/dialog';
import { DataGridTable } from '../../models/datagridtable';
import { FileuploadService } from '../../services/fileupload.service';
import { Response } from 'selenium-webdriver/http';
import { Uploadfile } from '../../models/uploadfile';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent implements OnInit {

  private objModel: Model;
  private objFileupload: Uploadfile;
  private lstItem;
  private lstMake;
  private lstStatus;
  private context;
  private frameworkComponents;
  private gridApi;
  private gridColumnApi;
  selectedItemType = '';
  selectedMake = '';
  private isEditMode = false;
  private gridModel: DataGridTable;
  private columnDefs;
  private rowData;
  private objModelDelete: Model;
  public progress: number;
  public message: string;
  public imagePath: string;
  public filename: string;
  public show2: boolean = false;
  public show: boolean = true;
  private imgUrl;
  private uploadFileID;
  private formData;
  private oldID;
  private newID;
  @Output() public onUploadFinished = new EventEmitter();
  private isDisable = false; //--- Add By Nipuna Francisku


  constructor(private http: HttpClient, private fileuploadService: FileuploadService, private itemTypeService: ItemtypeService, private makeService: MakeService, private statusService: StatusService,
    private modelService: ModelService, public dialog: MatDialog)
  {
    this.context = { componentParent: this };
    this.frameworkComponents = {
      buttonRenderer: ButtonRenderer,
      deletebuttonRenderer: DeleteButtonRenderer
    }
  }
   
  ngOnInit() {
    this.objModel = new Model();
    this.objFileupload = new Uploadfile();
    this.objModel.modelCode = "";
    this.objModel.modelName = "";
    this.objModel.isActive = false;
    this.objModel.itemTypeID = "";
    //var UserDet = JSON.parse(localStorage.getItem("UserDetails"));
    //this.objModel.userID = UserDet.userId;
    this.objModel.makeID = "";

    this.itemTypeService.getItemTypeList().subscribe(response => {
      this.lstItem = response;
      
    }, err => {
      //alert('in-Error itemtype');
    });

    //this.makeService.getMakeList().subscribe(response => {
    //  this.lstMake = response;
    //}, err => {
    //  alert('in-Error make');
    //  });

    this.modelService.getModelGridList().subscribe(response => {

      if (response) {

        this.gridModel = new DataGridTable(response.rowSelection, response.enableSorting, response.enableFilter, response.enableColResize, response.suppressSizeToFit, response.dataGridColumns, response.dataGridRows);
        this.CreateModel(this.gridModel);
      }
    }, err => {
      //alert('in-Error');
    });
    //this.lstStatus = this.statusService.getStatusList();
  }


  CreateModel(gridModel: DataGridTable) {

    this.columnDefs = gridModel.dataGridColumns;
    this.rowData = gridModel.dataGridRows;

    this.columnDefs.push({
      headerName: 'Edit',
      cellRenderer: "buttonRenderer", width: 100, suppressMenu: true, lockPosition: true,
    });

    //----------------------------- Add By Nipuna Franciku -----------------------------------------------------

    //this.columnDefs.push({
    //  headerName: 'Edit',
    //  filed: 'IsTansactions',
    //  cellRenderer: "buttonRenderer", width: 100, suppressMenu: true, lockPosition: true, suppressNavigable: true,
    //  //editable:true,
    //  cellRendererParams: function (params) {
    //    if (params.data.IsTansactions == "True") {
    //      params.data.enableButton = "False";
    //    }
    //  }
    //});
    //------------------------------------------------------------------------------------------------------

    //this.columnDefs.push({
    //  headerName: 'Delete',
    //  cellRenderer: "deletebuttonRenderer", width: 70, suppressMenu: true
    //});
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.sizeColumnsToFit();
  }

  ItemTypeChanged(objItemType) {
    //this.objModel.itemTypeID = this.selectedItemType;
    this.selectedItemType = objItemType;
    this.objModel.makeID = "00000000-0000-0000-0000-000000000000";
    this.selectedMake = "";
    this.lstMake = null;
    this.makeService.getSpecMakeList(this.objModel)
      .subscribe(Response => {
        this.lstMake = Response.resultObject;
        console.log("cccc=>", this.lstMake);
      }, err => {
        //alert('Make List Error');
      });
  }

  MakeChanged(objMake) {
    //this.objModel.makeID = this.selectedMake;
    this.selectedMake = objMake;
  }

  GridEditCellClicked(node) {

    this.isEditMode = true;
    this.isDisable = false; //----- Add By Nipuna Franciku
    this.show2 = true;
    this.show = false;
    console.log("data=>", node.data);
    this.objModel.modelID = node.data.ModelID;

    this.objModel.uploadFileID = node.data.UploadFileID;
    this.oldID = node.data.UploadFileID;
    this.newID = node.data.UploadFileID;
    this.objModel.modelName = node.data.ModelName;
    this.objModel.modelCode = node.data.ModelCode;
    this.objModel.isActive = node.data.IsActive;
    this.objModel.itemTypeName = node.data.ItemTypeName;
    this.objModel.makeName = node.data.MakeName;

    this.selectedItemType = node.data.ItemTypeID;
    
    this.objModel.itemTypeID = node.data.ItemTypeID;
    this.objModel.makeID = node.data.MakeID;
    this.selectedMake = node.data.MakeID;

    this.makeService.getSpecMakeList(this.objModel)
      .subscribe(Response => {
        this.lstMake = Response.resultObject;
        console.log("cccc=>", this.lstMake);
      }, err => {
        //alert('Make List Error');
      });
    
    var stringValue = node.data.IsActive;
    var boolValue = getBoolean(stringValue);
    this.objModel.isActive = boolValue;
    function getBoolean(value) {
      switch (value) {
        case true:
        case "True":
          return true;
        default:
          return false;
      }
    }

    this.objFileupload.uploadFileID = node.data.UploadFileID;
    if (this.objFileupload.uploadFileID == "") {
      
      this.imagePath = null; 
    }
    else {
      this.fileuploadService.getuploadImage(this.objFileupload)
      //  .then(success)
      //  .cathch(exception);

      //function success(response) {
      //  var result = response.resultObject;
      //  var imgurl = result['uploadFilePath'];
      //  this.imagePath = imgurl;
      //  Swal.close()
      //  return response.data;
      //}
      //function exception(ex) {
      //  return (ex);
      //}
        .subscribe(response => {
          var result = response.resultObject;
          var imgurl = result['uploadFilePath'];
          this.imagePath = imgurl;
        }, err => {

        });
    }

    //-------------- Add By Nipuna Franciku -------------------------

    if (node.data.IsTansactions == "True") {
      this.isDisable = true;
      //Swal.fire({

      //  icon: 'info',
      //  text: 'Not allowed to edit mode..!',

      //  showCloseButton: true,
      //  showConfirmButton: true,
      //  confirmButtonColor: '#61CD23'

      //});
    }
  //------------------------------------------------------------------

  }

  GridDeleteCellClicked(node) {
    this.objModelDelete = new Model();
    this.objModelDelete = node.data;

    const dialogRef = this.dialog.open(DeletepopupComponent, {
      width: '485px',
      height: '268px ',
      position: {
        top: '',
        bottom: '',
        left: '475px',
        right: ''
      }

    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Yes clicked');
        this.DeleteModel(this.objModelDelete);
      }
    });
  }

  public resetFile = (files) => {
    (<HTMLInputElement>document.getElementById("uploadCaptureInputFile")).value = "";
    //document.getElementById("uploadCaptureInputFile").value = "";
    this.message = null;
    this.progress = null;
    this.imagePath = null;
    //this.filename = null;
    this.newID = "";
    this.objModel.uploadFileID = "00000000-0000-0000-0000-000000000000"; 
  }

  public uploadFile = (files) => {
    if (files.length === 0) {
      alert('please attached image!');
      return false;
    }
    if (files[0].type.indexOf("image") == -1) {
      alert("Invalid File Type.!");
      this.resetFile(files);
      return false;
    }
    console.log("zzzz=>", files[0].type.indexOf("image"));
    let fileToUpload = <File>files[0];
    
    this.formData = new FormData();
    this.formData.append('file', fileToUpload, fileToUpload.name);
    //this.filename = fileToUpload.name;


    //this.fileuploadService.fileUploading(this.formData)
    //  .subscribe(event => {
    //    if (event.type === HttpEventType.UploadProgress)
    //      this.progress = Math.round(100 * event.loaded / event.total);
    //    else if (event.type === HttpEventType.Response) {

    //      this.onUploadFinished.emit(event.body);

    //      var msg = event.body['message'];
    //      var resultobj = event.body['resultObject'];
    //      this.uploadFileID = resultobj['uploadFileID'];
    //      var uploadpath = resultobj['uploadFilePath'];
    //      this.message = msg;
    //      console.log("vvvv=>", this.uploadFileID);
    //      console.log("qqqq=>", uploadpath);
    //      this.imagePath = uploadpath;
    //      this.objModel.uploadFileID = this.uploadFileID;
    //    }
    //  });
    
    this.http.post('https://localhost:44353/api/FileUpload/upload', this.formData, { reportProgress: true, observe: 'events' })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)          
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
                    
          this.onUploadFinished.emit(event.body);
          
          var msg = event.body['message'];
          var resultobj = event.body['resultObject'];
          this.uploadFileID = resultobj['uploadFileID'];
          var uploadpath = resultobj['uploadFilePath'];
          this.message = msg;
          console.log("vvvv=>", this.uploadFileID);
          console.log("qqqq=>", uploadpath);
          this.imagePath = uploadpath;
          this.objModel.uploadFileID = this.uploadFileID;
          this.newID = this.uploadFileID;
        }

      });
  }

  SaveModel(files) {
    console.log("ffff=>", (<HTMLInputElement>document.getElementById("uploadCaptureInputFile")).value);

    var val = (<HTMLInputElement>document.getElementById("uploadCaptureInputFile")).value;
    console.log("yyyy=>", this.progress);
    if (val != "" && this.progress == null) {

      Swal.fire({

        icon: 'info',
        text: 'Please Upload Image.!',

        showCloseButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#61CD23'

      });
      
      return false;
    }

    if (this.selectedItemType == "" || this.selectedMake == "" || this.objModel.modelCode == "" || this.objModel.modelName =="") {
      

      Swal.fire({

        icon: 'info',
        text: 'Please fill the mandatory fields',

        showCloseButton: true,
        showConfirmButton: true,

      });

      return false;
    }

    if (this.oldID == this.newID && this.oldID != "") {
      this.objModel.uploadFileID = this.newID;
    }
    else if (this.oldID != "")
    {
      

      this.objFileupload.uploadFileID = this.oldID;
      this.objFileupload.isDeleted = true;

      this.fileuploadService.updateFileupload(this.objFileupload)
        .subscribe(Response => {

        },err => {

        });
    }
    
    this.modelService.saveModel(this.objModel, this.isEditMode)
      .subscribe(Response => {
        if (!this.isEditMode) {

          var result = Response.resultObject;
          var result2 = Response.message;
          var result3 = Response.status;

          if (result3 == false) {
            Swal.fire({

              icon: 'error',
              text: result2,

              showCloseButton: true,
              showConfirmButton: true,
              confirmButtonColor: '#61CD23',

            });
            return false;
          }

          //console.log("result=>", result);
          this.gridModel = new DataGridTable(result.rowSelection, result.enableSorting, result.enableFilter, result.enableColResize, result.suppressSizeToFit, result.dataGridColumns, result.dataGridRows);
          this.CreateModel(this.gridModel);

          Swal.fire({
            icon: 'success',
            text: 'The record has been saved successfully',

            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#61CD23'

          });

          this.objModel.modelID = "00000000-0000-0000-0000-000000000000";
          this.objModel.itemTypeID = "";
          this.objModel.makeID = "";
          this.selectedMake = "";
          this.selectedItemType = "";
          this.objModel.modelCode = "";
          this.objModel.modelName = "";
          this.objModel.isActive = false;
          this.objModel.image = "";
          this.lstMake = null;
          this.message = null;
          this.imagePath = null;
          this.progress = null;
          this.resetFile(files);
          //this.filename = null;
          this.objModel.uploadFileID = "";
          this.isDisable = false; //----- Add By Nipuna Franciku

        }
        else {
          

          //alert('Updated Successfull');
          var result = Response.resultObject;
          var result2 = Response.message;
          var result3 = Response.status;

          if (result3 == false) {
            Swal.fire({

              icon: 'error',
              text: result2,

              showCloseButton: true,
              showConfirmButton: true,
              confirmButtonColor: '#61CD23',

            });
            return false;
          }

          //alert(result2);
          //console.log("result=>", result);

          this.gridModel = new DataGridTable(result.rowSelection, result.enableSorting, result.enableFilter, result.enableColResize, result.suppressSizeToFit, result.dataGridColumns, result.dataGridRows);
          this.CreateModel(this.gridModel);

          Swal.fire({
            icon: 'success',
            text: 'Records have been updated successfully',

            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#61CD23'

          });

          this.objModel.modelID = "00000000-0000-0000-0000-000000000000";
          this.objModel.itemTypeID = "";
          this.objModel.makeID = "";
          this.selectedMake = "";
          this.selectedItemType = "";
          this.objModel.modelCode = "";
          this.objModel.modelName = "";
          this.objModel.isActive = false;
          this.objModel.image = "";
          this.isEditMode = false;
          this.lstMake = null;
          this.message = null;
          this.progress = null;
          this.imagePath = null;
          //this.filename = null;
          this.objModel.uploadFileID = "";
          this.resetFile(files);
          this.isDisable = false; //----- Add By Nipuna Franciku


          this.show2 = false;
          this.show = true;
        }
      }, err => {
        alert('Save Unsuccessfully');
      });
  }

  DeleteModel(objModelDelete) {
    this.modelService.deleteModelList(objModelDelete)
      .subscribe(response => {

        alert('Deleted Successfully');

      }, err => {
        alert('Delete Unsuccessfull');
      });
  }

  reset(files) {
    this.objModel.modelID = "00000000-0000-0000-0000-000000000000";
    this.objModel.itemTypeID = "";
    this.objModel.makeID = "";
    this.selectedMake = "";
    this.selectedItemType = "";
    this.objModel.modelCode = "";
    this.objModel.modelName = "";
    this.objModel.isActive = false;
    this.objModel.image = "";
    this.isEditMode = false;
    this.lstMake = null;
    this.message = null;
    this.progress = null;
    this.imagePath = null;
    //this.filename = null;
    this.objModel.uploadFileID = "";
    this.resetFile(files);

    this.show2 = false;
    this.show = true;
    this.isDisable = false; //----- Add By Nipuna Franciku
  }

}
