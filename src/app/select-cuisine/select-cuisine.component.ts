import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FetchCuisinesForZipCodeDataService } from 'src/network/dataServices/FetchCuisinesForZipCodeDataService';

@Component({
  selector: 'app-select-cuisine',
  templateUrl: './select-cuisine.component.html',
  styleUrls: ['./select-cuisine.component.css']
})
export class SelectCuisineComponent implements OnInit {
 zipCode:number=0
 cuisines:any=[
  {
    "id": 1,
    "cuisine_name": "Mexican",
    "cuisine_image": null,
    "menus": []
},
{
    "id": 3,
    "cuisine_name": "Indian",
    "cuisine_image": null,
    "menus": []
},
{
    "id": 2,
    "cuisine_name": "Italian",
    "cuisine_image": null,
    "menus": []
}
 ]
  constructor( private _Activatedroute:ActivatedRoute,
    private _FetchCuisinesForZipCodeDataService: FetchCuisinesForZipCodeDataService ) { }

  ngOnInit(): void {

    this._Activatedroute.paramMap.subscribe(params => { 
      console.log(params);
      this.zipCode = Number(params.get('zipCode')) ;
    });
   
    if(this.zipCode){
      this.fetchCuisinesForZipCode()
    }

}

fetchCuisinesForZipCode(){
  this._FetchCuisinesForZipCodeDataService.prepareRequestWithParameters(this.zipCode)
  this._FetchCuisinesForZipCodeDataService.queryTheServer().subscribe({
    next:res=>{
      const data:any=res
      if(data.cuisineCategory.length>0){
        this.cuisines=data.cuisineCategory
      }else{
        alert("Sorry we are yet to serve this area!")
      }
      
    },
    error:err=>console.log(err)
})
}
}
