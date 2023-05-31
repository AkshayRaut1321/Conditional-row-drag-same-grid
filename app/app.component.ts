import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ColDef, GridReadyEvent,GetRowIdFunc,
  GetRowIdParams, } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { IOlympicData } from './interfaces';

@Component({
  selector: 'my-app',
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [rowSelection]="rowSelection"
    [suppressRowClickSelection]="suppressRowClickSelection"
    [animateRows]="true"
    [rowData]="rowData"
    [getRowId]="getRowId"
    (rowDragMove)="onRowDragMove($event)"
    (gridReady)="onGridReady($event)"
    (rowSelected)="onRowSelected($event)"
  ></ag-grid-angular> `,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    // { 
    //   field: 'checkbox', 
    //   rowDrag: this.canRowDrag,
    //   headerCheckboxSelection: true,
    //   checkboxSelection: true
    // },
    { 
      field: 'athlete', 
      rowDrag: this.canRowDrag,
      headerCheckboxSelection: true,
      checkboxSelection: true
    },
    { field: 'country' },
    { field: 'year', width: 100 },
    { field: 'date' },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
  ];
  public defaultColDef: ColDef = {
    width: 170,
    sortable: false,
    filter: false,
  };
  public rowData = [
    {
      athlete: 'Michael Phelps',
      age: 23,
      country: 'United States',
      year: 2008,
      date: '24/08/2008',
      sport: 'Swimming',
      gold: 8,
      silver: 0,
      bronze: 0,
      total: 8,
      level: 0,
      selected : false,
      id : 1
    },
    {
      athlete: 'Akshay Raut',
      age: 19,
      country: 'United States',
      year: 2004,
      date: '29/08/2004',
      sport: 'Swimming',
      gold: 6,
      silver: 0,
      bronze: 2,
      total: 8,
      level: 0,
      selected : false,
      id : 2
    },
    {
      athlete: 'Vishal Khot',
      age: 27,
      country: 'United States',
      year: 2012,
      date: '12/08/2012',
      sport: 'Swimming',
      gold: 4,
      silver: 2,
      bronze: 0,
      total: 6,
      level: 0,
      selected : false,
      id : 3
      
    },
    {
      athlete: 'Natalie Coughlin',
      age: 25,
      country: 'United States',
      year: 2008,
      date: '24/08/2008',
      sport: 'Swimming',
      gold: 1,
      silver: 2,
      bronze: 3,
      total: 6,
      level: 0,
      selected : false,
      id : 4
    },
    {
      athlete: 'Aviral Batra1',
      age: 24,
      country: 'Russia',
      year: 2000,
      date: '01/10/2000',
      sport: 'Gymnastics',
      gold: 2,
      silver: 1,
      bronze: 3,
      total: 6,
      level: 1,
      selected : false,
      id : 5
    },
    {
      athlete: 'Alicia Coutts',
      age: 24,
      country: 'Australia',
      year: 2012,
      date: '12/08/2012',
      sport: 'Swimming',
      gold: 1,
      silver: 3,
      bronze: 1,
      total: 5,
      level: 1,
      selected : false,
      id : 6
    },
    {
      athlete: 'Missy Franklin',
      age: 17,
      country: 'United States',
      year: 2012,
      date: '12/08/2012',
      sport: 'Swimming',
      gold: 4,
      silver: 0,
      bronze: 1,
      total: 5,
      level: 1,
      selected : false,
      id : 7
      
    },
    {
      athlete: 'Ryan Lochte',
      age: 27,
      country: 'United States',
      year: 2012,
      date: '12/08/2012',
      sport: 'Swimming',
      gold: 2,
      silver: 2,
      bronze: 1,
      total: 5,
      level: 1,
      selected : false,
      id : 8
    }
  ];
  public rowSelection: 'single' | 'multiple' = 'multiple';
  public suppressRowClickSelection=true;
public getRowId: GetRowIdFunc = (params: GetRowIdParams) =>
    params.data.id;
  constructor(private http: HttpClient) {}

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    // debugger;
  }
  onRowSelected(event) {
    console.log(event);
    console.log(event.node.selected);
    console.log(event.rowIndex);
    var rowsselected = this.rowData.filter( x => x.selected)
var rowsunselected = this.rowData.filter( x => !x.selected)

event.data.selected = true;

if(event.node.selected){
  event.data.selected = true;
  rowsselected.push(event.data)
  var rowIndex = rowsunselected.findIndex(x => x.id == event.data.id)
rowsunselected.splice(rowIndex,1)
}
else{
  event.data.selected = false;
  rowsunselected.unshift(event.data)
  var rowIndex = rowsselected.findIndex(x => x.id == event.data.id)
rowsselected.splice(rowIndex,1)
}

var allData = rowsselected.concat(rowsunselected)
this.rowData = allData;
this.gridApi.setRowData(allData);
// var params = {
//       force: true,
//       suppressFlash: true,
//     };
//     this.gridApi.refreshCells(params);
 this.gridApi.redrawRows()
console.log(allData)
// debugger;
    

  }

  canRowDrag(params){
    // debugger;
    return params.data.selected;
  }

  onRowDragMove(event) {
  var movingNode = event.node;
  var overNode = event.overNode;

  var rowNeedsToMove = movingNode !== overNode;

  if (rowNeedsToMove) {
    // the list of rows we have is data, not row nodes, so extract the data
    var movingData = movingNode.data;
    var overData = overNode.data;

    if(!overData.selected)
      return;

    var fromIndex = this.rowData.indexOf(movingData);
    var toIndex = this.rowData.indexOf(overData);

    var newStore = this.rowData.slice();
    this.moveInArray(newStore, fromIndex, toIndex);

    this.rowData = newStore;
    this.gridApi.setRowData(newStore);

    this.gridApi.clearFocusedCell();
    
  }

  
}
moveInArray(arr, fromIndex, toIndex) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
  }

}
