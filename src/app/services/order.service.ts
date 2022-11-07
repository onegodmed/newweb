import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BaseurlService } from '../config/baseurl.service'
import { EndpointService } from '../config/endpoint.service'
const headers = new HttpHeaders()
  .set('Access-Control-Allow-Origin', '*')
  .set('content-type', 'application/json')
  .set('content-type', 'application/x-www-form-urlencoded');

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, public baserurl: BaseurlService, public endpoint: EndpointService) {
    console.log("connected order service");
  }

  mybooking() {
    return this.http.post(this.baserurl.BASE_URL + this.endpoint.MY_BOOKING, { 'headers': headers, "token": localStorage.getItem('token') }).pipe(
      map(data => {
        return data;
      })
    );
  }

  getorderInfo(orderId: any) {
    return this.http.post(this.baserurl.BASE_URL + this.endpoint.ORDER_INFO_URL, { 'headers': headers, "token": localStorage.getItem('token'), "orderId": orderId}).pipe(
      map(data => {
        return data;
      })
    );
  }

  getcallingStatus(orderId: any) {
    return this.http.post(this.baserurl.BASE_URL + this.endpoint.CHECK_CALL_STATUS, { 'headers': headers, "callerId": orderId}).pipe(
      map(data => {
        return data;
      })
    );
  }

  callMissed(orderId: any) {
    return this.http.post(this.baserurl.BASE_URL + this.endpoint.CALL_MISSED, { 'headers': headers, "callerId": orderId}).pipe(
      map(data => {
        return data;
      })
    );
  }
}
