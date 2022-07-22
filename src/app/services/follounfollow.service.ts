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
export class FollounfollowService {

  followresponse: any = [];

  constructor(private http: HttpClient, public baserurl: BaseurlService, public endpoint: EndpointService) {
    console.log("connected Follow Unfollow ");
  }

  follow(astro_id: any) {
    return this.http.post(this.baserurl.BASE_URL + this.endpoint.FOLLOW, { 'headers': headers, "astrologerId": astro_id, "token": localStorage.getItem("token") }).pipe(
      map(data => {
        return data;
      })
    );
  }

  unfollow(astro_id: any) {
    return this.http.post(this.baserurl.BASE_URL + this.endpoint.UNFOLLOW, { 'headers': headers, "astrologerId": astro_id, "token": localStorage.getItem("token") }).pipe(
      map(data => {
        return data;
      })
    );
  }

  getfollowlist() {
    // return this.http.post(this.baserurl.BASE_URL + this.endpoint.CHECKFOLLOWUNFOLLOW, { 'headers': headers, "token": localStorage.getItem("token") }).pipe(
    //   map(data => {
    //     return data;
    //   })
    // );
    return this.http.post(this.baserurl.BASE_URL + this.endpoint.CHECKFOLLOWUNFOLLOW, { 'headers': headers, "token": localStorage.getItem("token") }).subscribe(data => {
      this.followresponse = data;
    });
  }
}
