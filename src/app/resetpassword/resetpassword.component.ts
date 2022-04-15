import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResetPasswordDataService } from 'src/network/dataServices/ResetPasswordDataServices';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  registerForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required]),
    confirmPassword:new FormControl('',[Validators.required ]),
  });
  submitted: boolean=false;
  constructor(private _ResetPasswordDataService: ResetPasswordDataService,
    private router: Router ) { }

  ngOnInit(): void {
  }

  signup():void|boolean{
    this.submitted = true;
    if (this.registerForm.invalid || this.registerForm.value.password != this.registerForm.value.confirmPassword ) {
      return false;
    }
    this._ResetPasswordDataService.prepareRequestWithParameters(this.registerForm.value.email,this.registerForm.value.password)
    this._ResetPasswordDataService.queryTheServer({
      emailId:this.registerForm.value.email,
      newPwd:this.registerForm.value.password
    }).subscribe({
      next: resp=> this.router.navigate(['/Login']),
      error: err=>{
        console.log(err)
        alert(err.error.message)
      }
   });
  }

}