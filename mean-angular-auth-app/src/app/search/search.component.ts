import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  dynamicForm!: FormGroup;
  formData: any = new FormData();

  territoryList: any = ['EGYPT', 'INDIA', 'CANADA'];
  operatorList: any = ['ETISALAT', 'AMIR', 'ARSH'];
  packTypeList: any = ['WEEKLY', 'MONTHLY', 'YEARLY'];
  statusList: any = ['LEAVING', 'PARKED', 'PARKING'];

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    public dialogRef: MatDialogRef<SearchComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.dynamicForm = this.formBuilder.group({
      pack_type: ["", Validators.compose([Validators.required])],
      territory_name: ["", Validators.compose([Validators.required])],
      operator_name: ["", Validators.compose([Validators.required])],
      current_status: ["", Validators.compose([Validators.required])],
    });
  }
  validation_messages = {
    'name': [
      { type: 'required', message: 'Name is required' },
    ],
  }




  search() {
    let data = {
      pack_type: this.dynamicForm.controls['pack_type'].value,
      territory_name: this.dynamicForm.controls['territory_name'].value,
      operator_name: this.dynamicForm.controls['operator_name'].value,
      current_status: this.dynamicForm.controls['current_status'].value,
    }
    console.log("data", data);
    // localStorage.setItem('searchData', JSON.stringify(data));
    this.apiService.filterProducts(data).subscribe((response: any) => {
      console.log('response :', response);
      this.onNoClick(response.data);
    },
      (error: HttpErrorResponse) => {
        console.log('error :', error);
      }
    );
  }

  onNoClick(data: any): void {
    this.dialogRef.close(data);
  }

}
