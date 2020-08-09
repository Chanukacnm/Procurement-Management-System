import { Component, OnInit } from '@angular/core';
import { ItemcategoryService } from '../../services/itemcategory.service';
import { ItemtypeService } from '../../services/itemtype.service';
import { MakeService } from '../../services/make.service';
import { ModelService } from '../../services/model.service';
import { DepartmentService } from '../../services/department.service';
import { AssetcodeService } from '../../services/assetcode.service';
import { StatusService } from '../../services/status.service';




@Component({
  selector: 'app-assetregistrysearch',
  templateUrl: './assetregistrysearch.component.html',
  styleUrls: ['./assetregistrysearch.component.scss']
})
export class AssetregistrysearchComponent implements OnInit {

  private lstcategory;
  private lstType;
  private lstMake;
  private lstModel;
  private lstDepartment;
  private lstAssetCode;
  private lstStatus;

  constructor(private itemCategoryService: ItemcategoryService, private itemTypeService: ItemtypeService,
    private makeService: MakeService, private modelService: ModelService, private departmentService: DepartmentService,
    private assetCodeService: AssetcodeService, private statusService: StatusService) { }

  ngOnInit() {
    this.lstcategory = this.itemCategoryService.getItemCategroyList();
    this.lstType = this.itemTypeService.getItemTypeList();
    this.lstMake = this.makeService.getMakeList();
    this.lstModel = this.modelService.getModelList();
    this.lstDepartment = this.departmentService.getdepartmentList();
    this.lstAssetCode = this.assetCodeService.getAssetCodeList();
    this.lstStatus = this.statusService.getStatusList();
  }

  columnDefs = [
    { headerName: 'Item Category', field: 'itemcategory', minwidth: 176},
    { headerName: 'Item Type', field: 'itemtype', width: 140 },
    { headerName: 'Make', field: 'make', width: 140 },
    { headerName: 'Model', field: 'model', width: 140 },
    { headerName: 'Department', field: 'department', width: 140  },
    { headerName: 'Asset Code', field: 'assetcode', width: 140  },
    { headerName: 'Status', field: 'status', width: 140  },

  ];

  rowData = [
    { itemcategory: 'Electronic', itemtype: 'Item Type 1', make: 'HP', model: 'elitebook', department: 'Department 1', assetcode: 'Asset Code 1', status:'Status 1'}

  ];

}
