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
export class BloglistService {

  response: any = [];
  trendingresponse: any = [];

  constructor(private http: HttpClient, public baserurl: BaseurlService, public endpoint: EndpointService) {
    console.log("connected Blog list ");
  }

  bloglist(limit: any) {
    // return this.http.get(this.baserurl.BASE_URL + this.endpoint.HOME_ASTROL_IST, { 'headers': headers?'searchFilter': searchfilter }).pipe(
    //   map(data => {
    //     return data;
    //   })
    // );

    return this.http.post(this.baserurl.BASE_URL + this.endpoint.BLOG_LIST_HOME, { 'headers': headers, 'limit': limit }).subscribe(data => {
      this.response = data; 
    }); 
  }

  trendingbloglist(limit: any) {
    return this.http.post(this.baserurl.BASE_URL + this.endpoint.BLOG_LIST_HOME, { 'headers': headers, 'limit': limit }).subscribe(data => {
      this.trendingresponse = data; 
    }); 
  }

  // blogdetails(id: any) {
  //   return this.http.post(this.baserurl.BASE_URL + this.endpoint.BLOG_DETAILS, { 'headers': headers, 'blogId': id }).subscribe(data => {
  //     this.detailsresponse = data; 
  //   }); 
  // }

  blogdetails(id: any) {
    return this.http.post(this.baserurl.BASE_URL + this.endpoint.BLOG_DETAILS, { 'headers': headers, "blogId": id }).pipe(
      map(data => {
        return data;
      })
    );
  }
}
