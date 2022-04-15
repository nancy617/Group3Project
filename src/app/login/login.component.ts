import { Component, OnInit } from '@angular/core';
import { SignInDataService } from 'src/network/dataServices/SigninDataService';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required]),
  });

  constructor(private _SignInDataService:SignInDataService,
    private router:Router ) { }

  ngOnInit(): void {
  }

  login(){
    this._SignInDataService.queryTheServer({
      email:this.loginForm.value.email,
      password:this.loginForm.value.password
    }).subscribe({
      
      next: resp=>{
        const data:any=resp
        localStorage.setItem('loginId',data.loginId)
        localStorage.setItem('isChef',data.chef)
        if (this._SignInDataService.redirectUrl){
          this.router.navigate([this._SignInDataService.redirectUrl])
          return
        }
        if(data.chef)
        {
          this.router.navigate(['/chefprofilesetup'])
        }
        else{
          this.router.navigate(['/EnterZipCode'])
        }
        
      } ,
      error: err=>{
        console.log(err)
        //alert("User has not registered yet. Please signup")
        alert(err.error.errormessage)
      }
   });
  }

}