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
export class AstrologerlistService {

  response: any = [];
  loadmore: any = [];

  constructor(private http: HttpClient, public baserurl: BaseurlService, public endpoint: EndpointService) {
    console.log("connected astrologerlistService");
  }

  astrolist(page: number, category: any, sorting: any, searchbyname: any) {
    // console.log(sorting);
    // alert(sorting);
    // return this.http.get(this.baserurl.BASE_URL + this.endpoint.HOME_ASTROL_IST, { 'headers': headers?'searchFilter': searchfilter }).pipe(
    //   map(data => {
    //     return data;
    //   })
    // );

    return this.http.post(this.baserurl.BASE_URL + this.endpoint.ALL_ASTROL_IST, { 'headers': headers, 'categories': category, 'sorting': sorting, 'searchbyname': searchbyname }).subscribe(data => {
      this.response = data;
      console.log(data);
    });
  }

  loadmorelist(page: number, category: any, sorting: any) {
    // console.log(sorting);
    // alert(sorting);
    // return this.http.get(this.baserurl.BASE_URL + this.endpoint.HOME_ASTROL_IST, { 'headers': headers?'searchFilter': searchfilter }).pipe(
    //   map(data => {
    //     return data;
    //   })
    // );

    return this.http.post(this.baserurl.BASE_URL + this.endpoint.ALL_ASTROL_IST, { 'headers': headers, 'categories': category, 'sorting': sorting }).subscribe(data => {
      this.loadmore = data;
      // let arr1 = [1, 2];
      // let arr2 = [3, 4];
      // let newArr = this.loadmore.concat(data);
      this.loadmore = this.response.data.concat(data);
      console.log(this.loadmore);
    });
  }

  astrodetails() {
    return this.http.post(this.baserurl.BASE_URL + this.endpoint.ASTRO_DETAILS, { 'headers': headers, "id": localStorage.getItem('astrologer_id') }).pipe(
      map(data => {
        return data;
      })
    );
  }

  addreviewrating() {
    return this.http.post(this.baserurl.BASE_URL + this.endpoint.ADD_REVIEW_RATING, { 'headers': headers, "token": localStorage.getItem('token'), "astro_id": localStorage.getItem('astrologer_id'), "rating":'', "review":'' }).pipe(
      map(data => {
        return data;
      })
    );
  }

  checkavailability() {
    return this.http.post(this.baserurl.BASE_URL + this.endpoint.AVAILABILITY, { 'headers': headers, "astro_id": localStorage.getItem('astrologer_id')}).pipe(
      map(data => {
        return data;
      })
    );
  }
}
