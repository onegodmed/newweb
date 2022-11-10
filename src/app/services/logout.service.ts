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

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private http: HttpClient, public baserurl: BaseurlService, public endpoint: EndpointService) {
    console.log("connected Logout");
  }

  logout() {
    return this.http.post(this.baserurl.BASE_URL + this.endpoint.LOGOUT, { 'headers': headers, "token": localStorage.getItem("token") }).pipe(
      map(data => {
        return data;
      })
    );
  }

}
