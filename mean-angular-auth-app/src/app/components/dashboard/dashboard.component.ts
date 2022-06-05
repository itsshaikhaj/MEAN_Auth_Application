import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SearchComponent } from 'src/app/search/search.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  displayedColumns: string[] = ['no', 'biller_name', 'territory_name', 'operator_name', 'pack_type', 'current_status'];
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  dataSource!: MatTableDataSource<PeriodicElement>;

  constructor(
    private dialog: MatDialog,
    private apiService : ApiService
  )
  { 
    console.log("dashboard");
  }
  
  ngAfterViewInit() {
  }


  ngOnInit() {
    this.getAllProducts();
  }

  
  openDialog(): void {
    // data.type = type;
    const dialogRef = this.dialog.open(SearchComponent, {
      width: '520px',
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      // data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dataSource = new MatTableDataSource<PeriodicElement>(result);
      this.dataSource.paginator = this.paginator;
    });
  }


  // get All Products
  getAllProducts() {
    this.apiService.getAllProducts().subscribe(response => {
    this.dataSource = new MatTableDataSource<PeriodicElement>(response.data);
    this.dataSource.paginator = this.paginator;
    },
     err => {
       return false;
     });
  }

  // Filter Products
  // search() {
  //   let data = {
  //     pack_type: this.dynamicForm.controls['pack_type'].value,
  //     territory_name: this.dynamicForm.controls['territory_name'].value,
  //     operator_name: this.dynamicForm.controls['operator_name'].value,
  //     current_status: this.dynamicForm.controls['current_status'].value,
  //   }
  //   console.log("data", data);
  //   this.apiService.filterProducts(data).subscribe((response: any) => {
  //     console.log('response :', response);
  //   },
  //     (error: HttpErrorResponse) => {
  //       console.log('error :', error);
  //     }
  //   );
  // }







}



export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];