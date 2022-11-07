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
export class AstrologyService {
  
  


  constructor(private http: HttpClient, public baserurl: BaseurlService, public endpoint: EndpointService) {
    // console.log("connected astrology");
  }

  
  astrology(subcat_id: any) {
    return this.http.post(this.baserurl.BASE_URL + this.endpoint.SUBCATEGORY, { 'headers': headers, "subcat_id": subcat_id}).pipe(
      map(data => {
        return data;
      })
    );
  }
  
  astrologylist(id: any){
    return this.http.post(this.baserurl.BASE_URL + this.endpoint.ASTROLOGY_LIST, { 'headers': headers, 'category_id': id }).pipe(
      map(data => {
        return data;
      })
      );
    }
  
  

  

   
}




