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
export class UserService {

  constructor(private http: HttpClient, public baserurl: BaseurlService, public endpoint: EndpointService) {
    console.log("connected user service");
  }

  checkuserbalance(astroId: any) {
    return this.http.post(this.baserurl.BASE_URL + this.endpoint.CHECK_USER_BALANCE, { 'headers': headers, "token": localStorage.getItem('token'), 'astrologerId': astroId }).pipe(
      map(data => {
        return data;
      })
    );
  }

  userWalletdetails() {
    return this.http.post(this.baserurl.BASE_URL + this.endpoint.USER_CURRENT_BALANCE, { 'headers': headers, "token": localStorage.getItem('token') }).pipe(
      map(data => {
        return data;
      })
    );
  }

  userProfiledetails() {
    return this.http.post(this.baserurl.BASE_URL + this.endpoint.USER_PROFILE_DETAILS, { 'headers': headers, "token": localStorage.getItem('token') }).pipe(
      map(data => {
        return data;
      })
    );
  }

  updateprofile(userProfileform: any = []) {
    return this.http.post(this.baserurl.BASE_URL + this.endpoint.UPDATE_USER_PROFILE, { 'headers': headers, "token": localStorage.getItem('token'), "fullname": userProfileform[0].fullname, "email_address": userProfileform[0].email, "gender": userProfileform[0].gender, "address": userProfileform[0].address, "dateOfBirth": userProfileform[0].dob, "timeOfBirth": userProfileform[0].birthtime, "birthplace": userProfileform[0].birthplace, "image": userProfileform[0].image}).pipe(
      map(data => {
        return data;
      })
    );
  }

  getCity(search: any) {
    return this.http.post(this.baserurl.BASE_URL + this.endpoint.GET_CITY, { 'headers': headers, "searchcity": search }).pipe(
      map(data => {
        return data;
      })
    );
  }

  addCall(customer_id: any, astroId: any) {
    return this.http.post(this.baserurl.BASE_URL + this.endpoint.ADD_CALL, { 'headers': headers, "customer_id": customer_id, 'astrologer_id': astroId }).pipe(
      map(data => {
        return data;
      })
    );
  }

  addChat(customer_id: any, astroId: any, chatform: any= []) {
    return this.http.post(this.baserurl.BASE_URL + this.endpoint.ADD_CHAT, { 'headers': headers, "customer_id": customer_id, 'astrologer_id': astroId, "dob": chatform[0].dob, "birth_time": chatform[0].birthtime, "birth_place":chatform[0].birthplace}).pipe(
      map(data => {
        return data;
      })
    );
  }

  autoCancelledchat(order_id: any) {
    return this.http.post(this.baserurl.BASE_URL + this.endpoint.CANCEL_CHAT_URL, { 'headers': headers, "order_id": order_id}).pipe(
      map(data => {
        return data;
      })
    );
  }

  userEndchat(order_id: any) {
    return this.http.post(this.baserurl.BASE_URL + this.endpoint.END_CHAT_URL, { 'headers': headers, "caller_id": order_id}).pipe(
      map(data => {
        return data;
      })
    );
  }
}
