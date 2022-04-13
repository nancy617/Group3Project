import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Timestamp } from 'rxjs';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-chefeditprofile',
  templateUrl: './chefeditprofile.component.html',
  styleUrls: ['./chefeditprofile.component.css']
})
export class ChefeditprofileComponent implements OnInit {
  editStatus: boolean = true;
  emailError: boolean = false;
  firstName: string = '';
  lastName: string = '';
  address: string = '';
  cookExp: string = '';
  membSince = new Date();
  phone: string = '';
  emailid: string = '';
  profileUrl: string = 'http://localhost:8080/chefeditprofile';
  selected: string = 'cash';
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


  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {}
  options = [
    { name: 'cash', value: 'cash' },
    { name: 'creditcard', value: 'creditcard' },
  ];

  public onSubmit() {
    // const regex =
    //   /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    // if (!new RegExp(regex).test(this.emailid)) {
    //   this.emailError = true;
    // } else {
    //   this.emailError = false;
      // console.log('firstName: ', this.firstName);
      // console.log('emailid: ', this.emailid);
      // console.log('lastName: ', this.lastName);
      let data = {
        emailid: this.emailid,
        firstname: this.firstName,
        lastname: this.lastName,
        payment: this.selected,
        address: this.address,
        cook_exp: this.cookExp,
        memb_since: this.membSince,
        phone: this.phone,
        image: this.uploadedImage
      }
      this.router.navigate(['chefviewprofile'], {
        state: data});
      this.http
        .post<any>(this.profileUrl, {
          emailid: this.emailid,
          firstname: this.firstName,
          lastname: this.lastName,
          payment: this.selected,
          address: this.address,
          cook_exp: this.cookExp,
          memb_since: this.membSince,
          phone: this.phone,
          image: this.uploadedImage
        })
        .subscribe((data) => {
          if (data) {
            // console.log(data);
            // this.router.navigate(['chefviewprofile'], {
            //   state: data});
            this.editStatus = false;
          } else {
            this.firstName = '';
            this.lastName = '';
            this.address = '';
            this.cookExp = '';
            this.membSince = new Date();
            this.phone = '';
            this.emailid = '';
            this.phone = '';
          }
        });
      // }
  }

  public reset() {
    this.firstName = '';
    this.lastName = '';
    this.address = '';
    this.cookExp = '';
    this.membSince = new Date();
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