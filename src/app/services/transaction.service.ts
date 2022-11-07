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
export class TransactionService {

  constructor(private http: HttpClient, public baserurl: BaseurlService, public endpoint: EndpointService) {
    console.log("connected transaction service");
  }

  transactionlist() {
    return this.http.post(this.baserurl.BASE_URL + this.endpoint.TRANSACTION_LIST, { 'headers': headers, "token": localStorage.getItem('token') }).pipe(
      map(data => {
        return data;
      })
    );
  }
}
