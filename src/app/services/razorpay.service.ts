import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { data } from 'jquery';
import { Router } from '@angular/router';
import { BaseurlService } from '../config/baseurl.service'
import { EndpointService } from '../config/endpoint.service'
// import Razorpay from 'razorpay';

const headers = new HttpHeaders()
  .set('Access-Control-Allow-Origin', '*')
  .set('content-type', 'application/json')
  .set('content-type', 'application/x-www-form-urlencoded');

declare var Razorpay: any;


@Injectable({
  providedIn: 'root'
})
export class RazorpayService {

  constructor(private http: HttpClient, public router: Router, public baserurl: BaseurlService, public endpoint: EndpointService) { }

  createorder(order: any = []) {
    return this.http.post(this.baserurl.BASE_URL + this.endpoint.CREATE_ORDER, { 'headers': headers, 'token': localStorage.getItem('token'), 'amount': order[0].amount, 'package_name': order[0].package_name, 'package_amount': order[0].package_amount, 'talktime_value': order[0].talktime_value, 'gst': order[0].gst, 'applyCoupon':order[0].applyCoupon, 'coupon_code':order[0].coupon_code, 'coupon_discount':order[0].coupon_discount,  }).pipe(
      map(data => {
        return data;
      })
    );
  }

  paymentsuccess(transactionId: any, paymentId: any, status: any) {
    return this.http.post(this.baserurl.BASE_URL + this.endpoint.PAYMENT_SUCCESS, { 'headers': headers, 'token': localStorage.getItem('token'), 'transaction_id': transactionId, 'payment_id': paymentId, 'status': status }).pipe(
      map(data => {
        return data;
      })
    );
  }

  // createorder() {
  //   var instance = new Razorpay({ key: 'rzp_live_tQVtoSnbH9idrB', key_secret: 'vSyYoG3VQj3rBCdtgEf94Vss' })

  //   instance.orders.create({
  //     amount: 500,
  //     currency: "INR"
  //   })
  // }

}
