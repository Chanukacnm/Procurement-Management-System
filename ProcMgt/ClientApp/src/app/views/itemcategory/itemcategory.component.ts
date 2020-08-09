import { Component, OnInit } from '@angular/core';
import { StatusService } from '../../services/status.service';
import { ButtonRenderer } from '../renderer/button-renderer/button-renderer.component';
import { DeleteButtonRenderer } from '../renderer/button-renderer/deletebutton-renderer.component';
import { Itemcategory } from '../../models/itemcategory';



@Component({
  selector: 'app-itemcategory',
  templateUrl: './itemcategory.component.html',
  styleUrls: ['./itemcategory.component.scss']
})
export class ItemcategoryComponent implements OnInit {

  private objItemcategory: Itemcategory;
  private context;
  private frameworkComponents;
  private lststatus;
  private gridApi;
  private gridColumnApi;

  constructor(private statusService: StatusService)
  {
    this.context = { componentParent: this };
    this.frameworkComponents = {
      buttonRenderer: ButtonRenderer,
      deletebuttonRenderer: DeleteButtonRenderer
    }
  }

  ngOnInit() {
    this.objItemcategory = new Itemcategory();
    this.objItemcategory.itemCategoryName = "";
    this.objItemcategory.itemCategoryID = "";

    this.lststatus = this.statusService.getStatusList();
  }


  columnDefs = [
    { headerName: 'Category Name', field: 'categoryName', width: 100, suppressMenu: true  },
    { headerName: 'Category Code', field: 'CacegoryCode', width: 130, suppressMenu: true  },
    { headerName: 'Price', field: 'price', width: 70, suppressMenu: true },

    {
      headerName: 'Edit',
      cellRenderer: "buttonRenderer", width: 70, suppressMenu: true
    },
    {
      headerName: 'Delete',
      cellRenderer: "deletebuttonRenderer", width: 70, suppressMenu: true
    }

  ];

  rowData = [
    { categoryName: 'Toyota', CacegoryCode: 'Celica', price: 35000 },
    { categoryName: 'Ford', CacegoryCode: 'Mondeo', price: 32000 },
    { categoryName: 'Porsche', CacegoryCode: 'Boxter', price: 72000 }
  ];

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.sizeColumnsToFit();
  }

  GridEditCellClicked(rowIndex, Header) {
    alert('EditIndex :' + rowIndex + ',Header :' + Header);
  }

  GridDeleteCellClicked(rowIndex, Header) {
    alert('DeleteIndex :' + rowIndex + ',Header :' + Header);
  }

}
