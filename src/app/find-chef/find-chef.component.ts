import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FetchChefsForCuisinesAndZipCodeDataService } from 'src/network/dataServices/FetchChefsForCuisinesAndZipCodeDataService';

@Component({
  selector: 'app-find-chef',
  templateUrl: './find-chef.component.html',
  styleUrls: ['./find-chef.component.css']
})
export class FindChefComponent implements OnInit {
  zipCode:number=0
  cuisineId:number=0
  chefs=[{
    "loginid": 1,
    "chef_fname": "chef abc",
    "chef_lname": "fadf",
    "chef_emailid": "faf1@com",
    "chef_phone": "fsdf",
    "chef_street": "fsdf",
    "chef_city": "",
    "chef_state": "fasdf",
    "chef_zip": "",
    "chef_paymode": "fsdf",
    
    "chef_description": "fsdf",
    "chef_experience": 10,
    "chef_fblink": " ",
    "chef_linkdin": " ",
    "chef_image": "/9j/4AAQSkZJRgABAQEBLAEsAAD"
  },
  {
    "loginid": 1,
    "chef_fname": "chef 123",
    "chef_lname": "fadf",
    "chef_emailid": "faf1@com",
    "chef_phone": "fsdf",
    "chef_street": "fsdf",
    "chef_city": "",
    "chef_state": "fasdf",
    "chef_zip": "",
    "chef_paymode": "fsdf",
    "chef_description": "fsdf",
    "chef_experience": 10,
    "chef_fblink": " ",
    "chef_linkdin": " ",
    "chef_image": "/9j/4AAQSkZJRgABAQEBLAEsAAD"
  }]


  constructor(private _FetchChefsForCuisinesAndZipCodeDataService:FetchChefsForCuisinesAndZipCodeDataService,
    private _Activatedroute:ActivatedRoute) { }

  ngOnInit(): void {

    this._Activatedroute.paramMap.subscribe(params => { 
      console.log(params);
      this.zipCode = Number(params.get('zipCode')) ;
      this.cuisineId = Number(params.get('cuisineId')) ;
    });
   
    if(this.zipCode && this.cuisineId){
      this.fetchChefsForCuisinesAndZipCode()
    }
  }

  fetchChefsForCuisinesAndZipCode(){
    this._FetchChefsForCuisinesAndZipCodeDataService.prepareRequestWithParameters(this.zipCode,this.cuisineId)
    this._FetchChefsForCuisinesAndZipCodeDataService.queryTheServer().subscribe({
      next:res=>{
        const data:any=res
        if(data.length>0){
          this.chefs=data
        }else{
          alert("Sorry we are yet to serve this area!")
        }
        
      },
      error:err=>console.log(err)
  })
  }

}
