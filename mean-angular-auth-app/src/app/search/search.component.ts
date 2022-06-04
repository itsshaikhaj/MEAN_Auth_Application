import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  dynamicForm!: FormGroup;
  formData: any = new FormData();
  imageList: any = [];
  sliders = ["slider", "videoSlider", "noslider"];
  isAvailable: boolean[] = [true, false];
  names = ["yoga", "game", "video", "videoz"];
  subscription: any;
  editData: any;
  Fileupload: any;
  shortLink: any;
  loading!: boolean;
  file: any;
  userfile: any;
  images: File[] = [];
  url: any;
  fileList: any = [];
  files: any = [];

  constructor(
    private formBuilder: FormBuilder, 
    public dialogRef: MatDialogRef<SearchComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.dynamicForm = this.formBuilder.group({
      name: ["", Validators.compose([Validators.required])],
      slider: ["", Validators.compose([Validators.required])],
      title: ["", Validators.compose([Validators.required])],
      header: ["", Validators.compose([Validators.required])],
      sub_header: ["", Validators.compose([Validators.required])],
      footer: ["", Validators.compose([Validators.required])],
      description: ["", Validators.compose([Validators.required])],
      portalId: [0, Validators.compose([Validators.required])],
      lang: [""],
      // color: [""],
      headerColor: [""],
      footerColor: [""],
      isTrending: [""],
      isRecommended: [""],
      trending: [""],
      recommended: [""],
      downloadUrl: [""],
      url: [""],
      list: [""],
      theme: [1],
      backgroundColor: [""],
    });
  }
  
  validation_messages = {
    'name': [
      { type: 'required', message: 'Name is required' },

    ],
    'slider': [
      { type: 'required', message: 'Slider is required.' },

    ],
    'title': [
      { type: 'required', message: 'Title is required.' },

    ],
    'header': [
      { type: 'required', message: 'Header is required' },

    ],
    'sub_header': [
      { type: 'required', message: 'Sub-Header is required.' },

    ],
    'footer': [
      { type: 'required', message: 'Footer is required.' },

    ],
    'description': [
      { type: 'required', message: 'Description is required.' },

    ],
    'portalId': [
      { type: 'required', message: 'Portal Id is required.' },

    ],
  }


  

  search() {
    let data = {
      name: this.dynamicForm.controls['name'].value,
      sliderName: this.dynamicForm.controls['slider'].value,
      title: this.dynamicForm.controls['title'].value,
      header1: this.dynamicForm.controls['header'].value,
      header2: this.dynamicForm.controls['sub_header'].value,
      description: this.dynamicForm.controls['description'].value,
      footer: this.dynamicForm.controls['footer'].value,
      portalId: this.dynamicForm.controls['portalId'].value,
      lang: this.dynamicForm.controls['lang'].value,
      // color: this.dynamicForm.controls['color'].value,
      headerColor: this.dynamicForm.controls['headerColor'].value,
      footerColor: this.dynamicForm.controls['footerColor'].value,
      isTrending: this.dynamicForm.controls['isTrending'].value,
      trending: this.dynamicForm.controls['trending'].value,
      recommended: this.dynamicForm.controls['recommended'].value,
      downloadUrl: this.dynamicForm.controls['downloadUrl'].value,
      url: this.dynamicForm.controls['url'].value,
      list: this.dynamicForm.controls['list'].value,
      theme: this.dynamicForm.controls['theme'].value,
      color: this.dynamicForm.controls['backgroundColor'].value,

    }
    console.log("data", data);
    
    // this.apiService.addConfig(data).subscribe(
    //   (response: any) => {
    //     this.snackbar.success("added successfully");
    //   },
    //   (error: HttpErrorResponse) => {
    //     // loading.dismiss();
    //     if (error) {
    //       this.snackbar.error("Something went wrong");
    //     } else {
    //       this.snackbar.error("Something went wrong");
    //     }
    //   }
    // );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
