import { Component, OnInit,ViewChild } from '@angular/core';
import { ButtonRenderer } from '../renderer/button-renderer/button-renderer.component';
import { DeleteButtonRenderer } from '../renderer/button-renderer/deletebutton-renderer.component';
import { Itemgroup } from '../../models/itemgroup';
import { ItemcategoryService } from '../../services/itemcategory.service';
import { MakeService } from '../../services/make.service';
import { ModelService } from '../../services/model.service';

@Component({
  selector: 'app-itemgroup',
  templateUrl: 'itemgroup.component.html',
  styleUrls: ['itemgroup.component.scss']
})

export class ItemgroupComponent implements OnInit {

  private gridApi;
  private gridColumnApi;

  private context;
  private frameworkComponents;

  private objItemGroup: Itemgroup;
  private lstCategory;
  private lstMake;
  private lstModel;

  constructor(private itemCategoryService: ItemcategoryService, private makeService: MakeService,
              private modelService : ModelService) {

    this.context = { componentParent: this };
    this.frameworkComponents = {
      buttonRenderer: ButtonRenderer,
      deletebuttonRenderer: DeleteButtonRenderer
    }
  }

  ngOnInit() {
    this.objItemGroup = new Itemgroup();
    this.objItemGroup.itemGroupName = "TestGroup";

    this.lstCategory = this.itemCategoryService.getItemCategroyList();
    this.lstMake = this.makeService.getMakeList();
    this.lstModel = this.modelService.getModelList();
  }

 

  columnDefs = [
    { headerName: 'Make', field: 'make' },
    { headerName: 'Model', field: 'model' },
    { headerName: 'Price', field: 'price' },
    {
      headerName: 'Edit',
      cellRenderer:"buttonRenderer"
     
    },
    {
      headerName: 'Delete',
      cellRenderer: "deletebuttonRenderer"
    }

   
  ];

  rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 }
  ];

  onSave() {

    this.rowData = [
      { make: 'Toyotasaved', model: 'Celica', price: 35000 },
      { make: 'Fordsaved', model: 'Mondeo', price: 32000 },
      { make: 'Porschesaved', model: 'Boxter', price: 72000 }
    ];
  }

  onSearch() {

    this.rowData = [
      { make: 'Toyotasearched', model: 'Celica', price: 35000 },
      { make: 'Fordsearched', model: 'Mondeo', price: 32000 },
      { make: 'Porschesearched', model: 'Boxter', price: 72000 }
    ];
  }

  onNEw() {

  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.sizeColumnsToFit();
  }


  GridEditCellClicked(rowIndex,Header) {
    alert('EditIndex :' + rowIndex + ',Header :' + Header );
  }

  GridDeleteCellClicked(rowIndex, Header) {
    alert('DeleteIndex :' + rowIndex + ',Header :' + Header);
  }
}
