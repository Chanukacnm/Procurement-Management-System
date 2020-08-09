export class DataGridTable {

  public rowSelection: string;
  public enableSorting: boolean;
  public enableFilter: boolean;
  public enableColResize: boolean;
  public suppressSizeToFit: boolean;



  public dataGridColumns: DataGridColumnType[];
  public dataGridRows: object[];

  constructor(rowSelection: string, enableSorting: boolean, enableFilter: boolean, enableColResize: boolean, suppressSizeToFit: boolean,
    dataGridColumns: DataGridColumnType[] , dataGridRows: object[])
  {

    this.rowSelection = rowSelection;
    this.enableSorting = enableSorting;
    this.enableFilter = enableFilter;
    this.enableColResize = enableColResize;
    this.suppressSizeToFit = suppressSizeToFit;

    this.dataGridColumns = dataGridColumns;
    this.dataGridRows = dataGridRows;

   }

}

//export class DataGridColumn {
//  public headerName: string;
//  public field: string;
//  public hide: boolean;
//  public type: string;
//  public filter: string;
//  public editable: boolean;
//  public width: number;

//  constructor(headerName: string, field: string, hide: boolean, type: string, filter: string, editable: boolean, width: number)
//  {
//    this.headerName = headerName;
//    this.field = field;
//    this.hide = hide;
//    this.type = type;
//    this.filter = filter;
//    this.editable = editable;
//    this.width = width;
//  }

//}

export interface DataGridColumnType {
  id: number;
  text: string;
}
