import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { APIConstants } from '../constants/APIConstants';



@Injectable({
  providedIn: 'root'
})
export class FetchChefsForCuisinesAndZipCodeDataService {
    zipCode:number=0
    cusineId:number=0
 
    constructor(
        public http: HttpClient ,
      ) {
      }

      requestHeaders(): HttpHeaders {
        const headers = new HttpHeaders().
          set('accept', 'application/json').
          set('Content-Type', 'application/json')
         // set('Authorization', this.getToken());
        return headers;
        
      }

      getToken() {
        let token = localStorage.getItem('accessToken');
        if (token) {
          return 'Bearer ' + token;
        } else {
          return '';
        }
      }

      baseURL(): string  {
        return APIConstants.baseURL();
      }
    
      methodName(): string | undefined {
        return `/chefByCuisineId/${this.cusineId}/${this.zipCode}`;
      }

      prepareRequestWithParameters(..._parameters: any[]) {
        this.zipCode=_parameters[0]
        this.cusineId=_parameters[1]
    }


      queryTheServer(){
        const requestOptions:any = {};
        requestOptions['headers'] = this.requestHeaders();
        return this.http.get(this.baseURL()+this.methodName(), requestOptions);
      }

}