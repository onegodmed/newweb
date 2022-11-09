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
export class PackageService {

  constructor(private http: HttpClient, public baserurl: BaseurlService, public endpoint: EndpointService) {
    console.log("connected ratings api connected");
  }

  packagelist() {
    return this.http.post(this.baserurl.BASE_URL + this.endpoint.PACKAGE_LIST, { 'headers': headers, 'token': localStorage.getItem('token') }).pipe(
      map(data => {
        return data;
      })
    );
  }

  packagewithCoupon(packageId: any) {
    return this.http.post(this.baserurl.BASE_URL + this.endpoint.PACKAGE_CALCULATION, { 'headers': headers, 'package_id': packageId, }).pipe(
      map(data => {
        return data;
      })
    );
  }

  

  packagecalculation(data:any) {
    return this.http.post(this.baserurl.BASE_URL + this.endpoint.PACKAGE_CALCULATION, { 'headers': headers, 'package_id': data.packageId, 'couponCode':data.couponCode }).pipe(
      map(data => {
        return data;
      })
    );
  }

  checkCoupon(data:any) {
    return this.http.post(this.baserurl.BASE_URL + this.endpoint.CHECK_COUPON, { 'headers': headers, 'token': data.token, 'coupon_code': data.coupon_code, 'package_value':data.package_value  }).pipe(
      map(data => {
        return data;
      })
    );
  }
}
