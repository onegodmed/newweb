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
export class CscService {

  constructor(private http: HttpClient, public baserurl: BaseurlService, public endpoint: EndpointService) {
    console.log("connected csc service");
  }

  getcountry() {
    return this.http.post(this.baserurl.BASE_URL + this.endpoint.GETCOUNTRY, { 'headers': headers }).pipe(
      map(data => {
        return data;
      })
    );
  }

  getstateby_countryid(country_id: number) {
    return this.http.post(this.baserurl.BASE_URL + this.endpoint.GETSTATE, { 'headers': headers, 'country_id': country_id}).pipe(
      map(data => {
        return data;
      })
    );
  }

  getcityby_stateid(state_id: number) {
    return this.http.post(this.baserurl.BASE_URL + this.endpoint.GETCITY, { 'headers': headers, 'state_id': state_id}).pipe(
      map(data => {
        return data;
      })
    );
  }

}
