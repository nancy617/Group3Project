import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Timestamp } from 'rxjs';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-chefeditprofile',
  templateUrl: './chefeditprofile.component.html',
  styleUrls: ['./chefeditprofile.component.css'],
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
      lastnmae: this.lastName,
      payment: this.selected,
      address: this.address,
      cook_exp: this.cookExp,
      memb_since: this.membSince,
      phone: this.phone,
    };
    this.router.navigate(['chefviewprofile'], {
      state: data,
    });
    this.http
      .post<any>(this.profileUrl, {
        emailid: this.emailid,
        firstname: this.firstName,
        lastnmae: this.lastName,
        payment: this.selected,
        address: this.address,
        cook_exp: this.cookExp,
        memb_since: this.membSince,
        phone: this.phone,
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
}
