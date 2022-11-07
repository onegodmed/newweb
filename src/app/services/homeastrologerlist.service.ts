import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { data } from 'jquery';
import { BaseurlService } from '../config/baseurl.service'
import { EndpointService } from '../config/endpoint.service'
const headers = new HttpHeaders()
  .set('Access-Control-Allow-Origin', '*')
  .set('content-type', 'application/json')
  .set('content-type', 'application/x-www-form-urlencoded');

const searchfilter: any = '';

@Injectable({
  providedIn: 'root'
})
export class HomeastrologerlistService {
  response: any = [];

  constructor(private http: HttpClient, public baserurl: BaseurlService, public endpoint: EndpointService) {
    console.log("connected HomeastrologerlistService");
  }

  homeastrolist() {
    // return this.http.get(this.baserurl.BASE_URL + this.endpoint.HOME_ASTROL_IST, { 'headers': headers?'searchFilter': searchfilter }).pipe(
    //   map(data => {
    //     return data;
    //   })
    // );

    return this.http.get(this.baserurl.BASE_URL + this.endpoint.HOME_ASTROL_IST, { 'headers': headers?'searchFilter': searchfilter }).subscribe(data => {
      this.response = data; 
    }); 
  }
}
