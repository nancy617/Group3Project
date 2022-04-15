import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Timestamp } from 'rxjs';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-customereditprofile',
  templateUrl: './customereditprofile.component.html',
  styleUrls: ['./customereditprofile.component.css']
})
export class CustomereditprofileComponent implements OnInit {
  editStatus: boolean = true;
  emailError: boolean = false;
  firstName: string = '';
  lastName: string = '';
  street: string = '';
  city: string = '';
  
  state: string = '';
  zip: string = '';
  phone: string = '';
  emailid: string = '';
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  uploadedImage!: File;
  dbImage: any;
  postResponse: any;
  successResponse!: string;
  image: any;
  images: string[] = [];
  imageFormData = new FormData();
  profileUrl: string = 'http://localhost:8080/customereditprofile';

  constructor(private http: HttpClient, private router: Router) { }
  ngOnInit(): void { }

  public onSubmit() {
    let data = {
      emailid: this.emailid,
      firstName: this.firstName,
      lastName: this.lastName,
      street: this.street,
      city: this.city,
      state: this.state,
      zip: this.zip,
      phone: this.phone,
      image: this.uploadedImage


    }
    this.router.navigate(['customerprofile'], {
      state: data
    });

    this.http
      .post<any>(this.profileUrl, {
        emailid: this.emailid,
        firstname: this.firstName,
        lastname: this.lastName,
        street: this.street,
        city: this.city,
        state: this.state,
        zip: this.zip,
        phone: this.phone,
        image: this.uploadedImage

      })
      .subscribe((data) => {
        if (data) {



          this.editStatus = false;
        } else {
            this.firstName = '';
            this.lastName = '';
            this.street = '',
            this.city = '',
            this.state = '',
            this.zip = '',
            this.phone = '';
            this.emailid = '';
            this.phone = '';
        }
      });
  }

  public reset() {
    this.firstName = '';
    this.lastName = '';
    this.street = '',
    this.city = '',
    this.state = '',
    this.zip = '',
    this.phone = '';
    this.emailid = '';
    this.phone = '';
  }
  onFileChange(event: any) {
    this.uploadedImage = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          // console.log(event.target.result);
          this.images.push(event.target.result);
        };
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

}