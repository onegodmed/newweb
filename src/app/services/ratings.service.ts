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
export class RatingsService {

  response: any = [];

  constructor(private http: HttpClient, public baserurl: BaseurlService, public endpoint: EndpointService) {
    console.log("connected ratings api connected");
  }

  astroratings() {
    return this.http.post(this.baserurl.BASE_URL + this.endpoint.RATINGS_ALL, { 'headers': headers, "astro_id": localStorage.getItem('astrologer_id') }).pipe(
      map(data => {
        return data;
      })
    );
  }

  addreviewRating(review: any, rating: any) {
    return this.http.post(this.baserurl.BASE_URL + this.endpoint.ADD_RATING_REVIEWS, { 'headers': headers, "token": localStorage.getItem('token'), "astro_id": localStorage.getItem('astrologer_id'), "rating": rating, "review": review }).pipe(
      map(data => {
        return data;
      })
    );
  }
}
