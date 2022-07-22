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
@Injectable()
export class LoginService {

  constructor(private http: HttpClient, public baserurl: BaseurlService, public endpoint: EndpointService) {
    console.log("connected Login");
  }

  sendotp(mobilenumber: any) {
    return this.http.post(this.baserurl.BASE_URL + this.endpoint.SEND_OTP, { 'headers': headers, "mobileNumber": mobilenumber, "countryCode": 91 }).pipe(
      map(data => {
        return data;
      })
    );
  }

  verifyotp(otp: any) {
    return this.http.post(this.baserurl.BASE_URL + this.endpoint.VERIFY_OTP, { 'headers': headers, "mobile_number": localStorage.getItem("mobilenumber"), "code": otp }).pipe(
      map(data => {
        return data;
      })
    );
  }

  signup(otp: any, username: any, email: any) {
    return this.http.post(this.baserurl.BASE_URL + this.endpoint.VERIFY_OTP, { 'headers': headers, "full_name": username, "email_address": email, "mobile_number": localStorage.getItem("mobilenumber"), "code": otp }).pipe(
      map(data => {
        return data;
      })
    );
  }
}
