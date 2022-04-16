import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactStatus: boolean = true;
  emailError: boolean = false;
  name: string = '';
  emailid: string = '';
  message: string = '';
  contactUrl: string = 'http://ethniconnectbackendaws-env.eba-fa8ytper.us-east-2.elasticbeanstalk.com/ContactRequest';
  constructor(private http: HttpClient,private router: Router) { }

  ngOnInit(): void {
  }

  public onSubmit() {

    console.log(this.emailid);
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(!new RegExp(regex).test(this.emailid)){
      this.emailError = true;
    }else{
      this.emailError = false;
      // console.log("name: ",this.name);
      // console.log("emailid: ",this.emailid);
      // console.log("message: ",this.message);
      this.http.post<any>(this.contactUrl, {"emailid":this.emailid,"name":this.name,"message":this.message}).subscribe(data => {
        if(data){
          this.router.navigate(['/Contact'],{queryParams: { status: '1' }});
          this.contactStatus = false;
        }
        else{
          this.name = '';
          this.emailid = '';
          this.message = '';
        }
      })
    }

  }

  public reset(){
    this.name = '';
    this.emailid = '';
    this.message = '';
    this.contactStatus = true;
  }


}
