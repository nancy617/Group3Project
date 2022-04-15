import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIConstants } from '../constants/APIConstants';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(public http: HttpClient) { }

  postOrder(orderData: any) {
    const headers = new HttpHeaders().
          set('accept', 'application/json')
          return this.http.post(APIConstants.baseURL()+'/placeOrder' ,orderData, {headers})
  }
}