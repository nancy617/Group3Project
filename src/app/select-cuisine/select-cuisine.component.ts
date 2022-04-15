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
    selectedCuisine: number = 1;
    cuisines:any=[]
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

    selectCuisine(id: number) {
        this.selectedCuisine = id
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
