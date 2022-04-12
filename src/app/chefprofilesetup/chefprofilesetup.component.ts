import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ChefProfileCreateDataService } from 'src/network/dataServices/ChefProfileCreateDataService';

@Component({
  selector: 'app-chefprofilesetup',
  templateUrl: './chefprofilesetup.component.html',
  styleUrls: ['./chefprofilesetup.component.css']
})
export class ChefprofilesetupComponent implements OnInit {

  profileForm = new FormGroup({
    fname: new FormControl(''),
    lname: new FormControl(''),
    emailid: new FormControl(''),
    chef_phone: new FormControl(''),
    chef_street:new FormControl(''),
    chef_city:new FormControl(''),
    chef_state:new FormControl(''),
    chef_description:new FormControl(''),
    chef_zip:new FormControl(''),
    chef_paymode:new FormControl(''),
    chef_experience:new FormControl(''),
    chef_fblink:new FormControl(''),
    chef_linkdin:new FormControl(''),
    file:new FormControl(null),


  });

  selectedImage:any;
  constructor(private _ChefProfileCreateDataService:ChefProfileCreateDataService,
    private router:Router) { }

  ngOnInit(): void {
  }

  uploadFile(event:any) {
    console.log(event)
    if(event && event.target && event.target.files ){
      const file = event.target.files[0];

      this.selectedImage = event.target.files;

      this.profileForm.patchValue({
        file: file
      });
      //this.profileForm.updateValueAndValidity()
      //this.profileForm.get('file')?.updateValueAndValidity()
      // this.profileForm.patchValue({
      //   file: file,
      // });
      //this.profileForm.value.file.updateValueAndValidity();
      //this.profileForm.value.file=file
      // this.profileForm.get('file').setValue(file);
      //this.profileForm.get('file')?.setValue(file)
    }
  }

  createProfile(){

    const form_data=new FormData()

    form_data.append("chef_fname", this.profileForm.value.fname);
    form_data.append("chef_lname", this.profileForm.value.lname);

    form_data.append("chef_phone", this.profileForm.value.chef_phone);
    form_data.append("chef_emailid", this.profileForm.value.emailid);
    form_data.append("chef_state", this.profileForm.value.chef_state);
    form_data.append("chef_street", this.profileForm.value.chef_street);

    form_data.append("chef_paymode", this.profileForm.value.chef_street);
    form_data.append("chef_description", this.profileForm.value.chef_street);
    form_data.append("chef_experience", "10");
    form_data.append("chef_fblink"," ")
    form_data.append("chef_linkdin"," ")
    
    form_data.append("chef_city", this.profileForm.value.chef_city);
    form_data.append("chef_zip", this.profileForm.value.chef_zip);

    let fileToUpload = this.selectedImage.item(0);
    form_data.append("file", fileToUpload,fileToUpload.name);
    this._ChefProfileCreateDataService.queryTheServer(
      form_data
    //   {
    //   fname:this.profileForm.value.fname,
    //   lname:this.profileForm.value.lname,
    //   emailid:this.profileForm.value.emailid,
    //   chef_phone:this.profileForm.value.chef_phone,
    //   chef_street:this.profileForm.value.chef_street,
    //   chef_city:this.profileForm.value.chef_city,
    //   chef_state:this.profileForm.value.chef_state,
    //   chef_zip:this.profileForm.value.chef_zip,
    //   chef_paymode:this.profileForm.value.chef_paymode,
    //   chef_description:this.profileForm.value.chef_description,

    //   chef_experience:this.profileForm.value.chef_experience,
    //   chef_fblink:this.profileForm.value.chef_fblink,
    //   chef_linkdin:this.profileForm.value.chef_linkdin,
    //   file:this.profileForm.value.file,
    // }
    ).subscribe({
      next: resp=> this.router.navigate(['/createmenu']),
      error: err=>{
        console.log(err)
        alert(err.error.message)
      }
   });
  }

}
